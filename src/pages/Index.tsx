import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { mockPersonnel, RANKS, DIVISIONS } from "@/data/mockPersonnel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, Lock, ArrowRight, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

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
  const [rankDropdownOpen, setRankDropdownOpen] = useState(false);
  const [divisionSuggestions, setDivisionSuggestions] = useState<string[]>([]);
  const [showDivisionSuggestions, setShowDivisionSuggestions] = useState(false);
  const rankDropdownRef = useRef<HTMLDivElement>(null);
  const divisionRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rankDropdownRef.current && !rankDropdownRef.current.contains(event.target as Node)) {
        setRankDropdownOpen(false);
      }
      if (divisionRef.current && !divisionRef.current.contains(event.target as Node)) {
        setShowDivisionSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleRankSelect = (rank: string) => {
    setFormData(prev => ({ ...prev, rank }));
    setRankDropdownOpen(false);
  };

  const handleDivisionChange = (value: string) => {
    setFormData(prev => ({ ...prev, division: value }));
    if (value.length > 0) {
      const filtered = DIVISIONS.filter(d => 
        d.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setDivisionSuggestions(filtered);
      setShowDivisionSuggestions(true);
    } else {
      setDivisionSuggestions([]);
      setShowDivisionSuggestions(false);
    }
  };

  const handleDivisionSelect = (division: string) => {
    setFormData(prev => ({ ...prev, division }));
    setShowDivisionSuggestions(false);
  };

  const handleAadharChange = (value: string) => {
    // Only allow digits, max 12
    const digits = value.replace(/\D/g, "").slice(0, 12);
    setFormData(prev => ({ ...prev, aadharId: digits }));
  };

  const formatAadhar = (value: string) => {
    if (!value) return "XXXX XXXX XXXX";
    const padded = value.padEnd(12, "X");
    return `${padded.slice(0, 4)} ${padded.slice(4, 8)} ${padded.slice(8, 12)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
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
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-[#0F766E] mb-4 shadow-lg w-24 h-24">
            {/* Logo placeholder - circular */}
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">RakhshaSetu</h1>
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
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
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

              {/* Rank Field - Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="rank" className="text-slate-700">Rank</Label>
                <div className="relative" ref={rankDropdownRef}>
                  <Input
                    id="rank"
                    type="text"
                    placeholder="Select your rank"
                    value={formData.rank}
                    onChange={(e) => handleChange("rank", e.target.value)}
                    onClick={() => setRankDropdownOpen(!rankDropdownOpen)}
                    className="border-slate-300 focus:border-[#0F766E] focus:ring-[#0F766E] cursor-pointer"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setRankDropdownOpen(!rankDropdownOpen)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {rankDropdownOpen ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                  {rankDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {RANKS.map(rank => (
                        <button
                          key={rank}
                          type="button"
                          className="w-full px-3 py-2 text-left text-sm hover:bg-[#0F766E]/10 hover:text-[#0F766E] transition-colors"
                          onClick={() => handleRankSelect(rank)}
                        >
                          {rank}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Division Field - Autocomplete */}
              <div className="space-y-2">
                <Label htmlFor="division" className="text-slate-700">Division</Label>
                <div className="relative" ref={divisionRef}>
                  <Input
                    id="division"
                    type="text"
                    placeholder="Start typing city name..."
                    value={formData.division}
                    onChange={(e) => handleDivisionChange(e.target.value)}
                    onFocus={() => {
                      if (formData.division.length > 0) {
                        const filtered = DIVISIONS.filter(d => 
                          d.toLowerCase().includes(formData.division.toLowerCase())
                        ).slice(0, 5);
                        setDivisionSuggestions(filtered);
                        setShowDivisionSuggestions(true);
                      }
                    }}
                    className="border-slate-300 focus:border-[#0F766E] focus:ring-[#0F766E]"
                    required
                  />
                  {showDivisionSuggestions && divisionSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {divisionSuggestions.map(division => (
                        <button
                          key={division}
                          type="button"
                          className="w-full px-3 py-2 text-left text-sm hover:bg-[#0F766E]/10 hover:text-[#0F766E] transition-colors"
                          onClick={() => handleDivisionSelect(division)}
                        >
                          {division}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Aadhar ID Field - Formatted */}
              <div className="space-y-2">
                <Label htmlFor="aadharId" className="text-slate-700">Aadhar ID</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <div className="relative">
                    <Input
                      id="aadharId"
                      type="text"
                      placeholder="12-digit Aadhar number"
                      value={formData.aadharId}
                      onChange={(e) => handleAadharChange(e.target.value)}
                      className="pl-10 border-slate-300 focus:border-[#0F766E] focus:ring-[#0F766E] font-mono text-center text-lg tracking-widest"
                      maxLength={12}
                      required
                    />
                    {/* Placeholder overlay for formatting */}
                    {!formData.aadharId && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-300 font-mono text-lg">
                        XXXX XXXX XXXX
                      </div>
                    )}
                  </div>
                  {formData.aadharId && (
                    <div className="mt-1 text-center text-xs text-slate-400 font-mono">
                      {formatAadhar(formData.aadharId)}
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-medium py-2.5"
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify & Login"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 text-center">
                <strong>Demo Credentials:</strong><br />
                Name: Michael Torres, Rank: Inspector, Division: Mumbai, Aadhar: 123456789012
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-slate-500 text-sm">
          <p>RakhshaSetu — Demo System</p>
          <p className="mt-1">Ethical AI practices | Transparent risk factors | Privacy-first design</p>
        </div>
      </div>
    </div>
  );
}