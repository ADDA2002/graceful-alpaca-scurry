import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TopNav({ user }: { user: any }) {
  const { logout } = useAuth();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-slate-600 text-sm">
        <User className="h-4 w-4" />
        <span>Welcome, {user?.name}</span>
      </div>

      <Button 
        variant="ghost" 
        size="sm"
        onClick={logout}
        className="border-slate-300 hover:bg-slate-100/10"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}