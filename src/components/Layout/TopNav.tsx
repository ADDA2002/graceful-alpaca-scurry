import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function TopNav({ user }: { user: any }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-[#0F766E]" />
            <span className="text-xl font-bold text-slate-900">RakhshaSetu</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-slate-700 hover:text-[#0F766E] transition-colors">
              Dashboard
            </Link>
            <Link to="/assessment" className="text-sm font-medium text-slate-700 hover:text-[#0F766E] transition-colors">
              Assessment
            </Link>
            <Link to="/profile" className="text-sm font-medium text-slate-700 hover:text-[#0F766E] transition-colors">
              Profile
            </Link>
            <Link to="/interventions" className="text-sm font-medium text-slate-700 hover:text-[#0F766E] transition-colors">
              Interventions
            </Link>
            <Link to="/alerts" className="text-sm font-medium text-slate-700 hover:text-[#0F766E] transition-colors">
              Alerts
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:block">{user?.name}</span>
            <button
              onClick={handleSignOut}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}