import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import PrivacySettings from "@/components/PrivacySettings";

export default function PrivacyPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F0F7FA]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Privacy & Data Control</h1>
              <p className="text-slate-600">Manage your data preferences and privacy settings</p>
            </div>
          </div>

          <Card className="border-slate-200 shadow-lg">
            <CardHeader className="text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-[#0F766E] to-teal-500 mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate-900">Your Privacy Dashboard</CardTitle>
              <CardDescription>
                Control how your personal and biometric data is collected, used, and shared
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PrivacySettings />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}