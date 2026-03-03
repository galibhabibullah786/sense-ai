// ============================================================================
// SenseAI Frontend - API Hooks (TanStack Query)
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, getErrorMessage } from '@/lib/api';
import { toast } from 'sonner';
import type {
  DashboardData,
  PaginatedSessions,
  SessionDetail,
  AnalyticsData,
  Report,
  WhitelistEntry,
  BlocklistEntry,
  Device,
  LinkCode,
  UserPublic,
} from '@/types';

// ── Dashboard ────────────────────────────────────────────────────────────────

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => (await api.get('/dashboard')).data,
  });
}

// ── Sessions ─────────────────────────────────────────────────────────────────

interface SessionsParams {
  page?: number;
  perPage?: number;
  verdict?: string;
  domain?: string;
  sortBy?: string;
  sortOrder?: string;
}

export function useSessions(params: SessionsParams = {}) {
  return useQuery<PaginatedSessions>({
    queryKey: ['sessions', params],
    queryFn: async () => {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v != null && v !== '' && v !== 'all')
      );
      return (await api.get('/sessions', { params: cleanParams })).data;
    },
  });
}

export function useSessionDetail(id: string) {
  return useQuery<SessionDetail>({
    queryKey: ['session', id],
    queryFn: async () => (await api.get(`/sessions/${id}`)).data,
    enabled: !!id,
  });
}

export function useDeleteSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => (await api.delete(`/sessions/${id}`)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sessions'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Session deleted');
    },
    onError: (err) => {
      toast.error('Failed to delete', { description: getErrorMessage(err) });
    },
  });
}

// ── Analytics ────────────────────────────────────────────────────────────────

interface AnalyticsParams {
  period?: string;
  startDate?: string;
  endDate?: string;
}

export function useAnalytics(params: AnalyticsParams = {}) {
  return useQuery<AnalyticsData>({
    queryKey: ['analytics', params],
    queryFn: async () => {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v != null && v !== '')
      );
      return (await api.get('/analytics', { params: cleanParams })).data;
    },
  });
}

// ── Reports ──────────────────────────────────────────────────────────────────

export function useReports() {
  return useQuery<{ reports: Report[] }>({
    queryKey: ['reports'],
    queryFn: async () => (await api.get('/reports')).data,
  });
}

export function useGenerateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { type: 'session' | 'summary'; sessionId?: string; name?: string }) =>
      (await api.post('/reports', body)).data as Report,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reports'] });
      toast.success('Report generated successfully');
    },
    onError: (err) => {
      toast.error('Report generation failed', { description: getErrorMessage(err) });
    },
  });
}

export function useDownloadReport() {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.get(`/reports/${id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `senseai-report-${id}.html`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });
}

export function useDeleteReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => (await api.delete(`/reports/${id}`)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reports'] });
      toast.success('Report deleted');
    },
    onError: (err) => {
      toast.error('Failed to delete report', { description: getErrorMessage(err) });
    },
  });
}

// ── Whitelist ────────────────────────────────────────────────────────────────

export function useWhitelist() {
  return useQuery<{ whitelist: WhitelistEntry[] }>({
    queryKey: ['whitelist'],
    queryFn: async () => (await api.get('/whitelist')).data,
  });
}

export function useAddToWhitelist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { domain: string; reason?: string }) =>
      (await api.post('/whitelist', body)).data as WhitelistEntry,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['whitelist'] });
      toast.success('Domain added to whitelist');
    },
    onError: (err) => {
      toast.error('Failed to add', { description: getErrorMessage(err) });
    },
  });
}

export function useRemoveFromWhitelist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => (await api.delete(`/whitelist/${id}`)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['whitelist'] });
      toast.success('Domain removed from whitelist');
    },
    onError: (err) => {
      toast.error('Failed to remove', { description: getErrorMessage(err) });
    },
  });
}

export function useBlocklist() {
  return useQuery<{ blocklist: BlocklistEntry[] }>({
    queryKey: ['blocklist'],
    queryFn: async () => (await api.get('/whitelist/blocklist/user')).data,
  });
}

export function useAddToBlocklist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { domain: string; reason?: string }) =>
      (await api.post('/whitelist/blocklist', body)).data as BlocklistEntry,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['blocklist'] });
      toast.success('Domain added to blocklist');
    },
    onError: (err) => {
      toast.error('Failed to add', { description: getErrorMessage(err) });
    },
  });
}

export function useRemoveFromBlocklist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => (await api.delete(`/whitelist/blocklist/${id}`)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['blocklist'] });
      toast.success('Domain removed from blocklist');
    },
    onError: (err) => {
      toast.error('Failed to remove', { description: getErrorMessage(err) });
    },
  });
}

// ── User / Profile ───────────────────────────────────────────────────────────

export function useProfile() {
  return useQuery<UserPublic>({
    queryKey: ['profile'],
    queryFn: async () => (await api.get('/user/profile')).data,
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: async (body: { currentPassword: string; newPassword: string }) =>
      (await api.post('/user/password', body)).data,
    onSuccess: () => {
      toast.success('Password updated', { description: 'All other sessions have been revoked.' });
    },
    onError: (err) => {
      toast.error('Password update failed', { description: getErrorMessage(err) });
    },
  });
}

export function useDevices() {
  return useQuery<{ devices: Device[] }>({
    queryKey: ['devices'],
    queryFn: async () => (await api.get('/user/devices')).data,
  });
}

export function useRevokeDevice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (deviceId: string) => (await api.delete(`/user/devices/${deviceId}`)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['devices'] });
      toast.success('Device unlinked');
    },
    onError: (err) => {
      toast.error('Failed to unlink', { description: getErrorMessage(err) });
    },
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: async () => (await api.delete('/user/account')).data,
    onError: (err) => {
      toast.error('Delete failed', { description: getErrorMessage(err) });
    },
  });
}

// ── Link Extension ───────────────────────────────────────────────────────────

export function useGenerateLinkCode() {
  return useMutation<LinkCode>({
    mutationFn: async () => (await api.post('/auth/link-code')).data,
  });
}
