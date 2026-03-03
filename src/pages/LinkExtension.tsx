import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link2, Copy, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useGenerateLinkCode } from "@/hooks/useApi";

const LinkExtension = () => {
  const [copied, setCopied] = useState(false);
  const generateCode = useGenerateLinkCode();

  useEffect(() => {
    generateCode.mutate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const code = generateCode.data?.linkCode ?? "------";

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied!", { description: "Paste this in your browser extension" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-center"><h1 className="text-3xl font-bold">Link Extension</h1><p className="text-muted-foreground mt-1">Connect your browser extension to sync data</p></div>
        
        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"><Link2 className="h-8 w-8 text-primary" /></div>
          <p className="text-muted-foreground mb-6">Enter this code in your browser extension to link it with your account:</p>
          <div className="bg-muted rounded-xl p-6 mb-6">
            <p className="text-3xl font-mono font-bold tracking-widest">{code}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={copyCode} disabled={!generateCode.data}>{copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}{copied ? "Copied!" : "Copy Code"}</Button>
            <Button variant="outline" onClick={() => generateCode.mutate()} disabled={generateCode.isPending}>
              <RefreshCw className={`h-4 w-4 mr-2 ${generateCode.isPending ? "animate-spin" : ""}`} />New Code
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">Code expires in 5 minutes</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LinkExtension;
