"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { PrivacyManager, PrivacySettings } from "@/utils/privacyManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Download, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function PrivacySettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<PrivacySettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  if (!user) return null;

  const loadSettings = () => {
    const loaded = PrivacyManager.getPrivacySettings(user.id);
    setSettings(loaded);
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      PrivacyManager.savePrivacySettings(user.id, settings);
      toast({ title: "Settings saved", description: "Your privacy preferences have been updated." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = (format: "json" | "csv" | "pdf") => {
    try {
      const data = PrivacyManager.exportData(user.id, "all", format);
      const blob = new Blob([data], { type: format === "csv" ? "text/csv" : "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `personnel-data-${user.id}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Export complete", description: `Data exported as ${format.toUpperCase()}` });
    } catch (error) {
      toast({ title: "Export failed", description: "No data available to export.", variant: "destructive" });
    }
  };

  const handleDeleteAll = () => {
    if (confirm("This will permanently delete ALL your data. This action cannot be undone. Are you sure?")) {
      PrivacyManager.deleteAllData(user.id);
      toast({ title: "Data deleted", description: "All personal data has been permanently removed." });
      loadSettings();
    }
  };

  if (isLoading || !settings) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-[#0F766E]" />
        <h2 className="text-xl font-bold text-slate-900">Privacy & Data Control</h2>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <CheckCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          You have full control over your data. Changes take effect immediately.
        </AlertDescription>
      </Alert>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Data Sharing & Analytics</CardTitle>
          <CardDescription>Control how your data is used for welfare monitoring and analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium text-slate-900">Data Sharing</Label>
              <p className="text-sm text-slate-500">Allow your data to be used for welfare monitoring</p>
            </div>
            <Switch
              checked={settings.dataSharing}
              onCheckedChange={checked => setSettings(prev => prev ? { ...prev, dataSharing: checked } : null)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium text-slate-900">Analytics & Insights</Label>
              <p className="text-sm text-slate-500">Enable AI-powered health insights and trend analysis</p>
            </div>
            <Switch
              checked={settings.analyticsEnabled}
              onCheckedChange={checked => setSettings(prev => prev ? { ...prev, analyticsEnabled: checked } : null)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium text-slate-900">Research Participation</Label>
              <p className="text-sm text-slate-500">Contribute anonymized data to organizational research</p>
            </div>
            <Switch
              checked={settings.researchParticipation}
              onCheckedChange={checked => setSettings(prev => prev ? { ...prev, researchParticipation: checked } : null)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium text-slate-900">Auto-Anonymize</Label>
              <p className="text-sm text-slate-500">Automatically anonymize data after retention period</p>
            </div>
            <Switch
              checked={settings.autoAnonymize}
              onCheckedChange={checked => setSettings(prev => prev ? { ...prev, autoAnonymize: checked } : null)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how you receive welfare alerts and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "email", label: "Email Notifications", desc: "Receive alerts via email" },
            { key: "push", label: "Push Notifications", desc: "Receive real-time alerts on device" },
            { key: "sms", label: "SMS Alerts", desc: "Receive critical alerts via SMS" }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-slate-900">{label}</Label>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
              <Switch
                checked={settings.notificationPreferences[key as keyof typeof settings.notificationPreferences]}
                onCheckedChange={checked => setSettings(prev => prev ? {
                  ...prev,
                  notificationPreferences: { ...prev.notificationPreferences, [key]: checked }
                } : null)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Data Retention</CardTitle>
          <CardDescription>Configure how long your data is stored before auto-deletion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium text-slate-900">Retention Period</Label>
              <p className="text-sm text-slate-500">Days to keep data before auto-anonymization</p>
            </div>
            <select
              value={settings.dataRetentionDays}
              onChange={e => setSettings(prev => prev ? { ...prev, dataRetentionDays: parseInt(e.target.value) } : null)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value={90}>90 days</option>
              <option value={180}>180 days</option>
              <option value={365}>1 year (default)</option>
              <option value={730}>2 years</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible actions that permanently affect your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
            <div>
              <p className="font-medium text-red-800">Delete All Data</p>
              <p className="text-sm text-red-600">Permanently remove all personal data from the system</p>
            </div>
            <Button
              variant="destructive"
              onClick={handleDeleteAll}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Everything
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Export Your Data</CardTitle>
          <CardDescription>Download a copy of all your data in various formats</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3 flex-wrap">
          <Button variant="outline" onClick={() => handleExport("json")}>
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
          <Button variant="outline" onClick={() => handleExport("csv")}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </CardContent>
      </Card>

      <Button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full bg-gradient-to-r from-[#0F766E] to-teal-500"
      >
        {isSaving ? "Saving..." : "Save Privacy Settings"}
      </Button>
    </div>
  );
}