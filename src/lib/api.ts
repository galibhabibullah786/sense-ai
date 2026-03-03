// ============================================================================
// SenseAI Frontend - Axios API Client
// ============================================================================

import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorResponse, RefreshResponse } from '@/types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// ── Token management ─────────────────────────────────────────────────────────

let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;
let isInitialRestore = true;

export function setAccessToken(token: string | null): void {
  accessToken = token;
  // Once a token is explicitly set (by AuthContext after restore), mark restore as done
  if (token !== null) isInitialRestore = false;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function markRestoreComplete(): void {
  isInitialRestore = false;
}

// ── Request interceptor: attach Bearer token ─────────────────────────────────

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ── Response interceptor: refresh on 401 ─────────────────────────────────────

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const original = error.config;
    if (!original) return Promise.reject(error);

    // Only try refresh once; skip if this IS the refresh call or initial restore is in progress
    const isRefresh = original.url?.includes('/auth/refresh');
    const is401 = error.response?.status === 401;

    if (is401 && !isRefresh && !isInitialRestore && !(original as any).__retried) {
      (original as any).__retried = true;

      // Coalesce parallel refresh attempts
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken();
      }

      try {
        const newToken = await refreshPromise;
        refreshPromise = null;

        if (newToken) {
          accessToken = newToken;
          if (original.headers) {
            original.headers.Authorization = `Bearer ${newToken}`;
          }
          return api(original);
        }
      } catch {
        refreshPromise = null;
      }

      // Refresh failed → clear state and redirect to login
      accessToken = null;
      window.dispatchEvent(new CustomEvent('auth:expired'));
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

async function refreshAccessToken(): Promise<string | null> {
  try {
    const { data } = await api.post<RefreshResponse>('/auth/refresh');
    return data.accessToken;
  } catch {
    return null;
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    if (data?.error?.message) return data.error.message;
    if (error.response?.status === 429) return 'Too many requests. Please wait and try again.';
    if (error.response?.status === 500) return 'Something went wrong on our end. Please try again.';
    if (error.code === 'ERR_NETWORK') return 'Unable to connect to the server. Please check your connection.';
  }
  return 'An unexpected error occurred.';
}

export { API_BASE };
