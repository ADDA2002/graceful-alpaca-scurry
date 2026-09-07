import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { mockPersonnel } from "@/data/mockPersonnel";
import { PredictiveRiskEngine, RiskAssessment } from "@/utils/riskEngine";
import { mockHRData } from "@/data/mockHRData";
import { mockWellnessData } from "@/data/mockWellnessData";
import { mockBiometricData } from "@/data/mockBiometricData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Heart, CheckCircle, ArrowRight } from "lucide-react";

interface SliderQuestion {
  title: string;
  description: string;
  type: "slider";
  min: number;
  max: number;
  value: number;
  labels: string[];
}

interface SelectQuestion {
  title: string;
  description: string;
  type: "select";
  options: string[];
  value: string;
}

type Question = SliderQuestion | SelectQuestion;

export default function AssessmentPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({
    sleepQuality: 3,
    stressLevel: 2,
    mood: "good" as const,
    energyLevel: 4,
    workLifeBalance: 3,
    socialSupport: 4,
    physicalSymptoms: [] as string[],
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [riskResult, setRiskResult] = useState<RiskAssessment | null>(null);

  if (!isAuthenticated || !user) {
    navigate("/");
    return null;
  }

  const personnel = mockPersonnel.find(p => p.id === user.id);
  const hrData = mockHRData.find(h => h.personnelId === user.id);
  const wellnessData = mockWellnessData.filter(w => w.personnelId === user.id);

  const handleSubmit = () => {
    if (hrData) {
      const newWellness = {
        id: `W-${Date.now()}`,
        personnelId: user.id,
        date: new Date().toISOString().split('T')[0],
        ...responses
      };
      
      const assessment = PredictiveRiskEngine.calculateRisk(hrData, [...wellnessData, newWellness], mockBiometricData.find(b => b.personnelId === user.id));
      setRiskResult(assessment);
      setSubmitted(true);
    }
  };

  const fieldMap: Record<string, keyof typeof responses> = {
      "sleepquality": "sleepQuality",
      "stresslevel": "stressLevel",
      "mood": "mood",
      "energylevel": "energyLevel",
      "work-lifebalance": "workLifeBalance",
      "socialsupport": "socialSupport"
    };
  
    const questions: Question[] = [
      {
        title: "Sleep Quality",
        description: "How would you rate your sleep quality over the past week?",
        type: "slider",
        min: 1,
        max: 5,
        value: responses.sleepQuality,
        labels: ["Very Poor", "Poor", "Fair", "Good", "Excellent"]
      },
      {
        title: "Stress Level",
        description: "How stressed have you felt over the past week?",
        type: "slider",
        min: 1,
        max: 5,
        value: responses.stressLevel,
        labels: ["Very Low", "Low", "Moderate", "High", "Very High"]
      },
      {
        title: "Mood",
        description: "How would you describe your overall mood?",
        type: "select",
        options: ["excellent", "good", "fair", "poor", "very-poor"],
        value: responses.mood
      },
      {
        title: "Energy Level",
        description: "How would you rate your energy level?",
        type: "slider",
        min: 1,
        max: 5,
        value: responses.energyLevel,
        labels: ["Very Low", "Low", "Moderate", "High", "Excellent"]
      },
      {
        title: "Work-Life Balance",
        description: "How well are you balancing work and personal life?",
        type: "slider",
        min: 1,
        max: 5,
        value: responses.workLifeBalance,
        labels: ["Very Poor", "Poor", "Fair", "Good", "Excellent"]
      },
      {
        title: "Social Support",
        description: "How supported do you feel by colleagues and family?",
        type: "slider",
        min: 1,
        max: 5,
        value: responses.socialSupport,
        labels: ["Very Low", "Low", "Moderate", "High", "Excellent"]
      }
    ];

  const handleSliderChange = (field: string, value: number) => {
    setResponses(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setResponses(prev => ({ ...prev, [field]: value }));
  };

  if (submitted && riskResult) {
      return (
        <div className="min-h-screen bg-[#F0F7FA]">
          <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto border-slate-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="inline-flex p-4 rounded-full bg-[#0F766E]/10 mx-auto mb-4">
                  <CheckCircle className="h-12 w-12 text-[#0F766E]" />
                </div>
                <CardTitle className="text-2xl text-slate-900">Assessment Submitted</CardTitle>
                <CardDescription>Your wellness check-in has been recorded</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Your Risk Profile</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-600">Overall Risk Score</span>
                    <span className="text-3xl font-bold text-slate-900">{riskResult.overallScore}/100</span>
                  </div>
                  <Progress value={riskResult.overallScore} className="h-3" />
                  
                  <div className="mt-6">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                      riskResult.riskLevel === 'critical' ? 'bg-red-100 text-red-700' :
                      riskResult.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                      riskResult.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {riskResult.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                </div>
  
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">Contributing Factors</h4>
                  {riskResult.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100">
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
  
                <div className="bg-[#0F766E]/10 rounded-xl p-4 border border-[#0F766E]/20">
                  <h4 className="font-medium text-[#0F766E] mb-2">Recommendation</h4>
                  <p className="text-sm text-[#0F766E]">{riskResult.recommendation}</p>
                </div>
  
                <Button
                  className="w-full bg-gradient-to-r from-[#0F766E] to-teal-500"
                  onClick={() => navigate("/dashboard")}
                >
                  Return to Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

  return (
      <div className="min-h-screen bg-[#F0F7FA]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-full bg-[#0F766E]/10 mb-4">
                <Heart className="h-8 w-8 text-[#0F766E]" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Wellness Check-In</h1>
              <p className="text-slate-600 mt-2">
                {personnel?.name} • {personnel?.division}
              </p>
            </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-500 mb-2">
              <span>Step {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <Progress value={((currentStep + 1) / questions.length) * 100} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">{questions[currentStep].title}</CardTitle>
              <CardDescription>{questions[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {questions[currentStep].type === "slider" && (() => {
                                            const q = questions[currentStep] as SliderQuestion;
                                            const fieldKey = fieldMap[q.title.toLowerCase().replace(/\s/g, '')] || q.title.toLowerCase().replace(/\s/g, '');
                                            const currentValue = responses[fieldKey] as number;
                                            return (
                                            <div className="space-y-6">
                                              <Slider
                                                                                              min={q.min}
                                                                                              max={q.max}
                                                                                              step={1}
                                                                                              value={[currentValue]}
                                                                                              onValueChange={(val) => handleSliderChange(fieldKey, val[0])}
                                                                                              className="w-full"
                                                                                            />
                                                                                            <div className="relative h-4">
                                                                                              {q.labels.map((label, idx) => (
                                                                                                <span key={idx} className="absolute text-xs text-slate-500" style={{ left: `${idx * 25}%`, transform: 'translateX(-50%)' }}>
                                                                                                  {label}
                                                                                                </span>
                                                                                              ))}
                                                                                            </div>
                                              <div className="text-center">
                                                <span className="text-3xl font-bold text-slate-900">{currentValue}</span>
                                                <p className="text-sm text-slate-500 mt-1">{q.labels[currentValue - 1]}</p>
                                              </div>
                                            </div>
                                            );
                                          })()}

              {questions[currentStep].type === "select" && (() => {
                              const q = questions[currentStep] as SelectQuestion;
                              const fieldKey = fieldMap[q.title.toLowerCase().replace(/\s/g, '')] || q.title.toLowerCase().replace(/\s/g, '');
                              return (
                              <div className="grid grid-cols-2 gap-3">
                                {q.options.map((option) => (
                                  <button
                                    key={option}
                                    className={`p-4 rounded-xl border-2 text-sm font-medium capitalize ${
                                      responses[fieldKey] === option
                                        ? "border-teal-500 bg-teal-50 text-teal-700"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                    }`}
                                    onClick={() => handleSelectChange(fieldKey, option)}
                                  >
                                    {option.replace('-', ' ')}
                                  </button>
                                ))}
                              </div>
                              );
                            })()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            {currentStep < questions.length - 1 ? (
                          <Button
                            onClick={() => setCurrentStep(prev => Math.min(questions.length - 1, prev + 1))}
                            className="bg-gradient-to-r from-[#0F766E] to-teal-500"
                          >
                            Next
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        ) : (
                          <Button
                            onClick={handleSubmit}
                            className="bg-gradient-to-r from-[#0F766E] to-teal-500"
                          >
                            Submit Assessment
                            <CheckCircle className="h-4 w-4 ml-2" />
                          </Button>
                        )}
          </div>
        </div>
      </div>
    </div>
  );
}