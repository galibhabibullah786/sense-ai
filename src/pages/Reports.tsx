import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Download, Trash2 } from "lucide-react";
import { useReports, useGenerateReport, useDownloadReport, useDeleteReport } from "@/hooks/useApi";
import { format } from "date-fns";

const Reports = () => {
  const { data, isLoading } = useReports();
  const generateReport = useGenerateReport();
  const downloadReport = useDownloadReport();
  const deleteReport = useDeleteReport();

  const reports = data?.reports ?? [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground mt-1">Generate and download security reports</p>
          </div>
          <Button
            onClick={() => generateReport.mutate({ type: "summary", name: "Summary Report" })}
            disabled={generateReport.isPending}
          >
            <Plus className="h-4 w-4 mr-2" />
            {generateReport.isPending ? "Generating..." : "Generate Report"}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64"><LoadingSpinner /></div>
        ) : reports.length === 0 ? (
          <EmptyState
            title="No reports yet"
            description="Generate your first report to see it here"
            icon="folder"
            action={
              <Button onClick={() => generateReport.mutate({ type: "summary", name: "Summary Report" })}>
                <FileText className="h-4 w-4 mr-2" />Generate Report
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{report.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {report.type} • {format(new Date(report.created_at), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadReport.mutate(report.id)}
                  >
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteReport.mutate(report.id)}
                    disabled={deleteReport.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reports;
