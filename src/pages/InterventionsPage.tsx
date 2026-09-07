import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { mockPersonnel } from "@/data/mockPersonnel";
import { mockHRData } from "@/data/mockHRData";
import { mockWellnessData } from "@/data/mockWellnessData";
import { PredictiveRiskEngine } from "@/utils/riskEngine";
import { InterventionEngine } from "@/utils/recommendations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Shield, Clock, AlertTriangle, ArrowRight } from "lucide-react";

export default function InterventionsPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    navigate("/");
    return null;
  }

  const personnel = mockPersonnel.find(p => p.id === user.id);
  const hrData = mockHRData.find(h => h.personnelId === user.id);
  const wellnessData = mockWellnessData.filter(w => w.personnelId === user.id);
  const assessment = hrData ? PredictiveRiskEngine.calculateRisk(hrData, wellnessData) : null;
  const recommendations = assessment ? InterventionEngine.generateRecommendations(assessment.riskLevel, assessment.factors) : null;

  if (!personnel || !hrData || !assessment || !recommendations) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex p-3 rounded-full bg-teal-100 mb-4">
              <Heart className="h-8 w-8 text-teal-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Welfare Interventions</h1>
            <p className="text-slate-600 mt-2">Personalized recommendations based on your risk profile</p>
          </div>

          {/* Risk Summary */}
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-teal-500" />
                <CardTitle>Risk Assessment Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-600">Risk Score</span>
                <span className="text-3xl font-bold text-slate-900">{assessment.overallScore}/100</span>
              </div>
              <Progress value={assessment.overallScore} className="h-3" />
              <div className="mt-4">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  assessment.riskLevel === 'critical' ? 'bg-red-100 text-red-700' :
                  assessment.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                  assessment.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {assessment.riskLevel.toUpperCase()} RISK
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Interventions */}
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-teal-500" />
                <CardTitle>Recommended Interventions</CardTitle>
              </div>
              <CardDescription>
                {recommendations.interventions.length} interventions recommended
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.interventions.map((intervention, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-slate-900">{intervention.title}</h4>
                      <p className="text-sm text-slate-600">{intervention.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      intervention.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                      intervention.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                      intervention.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {intervention.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {intervention.timeline}
                    </span>
                    <span>Responsible: {intervention.responsibleParty}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Support Resources */}
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-teal-500" />
                <CardTitle>Support Resources</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendations.supportResources.map((resource, idx) => (
                  <div key={idx} className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <p className="text-sm font-medium text-teal-900">{resource}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Follow-up */}
          {recommendations.followUpRequired && (
            <Card className="border-orange-200 bg-orange-50 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <h4 className="font-medium text-orange-900">Follow-up Required</h4>
                </div>
                <p className="text-sm text-orange-800">
                  Next follow-up scheduled within {recommendations.followUpTimeline}
                </p>
              </CardContent>
            </Card>
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