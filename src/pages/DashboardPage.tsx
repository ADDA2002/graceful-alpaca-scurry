import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockPersonnel } from "@/data/mockPersonnel";
import { mockHRData } from "@/data/mockHRData";
import { mockWellnessData } from "@/data/mockWellnessData";
import { PredictiveRiskEngine, RiskAssessment } from "@/utils/riskEngine";
import RiskOverview from "@/components/Dashboard/RiskOverview";
import PersonnelList from "@/components/Dashboard/PersonnelList";
import TrendCharts from "@/components/Dashboard/TrendCharts";
import AlertPanel from "@/components/Alerts/AlertPanel";
import MobileNav from "@/components/Layout/MobileNav";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<RiskAssessment[]>([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    calculateAllRisks();
  }, [isAuthenticated, navigate]);

  const calculateAllRisks = () => {
    setIsRefreshing(true);
    const newAssessments = mockHRData.map(hr => {
      const wellness = mockWellnessData.filter(w => w.personnelId === hr.personnelId);
      return PredictiveRiskEngine.calculateRisk(hr, wellness);
    });
    setAssessments(newAssessments);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const getRiskCounts = () => {
    return {
      critical: assessments.filter(a => a.riskLevel === "critical").length,
      high: assessments.filter(a => a.riskLevel === "high").length,
      moderate: assessments.filter(a => a.riskLevel === "moderate").length,
      low: assessments.filter(a => a.riskLevel === "low").length,
      total: assessments.length
    };
  };

  const getPersonnelWithRisk = () => {
    return mockPersonnel.map(p => {
      const assessment = assessments.find(a => a.personnelId === p.id);
      return {
        ...p,
        assessment
      };
    });
  };

  const getCriticalAlerts = () => {
    return assessments
      .filter(a => a.riskLevel === "critical" || a.riskLevel === "high")
      .map(a => {
        const personnel = mockPersonnel.find(p => p.id === a.personnelId);
        return {
          id: a.personnelId,
          name: personnel?.name || "Unknown",
          riskLevel: a.riskLevel,
          score: a.overallScore,
          topFactors: a.factors.slice(0, 2).map(f => f.factor),
          recommendation: a.recommendation,
          date: a.lastUpdated
        };
      });
  };

  const selectedPersonnelData = selectedPersonnel 
    ? getPersonnelWithRisk().find(p => p.id === selectedPersonnel)
    : null;

  if (!user) return null;
  
    return (
      <div className="min-h-screen bg-[#F0F7FA]">
        <TopNav user={user} />
        
        <main className="container mx-auto px-4 pb-24 md:pb-8 pt-4">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Command Dashboard</h1>
            <p className="text-slate-600">Real-time personnel welfare monitoring</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={calculateAllRisks}
            disabled={isRefreshing}
            className="border-slate-300"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Risk Overview Cards */}
        <RiskOverview counts={getRiskCounts()} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Personnel List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trend Charts */}
            <TrendCharts assessments={assessments} />
            
            {/* Personnel List */}
            <PersonnelList
              personnel={getPersonnelWithRisk()}
              selectedId={selectedPersonnel}
              onSelect={setSelectedPersonnel}
              userRole={user.role}
            />
          </div>

          {/* Right Column - Alerts & Details */}
          <div className="space-y-6">
            {/* Alert Panel */}
            <AlertPanel 
              alerts={getCriticalAlerts()}
              userRole={user.role}
            />

            {/* Selected Personnel Detail */}
            {selectedPersonnelData && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-4">Selected Personnel</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0F766E] to-teal-500 flex items-center justify-center text-white font-semibold">
                      {selectedPersonnelData.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                                        <p className="font-medium text-slate-900">{selectedPersonnelData.name}</p>
                                        <p className="text-sm text-slate-500">{selectedPersonnelData.rank} • {selectedPersonnelData.division}</p>
                                      </div>
                  </div>
                  
                  {selectedPersonnelData.assessment && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-600">Risk Level</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedPersonnelData.assessment.riskLevel === 'critical' ? 'bg-red-100 text-red-700' :
                          selectedPersonnelData.assessment.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                          selectedPersonnelData.assessment.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {selectedPersonnelData.assessment.riskLevel.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-600">Risk Score</span>
                        <span className="font-semibold text-slate-900">{selectedPersonnelData.assessment.overallScore}/100</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-700">Contributing Factors:</p>
                        {selectedPersonnelData.assessment.factors.slice(0, 3).map((factor, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <div className={`mt-1 h-2 w-2 rounded-full ${
                              factor.severity === 'high' ? 'bg-red-500' :
                              factor.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`} />
                            <span className="text-slate-600">{factor.factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <MobileNav userRole={user.role} />
    </div>
  );
}