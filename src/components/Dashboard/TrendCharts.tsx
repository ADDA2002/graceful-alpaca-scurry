import { RiskAssessment } from "@/utils/riskEngine";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

interface TrendChartsProps {
  assessments: RiskAssessment[];
}

const COLORS = {
  critical: "#EF4444",
  high: "#F97316",
  moderate: "#EAB308",
  low: "#22C55E"
};

export default function TrendCharts({ assessments }: TrendChartsProps) {
  // Prepare data for risk level distribution
  const riskDistribution = [
    { name: "Critical", value: assessments.filter(a => a.riskLevel === "critical").length, color: COLORS.critical },
    { name: "High", value: assessments.filter(a => a.riskLevel === "high").length, color: COLORS.high },
    { name: "Moderate", value: assessments.filter(a => a.riskLevel === "moderate").length, color: COLORS.moderate },
    { name: "Low", value: assessments.filter(a => a.riskLevel === "low").length, color: COLORS.low }
  ];

  // Prepare data for score distribution
  const scoreDistribution = assessments.map(a => ({
    name: a.personnelId,
    score: a.overallScore,
    riskLevel: a.riskLevel
  }));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Risk Distribution Pie Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4">Risk Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Score Bar Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4">Risk Scores by Personnel</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" width={60} />
              <Tooltip />
              <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                {scoreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.riskLevel as keyof typeof COLORS]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}