import { AlertTriangle, AlertCircle, TrendingUp, CheckCircle } from "lucide-react";

interface RiskCounts {
  critical: number;
  high: number;
  moderate: number;
  low: number;
  total: number;
}

interface RiskOverviewProps {
  counts: RiskCounts;
}

export default function RiskOverview({ counts }: RiskOverviewProps) {
  const cards = [
    {
      label: "Critical Risk",
      count: counts.critical,
      icon: AlertTriangle,
      bg: "bg-gradient-to-br from-[#0F766E] to-red-500",
      textColor: "text-white",
      subtext: "Immediate attention required"
    },
    {
      label: "High Risk",
      count: counts.high,
      icon: AlertCircle,
      bg: "bg-gradient-to-br from-[#0F766E] to-orange-500",
      textColor: "text-white",
      subtext: "Intervention recommended"
    },
    {
      label: "Moderate Risk",
      count: counts.moderate,
      icon: TrendingUp,
      bg: "bg-gradient-to-br from-[#0F766E] to-teal-400",
      textColor: "text-white",
      subtext: "Increased monitoring"
    },
    {
      label: "Low Risk",
      count: counts.low,
      icon: CheckCircle,
      bg: "bg-gradient-to-br from-[#0F766E] to-green-500",
      textColor: "text-white",
      subtext: "Stable welfare status"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`${card.bg} ${card.textColor} rounded-2xl p-5 shadow-lg`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-90">{card.label}</p>
              <p className="text-3xl font-bold mt-1">{card.count}</p>
              <p className="text-xs opacity-75 mt-2">{card.subtext}</p>
            </div>
            <card.icon className="h-8 w-8 opacity-80" />
          </div>
          
          {/* Mini progress bar */}
          <div className="mt-4 h-1.5 bg-black/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white/80 rounded-full transition-all duration-500"
              style={{ width: `${counts.total > 0 ? (card.count / counts.total) * 100 : 0}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}