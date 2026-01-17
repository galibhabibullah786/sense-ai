import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { User, Moon, Sun, Trash2 } from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div><h1 className="text-3xl font-bold">Settings</h1><p className="text-muted-foreground mt-1">Manage your account preferences</p></div>

        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <h2 className="text-lg font-semibold flex items-center gap-2"><User className="h-5 w-5" />Profile</h2>
          <div className="space-y-4">
            <div><label className="text-sm font-medium mb-2 block">Name</label><Input defaultValue={user?.name} /></div>
            <div><label className="text-sm font-medium mb-2 block">Email</label><Input defaultValue={user?.email} type="email" /></div>
            <Button>Save Changes</Button>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">{theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}<div><p className="font-medium">Dark Mode</p><p className="text-sm text-muted-foreground">Toggle dark/light theme</p></div></div>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-destructive/50 p-6">
          <h2 className="text-lg font-semibold text-destructive flex items-center gap-2"><Trash2 className="h-5 w-5" />Danger Zone</h2>
          <p className="text-sm text-muted-foreground mt-2 mb-4">Once you delete your account, there is no going back.</p>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
