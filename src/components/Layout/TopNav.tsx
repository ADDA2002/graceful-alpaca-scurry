import { useAuth } from "@/context/AuthContext";
import { Shield } from "lucide-react";

export default function TopNav({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-slate-600 text-sm">
        <Shield className="h-4 w-4 text-[#0F766E]" />
        <span className="font-medium text-slate-900">{user?.rank}</span>
        <span className="text-slate-400">•</span>
        <span className="text-slate-600">{user?.division} Division</span>
      </div>
    </div>
  );
}