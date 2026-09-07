import { PersonnelRecord } from "@/data/mockPersonnel";
import { RiskAssessment } from "@/utils/riskEngine";
import { User } from "lucide-react";

interface PersonnelWithRisk extends PersonnelRecord {
  assessment?: RiskAssessment;
}

interface PersonnelListProps {
  personnel: PersonnelWithRisk[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  userRole: string;
}

export default function PersonnelList({ personnel, selectedId, onSelect, userRole }: PersonnelListProps) {
  const getRiskBadge = (level?: string) => {
    const styles = {
      critical: "bg-red-100 text-red-700 border-red-200",
      high: "bg-orange-100 text-orange-700 border-orange-200",
      moderate: "bg-yellow-100 text-yellow-700 border-yellow-200",
      low: "bg-green-100 text-green-700 border-green-200"
    };
    return styles[level as keyof typeof styles] || "bg-slate-100 text-slate-600 border-slate-200";
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-teal-100 text-teal-700",
      "on-leave": "bg-blue-100 text-blue-700",
      deployed: "bg-purple-100 text-purple-700",
      "sick-leave": "bg-red-100 text-red-700"
    };
    return styles[status] || "bg-slate-100 text-slate-600";
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-900">Personnel Status</h3>
        <p className="text-sm text-slate-500 mt-1">Click to view detailed analysis</p>
      </div>
      
      <div className="divide-y divide-slate-100">
        {personnel.map(person => (
          <div
            key={person.id}
            className={`px-5 py-4 cursor-pointer transition-colors hover:bg-slate-50 ${
              selectedId === person.id ? 'bg-teal-50 border-l-4 border-teal-500' : ''
            }`}
            onClick={() => onSelect(person.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <User className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{person.name}</p>
                  <p className="text-sm text-slate-500">{person.rank} • {person.department}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                {person.assessment && (
                  <>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskBadge(person.assessment.riskLevel)}`}>
                      {person.assessment.riskLevel.toUpperCase()}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadge(person.status)}`}>
                      {person.status.replace('-', ' ')}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {selectedId === person.id && person.assessment && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Risk Score</p>
                    <p className="text-lg font-semibold text-slate-900">{person.assessment.overallScore}/100</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Confidence</p>
                    <p className="text-lg font-semibold text-slate-900">{person.assessment.confidence}%</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-medium text-slate-700">Top Factors:</p>
                  {person.assessment.factors.slice(0, 2).map((factor, idx) => (
                    <p key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        factor.severity === 'high' ? 'bg-red-500' : 
                        factor.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      {factor.factor}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}