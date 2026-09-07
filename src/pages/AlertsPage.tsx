import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { mockPersonnel } from "@/data/mockPersonnel";
import { mockHRData } from "@/data/mockHRData";
import { mockWellnessData } from "@/data/mockWellnessData";
import { PredictiveRiskEngine } from "@/utils/riskEngine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, ArrowRight, Shield } from "lucide-react";

export default function AlertsPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    navigate("/");
    return null;
  }

  // Only commanders and welfare officers can see alerts page
  if (user.role === "personnel") {
    navigate("/dashboard");
    return null;
  }

  const assessments = mockHRData.map(hr => {
    const wellness = mockWellnessData.filter(w => w.personnelId === hr.personnelId);
    return PredictiveRiskEngine.calculateRisk(hr, wellness);
  });

  const alerts = assessments
    .filter(a => a.riskLevel === "critical" || a.riskLevel === "high")
    .map(a => {
      const personnel = mockPersonnel.find(p => p.id === a.personnelId);
      return {
        ...a,
        name: personnel?.name || "Unknown",
        department: personnel?.department || "Unknown",
        rank: personnel?.rank || "Unknown"
      };
    });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex p-3 rounded-full bg-orange-100 mb-4">
                <Bell className="h-8 w-8 text-orange-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Active Alerts</h1>
              <p className="text-slate-600 mt-1">Personnel requiring attention</p>
            </div>
            <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              {alerts.length} Active
            </span>
          </div>

          {alerts.length === 0 ? (
            <Card className="border-slate-200 shadow-lg">
              <CardContent className="py-12 text-center">
                <Bell className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Active Alerts</h3>
                <p className="text-slate-500">All personnel are within normal risk parameters</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {alerts.map(alert => (
                <Card key={alert.personnelId} className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                          <Shield className="h-6 w-6 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{alert.name}</h3>
                          <p className="text-sm text-slate-500">{alert.rank} • {alert.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          alert.riskLevel === 'critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {alert.riskLevel.toUpperCase()}
                        </span>
                        <p className="text-xs text-slate-500 mt-1">Score: {alert.overallScore}/100</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium text-slate-500 mb-2">Contributing Factors</p>
                          <div className="space-y-1">
                            {alert.factors.slice(0, 3).map((factor, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <div className={`h-1.5 w-1.5 rounded-full ${
                                  factor.severity === 'high' ? 'bg-red-500' :
                                  factor.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                }`} />
                                <span className="text-slate-600">{factor.factor}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-500 mb-2">Recommendation</p>
                          <p className="text-sm text-slate-700 italic">"{alert.recommendation}"</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}