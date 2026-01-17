export interface Session {
  id: string;
  domain: string;
  url: string;
  trustScore: number;
  verdict: "safe" | "warning" | "danger";
  analyzedAt: string;
  signalsCount: number;
  hasExplanation: boolean;
}

export interface DashboardData {
  stats: {
    totalSessions: number;
    averageScore: number;
    domainsAnalyzed: number;
    alertsCount: number;
  };
  recentSessions: Session[];
}

export const mockSessions: Session[] = [
  {
    id: "1",
    domain: "amazon.com",
    url: "https://amazon.com/products/electronics",
    trustScore: 85,
    verdict: "safe",
    analyzedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    signalsCount: 12,
    hasExplanation: true,
  },
  {
    id: "2",
    domain: "suspicious-deals.net",
    url: "https://suspicious-deals.net/offer/12345",
    trustScore: 25,
    verdict: "danger",
    analyzedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    signalsCount: 18,
    hasExplanation: true,
  },
  {
    id: "3",
    domain: "github.com",
    url: "https://github.com/facebook/react",
    trustScore: 92,
    verdict: "safe",
    analyzedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    signalsCount: 8,
    hasExplanation: true,
  },
  {
    id: "4",
    domain: "blog.unknown.io",
    url: "https://blog.unknown.io/article/tech-news",
    trustScore: 55,
    verdict: "warning",
    analyzedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    signalsCount: 15,
    hasExplanation: true,
  },
  {
    id: "5",
    domain: "google.com",
    url: "https://google.com/search?q=trust+analysis",
    trustScore: 95,
    verdict: "safe",
    analyzedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    signalsCount: 6,
    hasExplanation: true,
  },
  {
    id: "6",
    domain: "freeprizes.click",
    url: "https://freeprizes.click/winner",
    trustScore: 12,
    verdict: "danger",
    analyzedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    signalsCount: 22,
    hasExplanation: true,
  },
  {
    id: "7",
    domain: "medium.com",
    url: "https://medium.com/@author/article",
    trustScore: 78,
    verdict: "safe",
    analyzedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    signalsCount: 10,
    hasExplanation: true,
  },
  {
    id: "8",
    domain: "sketchy-download.xyz",
    url: "https://sketchy-download.xyz/free-software",
    trustScore: 18,
    verdict: "danger",
    analyzedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    signalsCount: 25,
    hasExplanation: true,
  },
];

export const mockDashboardData: DashboardData = {
  stats: {
    totalSessions: 156,
    averageScore: 72,
    domainsAnalyzed: 89,
    alertsCount: 12,
  },
  recentSessions: mockSessions.slice(0, 5),
};

export const mockSessionDetail = {
  id: "1",
  url: "https://amazon.com/products/electronics",
  domain: "amazon.com",
  trustScore: 85,
  verdict: "safe" as const,
  analyzedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  signals: {
    cookies: {
      score: 80,
      count: 12,
      thirdPartyCount: 4,
      details: [
        { name: "session_id", domain: "amazon.com", secure: true, httpOnly: true },
        { name: "analytics", domain: "google.com", secure: true, httpOnly: false },
        { name: "preferences", domain: "amazon.com", secure: true, httpOnly: true },
      ],
    },
    trackers: {
      score: 75,
      detected: ["Google Analytics", "Facebook Pixel"],
      blocked: 0,
    },
    fingerprinting: {
      score: 90,
      techniques: ["Canvas"],
      risk: "low" as const,
    },
    headers: {
      score: 88,
      missing: ["Permissions-Policy"],
      present: ["Content-Security-Policy", "X-Frame-Options", "X-Content-Type-Options"],
      issues: ["Missing Permissions-Policy header"],
    },
    ssl: {
      score: 100,
      valid: true,
      issuer: "DigiCert Inc",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString(),
    },
  },
  explanation: {
    status: "complete" as const,
    text: "This website demonstrates strong security practices. Amazon.com uses HTTPS with a valid SSL certificate from DigiCert, implements comprehensive security headers including Content-Security-Policy and X-Frame-Options, and handles cookies securely with HttpOnly and Secure flags. While some third-party trackers are present (Google Analytics, Facebook Pixel), they are industry-standard analytics tools. The only minor concern is the missing Permissions-Policy header, but overall the site maintains high trust levels suitable for secure transactions.",
    generatedAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
};

export const mockAnalyticsData = {
  period: {
    start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    end: new Date().toISOString(),
  },
  trendData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * (29 - i)).toISOString().split("T")[0],
    averageScore: Math.round(65 + Math.random() * 25),
    sessionCount: Math.round(3 + Math.random() * 8),
  })),
  domainComparison: [
    { domain: "google.com", averageScore: 94, sessionCount: 45 },
    { domain: "amazon.com", averageScore: 86, sessionCount: 32 },
    { domain: "github.com", averageScore: 92, sessionCount: 28 },
    { domain: "medium.com", averageScore: 78, sessionCount: 22 },
    { domain: "twitter.com", averageScore: 75, sessionCount: 18 },
    { domain: "reddit.com", averageScore: 72, sessionCount: 15 },
    { domain: "unknown-blog.io", averageScore: 45, sessionCount: 8 },
    { domain: "sketchy-site.net", averageScore: 22, sessionCount: 3 },
  ],
  signalBreakdown: [
    { category: "SSL/TLS", averageImpact: 15, frequency: 100 },
    { category: "Security Headers", averageImpact: 25, frequency: 85 },
    { category: "Cookies", averageImpact: 20, frequency: 95 },
    { category: "Trackers", averageImpact: 18, frequency: 78 },
    { category: "Fingerprinting", averageImpact: 12, frequency: 42 },
    { category: "Content Analysis", averageImpact: 10, frequency: 65 },
  ],
  summary: {
    averageScore: 72,
    totalSessions: 156,
    trend: "improving" as const,
    trendPercentage: 8,
  },
};

export const reviews = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Security Analyst",
    company: "TechCorp",
    avatar: "SC",
    rating: 5,
    text: "TrustAnalyzer has become an essential part of my daily workflow. It catches suspicious sites that I might have missed, and the detailed explanations help me understand exactly what's happening.",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Privacy Advocate",
    company: "Digital Rights Foundation",
    avatar: "MJ",
    rating: 5,
    text: "Finally, a tool that makes web privacy accessible to everyone. The trust scores are intuitive, and I love how it breaks down tracking behavior in plain English.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "IT Manager",
    company: "GlobalRetail Inc",
    avatar: "ER",
    rating: 5,
    text: "We deployed TrustAnalyzer across our organization and saw phishing incidents drop by 60%. The real-time analysis gives our team confidence when browsing vendor sites.",
  },
  {
    id: 4,
    name: "David Park",
    role: "Software Engineer",
    company: "StartupXYZ",
    avatar: "DP",
    rating: 4,
    text: "Great tool for developers who want to ensure they're not inadvertently visiting compromised sites. The API integration possibilities are exciting.",
  },
  {
    id: 5,
    name: "Amanda Foster",
    role: "Cybersecurity Consultant",
    company: "SecureNet Solutions",
    avatar: "AF",
    rating: 5,
    text: "I recommend TrustAnalyzer to all my clients. It's like having a security expert reviewing every website you visit in real-time.",
  },
];
