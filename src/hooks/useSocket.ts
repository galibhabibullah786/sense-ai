// ============================================================================
// SenseAI Frontend - Socket.io Hook for Real-Time Updates
// ============================================================================

import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';
import { getAccessToken } from '@/lib/api';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Hook that establishes a Socket.io connection to the backend
 * and invalidates relevant queries on real-time events.
 * 
 * Events handled:
 * - devices:updated  → refreshes devices list (extension linked/unlinked)
 * - analysis:result  → refreshes sessions and dashboard data
 */
export function useSocket(isAuthenticated: boolean) {
  const socketRef = useRef<Socket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) {
      // Disconnect if not authenticated
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    const token = getAccessToken();
    if (!token) return;

    // Don't reconnect if already connected
    if (socketRef.current?.connected) return;

    const socket = io(BACKEND_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 30000,
      reconnectionAttempts: 10,
    });

    socket.on('connect', () => {
      console.log('[SenseAI] Dashboard socket connected');
    });

    socket.on('disconnect', (reason) => {
      console.log('[SenseAI] Dashboard socket disconnected:', reason);
    });

    // Extension linked or unlinked → refresh devices list
    socket.on('devices:updated', () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    });

    // New analysis result from extension → refresh dashboard and sessions
    socket.on('analysis:result', () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    });

    // Extension unlinked notification (for info only, does NOT affect frontend auth)
    socket.on('extension:unlinked', () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated, queryClient]);
}
