// ============================================================================
// SenseAI Frontend - Shared Types (mirroring backend)
// ============================================================================

// ── User & Auth ──────────────────────────────────────────────────────────────

export interface UserPublic {
  id: string;
  username: string;
  created_at: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserPublic;
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface LinkCode {
  linkCode: string;
  expiresAt: string;
}

// ── Sessions ─────────────────────────────────────────────────────────────────

export type Verdict = 'safe' | 'warning' | 'danger';

export interface SessionListItem {
  id: string;
  url: string;
  domain: string;
  trust_score: number;
  verdict: Verdict;
  created_at: string;
}

export interface SignalBreakdown {
  cookies: { score: number; count: number; thirdPartyCount: number };
  trackers: { score: number; detected: string[]; count: number };
  fingerprinting: { score: number; techniques: string[]; risk: string };
  headers: { score: number; present: string[]; missing: string[] };
  ssl: { score: number; valid: boolean; protocol?: string };
}

export interface SessionDetail {
  id: string;
  url: string;
  domain: string;
  trust_score: number;
  verdict: Verdict;
  signal_breakdown: SignalBreakdown;
  explanation: {
    text: string;
    generated_at: string;
  } | null;
  created_at: string;
}

export interface PaginatedSessions {
  sessions: SessionListItem[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// ── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardData {
  user: UserPublic;
  stats: {
    totalSessions: number;
    averageScore: number;
    domainsAnalyzed: number;
    alertsCount: number;
  };
  recentSessions: SessionListItem[];
}

// ── Analytics ────────────────────────────────────────────────────────────────

export interface AnalyticsData {
  period: { start: string; end: string };
  trendData: Array<{ date: string; averageScore: number; sessionCount: number }>;
  domainComparison: Array<{ domain: string; averageScore: number; sessionCount: number }>;
  worstOffenders: Array<{ domain: string; averageScore: number; sessionCount: number }>;
  summary: {
    averageScore: number;
    totalSessions: number;
    trend: 'improving' | 'declining' | 'stable';
    trendPercentage: number;
  };
}

// ── Reports ──────────────────────────────────────────────────────────────────

export interface Report {
  id: string;
  type: 'session' | 'summary';
  name: string;
  file_path: string;
  expires_at: string;
  created_at: string;
}

// ── Whitelist / Blocklist ────────────────────────────────────────────────────

export interface WhitelistEntry {
  id: string;
  domain: string;
  reason: string | null;
  created_at: string;
}

export interface BlocklistEntry {
  id: string;
  domain: string;
  reason: string | null;
  severity?: string;
  added_by?: string;
  created_at?: string;
}

export interface UrlCheckResult {
  blocked: boolean;
  reason?: string;
  whitelisted: boolean;
}

// ── Devices ──────────────────────────────────────────────────────────────────

export interface Device {
  id: string;
  device_name: string;
  created_at: string;
  is_current: boolean;
}

// ── API Errors ───────────────────────────────────────────────────────────────

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
