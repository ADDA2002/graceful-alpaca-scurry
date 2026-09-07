import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { mockPersonnel, RANKS, DIVISIONS } from "@/data/mockPersonnel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, ArrowRight, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

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
        ).sort((a, b) => a.localeCompare(b));
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

  const formatAadharDisplay = (digits: string) => {
    if (!digits) return "";
    const parts = digits.match(/.{1,4}/g);
    if (!parts) return digits;
    return parts.join("-");
  };

  const handleAadharChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPos = input.selectionStart;
    const rawValue = input.value;

    // Count digits before cursorPos in rawValue
    let digitsBeforeCursor = 0;
    for (let i = 0; i < cursorPos && i < rawValue.length; i++) {
      if (rawValue[i] !== '-') {
        digitsBeforeCursor++;
      }
    }

    // Extract only digits
    const digits = rawValue.replace(/\D/g, "").slice(0, 12);
    setFormData(prev => ({ ...prev, aadharId: digits }));

    // Build formatted display value
    const parts: string[] = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.slice(i, i + 4));
    }
    const formatted = parts.join("-");

    // Calculate new cursor position in formatted string
    let newCursorPos = 0;
    let digitCount = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (formatted[i] === '-') {
        newCursorPos++;
      } else {
        if (digitCount < digitsBeforeCursor) {
          digitCount++;
          newCursorPos++;
        } else {
          break;
        }
      }
    }

    // Set cursor position after the input re-renders
    requestAnimationFrame(() => {
      input.setSelectionRange(newCursorPos, newCursorPos);
    });
  }, []);

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
                                  onClick={() => setRankDropdownOpen(!rankDropdownOpen)}
                                  className="border-slate-300 focus:border-[#0F766E] focus:ring-[#0F766E] cursor-pointer"
                                  required
                                  readOnly
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
                                                                ).sort((a, b) => a.localeCompare(b));
                                                                setDivisionSuggestions(filtered);
                                                                setShowDivisionSuggestions(true);
                                                              }
                                                            }}
                    className="border-slate-300 focus:border-[#0F766E] focus:ring-[#0F766E]"
                    required
                  />
                  {showDivisionSuggestions && divisionSuggestions.length > 0 && (
                                                        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
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
                                            <Input
                                                                                          id="aadharId"
                                                                                          type="text"
                                                                                          placeholder="XXXX-XXXX-XXXX"
                                                                                          value={formData.aadharId ? formatAadharDisplay(formData.aadharId) : ""}
                                                                                          onChange={handleAadharChange}
                                                                                          className="aadhar-input border-slate-300 focus:border-[#0F766E] focus:ring-[#0F766E] font-mono text-left text-lg tracking-widest"
                                                                                          maxLength={14}
                                                                                          required
                                                                                        />
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

          </CardContent>
        </Card>

      </div>
    </div>
  );
}