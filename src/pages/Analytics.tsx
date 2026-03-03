import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TrustScoreGauge } from "@/components/shared/TrustScoreGauge";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useAnalytics } from "@/hooks/useApi";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const Analytics = () => {
  const { data, isLoading } = useAnalytics({ period: "30d" });

  if (isLoading) {
    return <DashboardLayout><div className="flex items-center justify-center h-64"><LoadingSpinner /></div></DashboardLayout>;
  }

  const trendData = data?.trendData ?? [];
  const domainComparison = data?.domainComparison ?? [];
  const summary = data?.summary ?? { averageScore: 0, totalSessions: 0, trend: "stable" as const, trendPercentage: 0 };

  const TrendIcon = summary.trend === "improving" ? TrendingUp : summary.trend === "declining" ? TrendingDown : Minus;
  const trendColor = summary.trend === "improving" ? "text-trust-safe" : summary.trend === "declining" ? "text-trust-danger" : "text-muted-foreground";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your browsing security trends</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl border border-border p-6 flex flex-col items-center">
            <TrustScoreGauge score={summary.averageScore} size="md" label="30-Day Average" />
            <div className={`flex items-center gap-2 mt-4 ${trendColor}`}>
              <TrendIcon className="h-4 w-4" />
              <span className="text-sm font-medium">
                {summary.trend === "improving" ? "+" : summary.trend === "declining" ? "-" : ""}{summary.trendPercentage}% {summary.trend}
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">Trust Score Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Line type="monotone" dataKey="averageScore" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Top Domains by Trust Score</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={domainComparison.slice(0, 6)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="domain" type="category" width={120} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Bar dataKey="averageScore" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
