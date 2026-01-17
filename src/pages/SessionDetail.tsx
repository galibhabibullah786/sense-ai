import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  Cookie,
  Eye,
  Fingerprint,
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Sparkles,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TrustScoreGauge } from "@/components/shared/TrustScoreGauge";
import { VerdictBadge } from "@/components/shared/VerdictBadge";
import { TrustScoreBadge } from "@/components/shared/TrustScoreBadge";
import { Button } from "@/components/ui/button";
import { mockSessionDetail } from "@/data/mockData";
import { formatDistanceToNow, format } from "date-fns";
import { cn } from "@/lib/utils";

const signalIcons = {
  cookies: Cookie,
  trackers: Eye,
  fingerprinting: Fingerprint,
  headers: Shield,
  ssl: Lock,
};

const SessionDetail = () => {
  const { id } = useParams();
  const session = mockSessionDetail; // In real app, fetch by id

  const signalCategories = [
    {
      key: "cookies",
      label: "Cookies",
      icon: Cookie,
      score: session.signals.cookies.score,
      details: [
        `${session.signals.cookies.count} cookies detected`,
        `${session.signals.cookies.thirdPartyCount} third-party cookies`,
      ],
    },
    {
      key: "trackers",
      label: "Trackers",
      icon: Eye,
      score: session.signals.trackers.score,
      details: [
        `${session.signals.trackers.detected.length} trackers detected`,
        session.signals.trackers.detected.join(", "),
      ],
    },
    {
      key: "fingerprinting",
      label: "Fingerprinting",
      icon: Fingerprint,
      score: session.signals.fingerprinting.score,
      details: [
        `Risk level: ${session.signals.fingerprinting.risk}`,
        `Techniques: ${session.signals.fingerprinting.techniques.join(", ")}`,
      ],
    },
    {
      key: "headers",
      label: "Security Headers",
      icon: Shield,
      score: session.signals.headers.score,
      details: [
        `${session.signals.headers.present.length} headers present`,
        `${session.signals.headers.missing.length} headers missing`,
      ],
    },
    {
      key: "ssl",
      label: "SSL/TLS",
      icon: Lock,
      score: session.signals.ssl.score,
      details: [
        `Issuer: ${session.signals.ssl.issuer}`,
        `Valid: ${session.signals.ssl.valid ? "Yes" : "No"}`,
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button variant="ghost" size="sm" asChild>
            <Link to="/sessions" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Sessions
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <Globe className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold truncate">{session.domain}</h1>
                <p className="text-muted-foreground truncate">{session.url}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Analyzed {formatDistanceToNow(new Date(session.analyzedAt), { addSuffix: true })} • {format(new Date(session.analyzedAt), "PPp")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <VerdictBadge verdict={session.verdict} size="lg" />
            </div>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trust Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-xl border border-border p-6 h-full flex flex-col items-center justify-center">
              <TrustScoreGauge score={session.trustScore} size="lg" label="Overall Trust Score" />
            </div>
          </motion.div>

          {/* Signal Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Signal Breakdown</h2>
              <div className="space-y-4">
                {signalCategories.map((category, index) => (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                        category.score >= 70
                          ? "bg-trust-safe/10 text-trust-safe"
                          : category.score >= 40
                          ? "bg-trust-warning/10 text-trust-warning"
                          : "bg-trust-danger/10 text-trust-danger"
                      )}
                    >
                      <category.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{category.label}</h3>
                        <TrustScoreBadge score={category.score} size="sm" />
                      </div>
                      <div className="space-y-1">
                        {category.details.map((detail, i) => (
                          <p key={i} className="text-sm text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Security Headers Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Security Headers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-trust-safe" />
                Present Headers
              </h3>
              <div className="space-y-2">
                {session.signals.headers.present.map((header) => (
                  <div
                    key={header}
                    className="px-3 py-2 rounded-lg bg-trust-safe/10 text-trust-safe text-sm font-mono"
                  >
                    {header}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-trust-danger" />
                Missing Headers
              </h3>
              <div className="space-y-2">
                {session.signals.headers.missing.map((header) => (
                  <div
                    key={header}
                    className="px-3 py-2 rounded-lg bg-trust-danger/10 text-trust-danger text-sm font-mono"
                  >
                    {header}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">AI Analysis</h2>
              <p className="text-sm text-muted-foreground">
                Generated {formatDistanceToNow(new Date(session.explanation.generatedAt!), { addSuffix: true })}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {session.explanation.text}
          </p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SessionDetail;
