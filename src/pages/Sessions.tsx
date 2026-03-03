import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TrustScoreBadge } from "@/components/shared/TrustScoreBadge";
import { VerdictBadge } from "@/components/shared/VerdictBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSessions } from "@/hooks/useApi";
import { formatDistanceToNow } from "date-fns";

const Sessions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [verdictFilter, setVerdictFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const { data, isLoading } = useSessions({
    page: currentPage,
    perPage,
    verdict: verdictFilter === "all" ? undefined : verdictFilter,
    domain: searchQuery || undefined,
  });

  const sessions = data?.sessions ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">Sessions</h1>
          <p className="text-muted-foreground mt-1">
            View and filter your browsing analysis history
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by domain or URL..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <Select
            value={verdictFilter}
            onValueChange={(value) => {
              setVerdictFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by verdict" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Verdicts</SelectItem>
              <SelectItem value="safe">Safe</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="danger">Danger</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Sessions list */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64"><LoadingSpinner /></div>
        ) : sessions.length === 0 ? (
          <EmptyState
            title="No sessions found"
            description="Try adjusting your search or filter criteria"
            icon="search"
          />
        ) : (
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                <Link
                  to={`/sessions/${session.id}`}
                  className="block bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Globe className="h-6 w-6 text-muted-foreground" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-lg truncate">
                          {session.domain}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {session.url}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right hidden md:block">
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(session.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <TrustScoreBadge score={session.trust_score} size="md" />
                      <VerdictBadge verdict={session.verdict} size="md" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-between"
          >
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * perPage + 1} to{" "}
              {Math.min(currentPage * perPage, data?.total ?? 0)} of{" "}
              {data?.total ?? 0} sessions
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Sessions;
