import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { mockPersonnel } from "@/data/mockPersonnel";
import { mockHRData } from "@/data/mockHRData";
import { mockWellnessData } from "@/data/mockWellnessData";
import { PredictiveRiskEngine } from "@/utils/riskEngine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Shield, Clock, Activity, ArrowRight } from "lucide-react";

export default function ProfilePage() {
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

  if (!personnel || !hrData) return null;

  return (
    <div className="min-h-screen bg-[#F0F7FA]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="border-slate-200 shadow-lg">
            <CardHeader className="text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 mx-auto mb-4">
                <span className="text-2xl font-bold text-white">
                  {personnel.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <CardTitle className="text-2xl text-slate-900">{personnel.name}</CardTitle>
              <CardDescription>
                              {personnel.rank} • {personnel.division} • {personnel.yearsOfService} years of service
                            </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-500" />
                  <div>
                    <p className="text-xs text-slate-500">Status</p>
                    <p className="text-sm font-medium text-slate-900 capitalize">{personnel.status.replace('-', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-teal-500" />
                  <div>
                    <p className="text-xs text-slate-500">Last Check-in</p>
                    <p className="text-sm font-medium text-slate-900">
                      {wellnessData.length > 0 ? wellnessData[0].date : 'No data'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Profile */}
          {assessment && (
            <Card className="border-slate-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-teal-500" />
                  <CardTitle>Your Risk Profile</CardTitle>
                </div>
                <CardDescription>AI-generated assessment based on your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Overall Risk Score</span>
                  <span className="text-3xl font-bold text-slate-900">{assessment.overallScore}/100</span>
                </div>
                <Progress value={assessment.overallScore} className="h-3" />
                
                <div className="flex items-center gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    assessment.riskLevel === 'critical' ? 'bg-red-100 text-red-700' :
                    assessment.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                    assessment.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {assessment.riskLevel.toUpperCase()} RISK
                  </span>
                  <span className="text-sm text-slate-500">Confidence: {assessment.confidence}%</span>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">Contributing Factors</h4>
                  {assessment.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className={`mt-1 h-2 w-2 rounded-full ${
                        factor.severity === 'high' ? 'bg-red-500' :
                        factor.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{factor.factor}</p>
                        <p className="text-xs text-slate-500">{factor.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                  <h4 className="font-medium text-teal-900 mb-2">Recommendation</h4>
                  <p className="text-sm text-teal-800">{assessment.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Wellness Check-ins */}
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-teal-500" />
                <CardTitle>Recent Wellness Check-ins</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wellnessData.slice(0, 5).map((wellness, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{wellness.date}</p>
                      <p className="text-xs text-slate-500">
                        Stress: {wellness.stressLevel}/5 • Sleep: {wellness.sleepQuality}/5 • Mood: {wellness.mood.replace('-', ' ')}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {wellness.physicalSymptoms.length > 0 && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                          {wellness.physicalSymptoms.length} symptoms
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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