import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { mockPersonnel } from "@/data/mockPersonnel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function Index() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    division: "",
    aadharId: ""
  });
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate verification delay
    setTimeout(() => {
      const matched = mockPersonnel.find(p => 
        p.name.toLowerCase() === formData.name.toLowerCase() &&
        p.rank.toLowerCase() === formData.rank.toLowerCase() &&
        p.division.toLowerCase() === formData.division.toLowerCase() &&
        p.aadharId === formData.aadharId
      );

      if (matched) {
        login({
          id: matched.id,
          name: matched.name,
          role: matched.role,
          division: matched.division,
          rank: matched.rank,
          aadharId: matched.aadharId,
          yearsOfService: matched.yearsOfService
        });
        navigate("/dashboard");
      } else {
        setError("Details not matched. Please verify your credentials.");
        setIsVerifying(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F0F7FA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-[#0F766E] mb-4 shadow-lg">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Personnel Stress & Welfare Monitor</h1>
          <p className="text-slate-600 mt-2">AI-driven predictive monitoring system</p>
        </div>

        {/* Login Card */}
        <Card className="border-slate-200 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-slate-900">Personnel Verification</CardTitle>
            <CardDescription>
              Enter your details to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="pl-10 border-slate-300 focus:border-[#0F766E] focus:ring-[#0F766E]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rank" className="text-slate-700">Rank</Label>
                <Input
                  id="rank"
                  type="text"
                  placeholder="e.g., Inspector, Constable, Subedar"
                  value={formData.rank}
                  onChange={(e) => handleChange("rank", e.target.value)}
                  className="border-slate-300 focus:border-[#0F766E] focus:ring-[#0F766E]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="division" className="text-slate-700">Division</Label>
                <Input
                  id="division"
                  type="text"
                  placeholder="e.g., Mumbai, Delhi, Chennai"
                  value={formData.division}
                  onChange={(e) => handleChange("division", e.target.value)}
                  className="border-slate-300 focus:border-[#0F766E] focus:ring-[#0F766E]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadharId" className="text-slate-700">Aadhar ID</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="aadharId"
                    type="text"
                    placeholder="12-digit Aadhar number"
                    value={formData.aadharId}
                    onChange={(e) => handleChange("aadharId", e.target.value.replace(/\D/g, '').slice(0, 12))}
                    className="pl-10 border-slate-300 focus:border-[#0F766E] focus:ring-[#0F766E]"
                    maxLength={12}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-medium py-2.5"
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify & Login"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 text-center">
                <strong>Demo Credentials:</strong><br />
                Name: Rajesh Kumar, Rank: Inspector, Division: Mumbai, Aadhar: 123456789012
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-slate-500 text-sm">
          <p>Demo System — All data is simulated for evaluation purposes</p>
          <p className="mt-1">Ethical AI practices | Transparent risk factors | Privacy-first design</p>
        </div>
      </div>
    </div>
  );
}