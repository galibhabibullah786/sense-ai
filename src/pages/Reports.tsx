import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

const Reports = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground mt-1">Generate and download security reports</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Generate Report</Button>
      </div>
      <EmptyState title="No reports yet" description="Generate your first report to see it here" icon="folder" action={<Button><FileText className="h-4 w-4 mr-2" />Generate Report</Button>} />
    </div>
  </DashboardLayout>
);

export default Reports;
