import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  useUpdatePassword,
  useDevices,
  useRevokeDevice,
  useDeleteAccount,
  useWhitelist,
  useAddToWhitelist,
  useRemoveFromWhitelist,
  useBlocklist,
  useAddToBlocklist,
  useRemoveFromBlocklist,
} from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Monitor, Plus, X, Shield, Globe, Eye, EyeOff } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const updatePassword = useUpdatePassword();

  // Devices
  const { data: devicesData, isLoading: devicesLoading } = useDevices();
  const revokeDevice = useRevokeDevice();

  // Whitelist
  const { data: whitelistData, isLoading: whitelistLoading } = useWhitelist();
  const addToWhitelist = useAddToWhitelist();
  const removeFromWhitelist = useRemoveFromWhitelist();
  const [newDomain, setNewDomain] = useState("");

  // Blocklist
  const { data: blocklistData, isLoading: blocklistLoading } = useBlocklist();
  const addToBlocklist = useAddToBlocklist();
  const removeFromBlocklist = useRemoveFromBlocklist();
  const [newBlockDomain, setNewBlockDomain] = useState("");

  // Delete account
  const deleteAccount = useDeleteAccount();

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword) return;
    updatePassword.mutate({ currentPassword, newPassword }, {
      onSuccess: () => { setCurrentPassword(""); setNewPassword(""); }
    });
  };

  const handleAddWhitelist = () => {
    if (!newDomain.trim()) return;
    addToWhitelist.mutate({ domain: newDomain.trim() }, {
      onSuccess: () => setNewDomain(""),
    });
  };

  const handleAddBlocklist = () => {
    if (!newBlockDomain.trim()) return;
    addToBlocklist.mutate({ domain: newBlockDomain.trim() }, {
      onSuccess: () => setNewBlockDomain(""),
    });
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    deleteAccount.mutate(undefined, {
      onSuccess: async () => {
        await logout();
        navigate("/");
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div><h1 className="text-3xl font-bold">Settings</h1><p className="text-muted-foreground mt-1">Manage your account preferences</p></div>

        {/* Change Password */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Shield className="h-5 w-5" />Change Password</h2>
          <div>
            <label className="text-sm font-medium mb-2 block">Current Password</label>
            <div className="relative">
              <Input type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="pr-10" />
              <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">New Password</label>
            <div className="relative">
              <Input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="pr-10" />
              <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button onClick={handleChangePassword} disabled={updatePassword.isPending}>
            {updatePassword.isPending ? "Updating..." : "Update Password"}
          </Button>
        </div>

        {/* Linked Devices */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Monitor className="h-5 w-5" />Linked Devices</h2>
          {devicesLoading ? <LoadingSpinner /> : (
            <div className="space-y-3">
              {(devicesData?.devices ?? []).map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{device.device_name}</p>
                    <p className="text-xs text-muted-foreground">{device.is_current ? "Current session" : `Linked ${new Date(device.created_at).toLocaleDateString()}`}</p>
                  </div>
                  {!device.is_current && (
                    <Button variant="ghost" size="sm" onClick={() => revokeDevice.mutate(device.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {(devicesData?.devices ?? []).length === 0 && <p className="text-sm text-muted-foreground">No devices linked</p>}
            </div>
          )}
        </div>

        {/* Whitelist */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Globe className="h-5 w-5" />Whitelisted Domains</h2>
          <p className="text-sm text-muted-foreground">Whitelisted domains will still be analyzed but won't trigger blocking. Reports will still be generated.</p>
          <div className="flex gap-2">
            <Input placeholder="example.com" value={newDomain} onChange={(e) => setNewDomain(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddWhitelist()} />
            <Button onClick={handleAddWhitelist} disabled={addToWhitelist.isPending}>
              <Plus className="h-4 w-4 mr-1" />Add
            </Button>
          </div>
          {whitelistLoading ? <LoadingSpinner /> : (
            <div className="space-y-2">
              {(whitelistData?.whitelist ?? []).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm font-mono">{entry.domain}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeFromWhitelist.mutate(entry.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {(whitelistData?.whitelist ?? []).length === 0 && <p className="text-sm text-muted-foreground">No whitelisted domains</p>}
            </div>
          )}
        </div>

        {/* Blocklist */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Shield className="h-5 w-5 text-destructive" />Blocked Domains</h2>
          <p className="text-sm text-muted-foreground">Blocked domains will be prevented from loading. System entries cannot be removed.</p>
          <div className="flex gap-2">
            <Input placeholder="malicious-site.com" value={newBlockDomain} onChange={(e) => setNewBlockDomain(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddBlocklist()} />
            <Button variant="destructive" onClick={handleAddBlocklist} disabled={addToBlocklist.isPending}>
              <Plus className="h-4 w-4 mr-1" />Block
            </Button>
          </div>
          {blocklistLoading ? <LoadingSpinner /> : (
            <div className="space-y-2">
              {(blocklistData?.blocklist ?? []).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/10">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-mono text-destructive truncate">{entry.domain}</span>
                    {entry.reason && <span className="text-xs text-muted-foreground hidden sm:inline">— {entry.reason}</span>}
                    {entry.added_by === 'system' && <span className="text-xs bg-muted px-1.5 py-0.5 rounded">system</span>}
                  </div>
                  {entry.added_by !== 'system' && (
                    <Button variant="ghost" size="sm" onClick={() => removeFromBlocklist.mutate(entry.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {(blocklistData?.blocklist ?? []).length === 0 && <p className="text-sm text-muted-foreground">No blocked domains</p>}
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-card rounded-xl border border-destructive/50 p-6">
          <h2 className="text-lg font-semibold text-destructive flex items-center gap-2"><Trash2 className="h-5 w-5" />Danger Zone</h2>
          <p className="text-sm text-muted-foreground mt-2 mb-4">Once you delete your account, there is no going back.</p>
          <Button variant="destructive" onClick={handleDeleteAccount} disabled={deleteAccount.isPending}>
            {deleteAccount.isPending ? "Deleting..." : "Delete Account"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
