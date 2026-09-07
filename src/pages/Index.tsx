import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Heart, UserCog, LogIn } from "lucide-react";

const roles = [
  {
    role: "commander" as UserRole,
    title: "Commander",
    description: "Overview dashboards, personnel risk analysis, and alert management",
    icon: Shield,
    color: "from-blue-600 to-blue-800"
  },
  {
    role: "welfare-officer" as UserRole,
    title: "Welfare Officer",
    description: "Detailed personnel analysis, intervention recommendations, and welfare management",
    icon: Heart,
    color: "from-teal-500 to-teal-700"
  },
  {
    role: "personnel" as UserRole,
    title: "Personnel",
    description: "Self-assessment wellness check-ins, personal risk profile, and support resources",
    icon: UserCog,
    color: "from-purple-500 to-purple-700"
  }
];

export default function Index() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleLogin = (role: UserRole) => {
    login(role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-12 w-12 text-teal-400" />
            <h1 className="text-4xl font-bold text-white">
              Personnel Stress & Welfare Monitor
            </h1>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            AI-driven predictive monitoring system for proactive personnel welfare support
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map(({ role, title, description, icon: Icon, color }) => (
            <Card
              key={role}
              className="border border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:border-teal-500/50 transition-all duration-300 cursor-pointer group"
              onClick={() => handleLogin(role)}
            >
              <CardHeader className="text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${color} mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{title}</CardTitle>
                <CardDescription className="text-slate-400">{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogin(role);
                  }}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Enter as {title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Footer */}
        <div className="text-center text-slate-500 text-sm">
          <p>Demo System — All data is simulated for evaluation purposes</p>
          <p className="mt-1">Ethical AI practices | Transparent risk factors | Privacy-first design</p>
        </div>
      </div>
    </div>
  );
}