import { Bell, AlertTriangle, Clock } from "lucide-react";

interface Alert {
  id: string;
  name: string;
  riskLevel: string;
  score: number;
  topFactors: string[];
  recommendation: string;
  date: string;
}

interface AlertPanelProps {
  alerts: Alert[];
  userRole: string;
}

export default function AlertPanel({ alerts, userRole }: AlertPanelProps) {
  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-slate-400" />
          <h3 className="font-semibold text-slate-900">Active Alerts</h3>
        </div>
        <div className="text-center py-8">
          <Clock className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">No active alerts</p>
          <p className="text-xs text-slate-400 mt-1">All personnel within normal parameters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold text-slate-900">Active Alerts</h3>
        </div>
        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
          {alerts.length}
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-slate-900">{alert.name}</p>
                <p className="text-xs text-slate-500">Score: {alert.score}/100</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                alert.riskLevel === 'critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {alert.riskLevel.toUpperCase()}
              </span>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-700">Key Factors:</p>
              {alert.topFactors.map((factor, idx) => (
                <p key={idx} className="text-xs text-slate-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                  {factor}
                </p>
              ))}
            </div>

            <p className="text-xs text-slate-500 mt-2 italic">
              "{alert.recommendation}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}