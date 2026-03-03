import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity, Globe, AlertTriangle, BarChart3, ArrowRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/shared/StatCard";
import { TrustScoreGauge } from "@/components/shared/TrustScoreGauge";
import { TrustScoreBadge } from "@/components/shared/TrustScoreBadge";
import { VerdictBadge } from "@/components/shared/VerdictBadge";
import { useDashboard } from "@/hooks/useApi";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return <DashboardLayout><div className="flex items-center justify-center h-64"><LoadingSpinner /></div></DashboardLayout>;
  }

  const stats = data?.stats ?? { totalSessions: 0, averageScore: 0, domainsAnalyzed: 0, alertsCount: 0 };
  const recentSessions = data?.recentSessions ?? [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.username || "User"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your browsing security
          </p>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Sessions"
            value={stats.totalSessions}
            icon={Activity}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Average Score"
            value={stats.averageScore}
            icon={BarChart3}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Domains Analyzed"
            value={stats.domainsAnalyzed}
            icon={Globe}
          />
          <StatCard
            title="Active Alerts"
            value={stats.alertsCount}
            icon={AlertTriangle}
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trust Score Gauge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-xl border border-border p-6 h-full flex flex-col items-center justify-center">
              <TrustScoreGauge score={stats.averageScore} size="lg" />
              <p className="mt-4 text-center text-muted-foreground text-sm">
                Your average trust score across all analyzed websites
              </p>
            </div>
          </motion.div>

          {/* Recent Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recent Sessions</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/sessions" className="flex items-center gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {recentSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      to={`/sessions/${session.id}`}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{session.domain}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {session.url}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <TrustScoreBadge score={session.trust_score} size="sm" />
                        <VerdictBadge verdict={session.verdict} size="sm" />
                        <span className="text-sm text-muted-foreground hidden sm:block">
                          {formatDistanceToNow(new Date(session.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <Link
            to="/sessions"
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
          >
            <Activity className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              View All Sessions
            </h3>
            <p className="text-sm text-muted-foreground">
              Browse your complete history of analyzed websites
            </p>
          </Link>

          <Link
            to="/analytics"
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
          >
            <BarChart3 className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              View Analytics
            </h3>
            <p className="text-sm text-muted-foreground">
              Explore trends and insights from your browsing data
            </p>
          </Link>

          <Link
            to="/link-extension"
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
          >
            <Globe className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              Link Extension
            </h3>
            <p className="text-sm text-muted-foreground">
              Connect your browser extension to sync data
            </p>
          </Link>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
