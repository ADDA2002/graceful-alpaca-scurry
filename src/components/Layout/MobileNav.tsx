import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardCheck, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/assessment", label: "Assessment", icon: ClipboardCheck },
  { path: "/alerts", label: "Alerts", icon: Bell },
  { path: "/profile", label: "Profile", icon: User }
];

export default function MobileNav({ userRole }: { userRole: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Filter nav items based on role
  const filteredItems = navItems.filter(item => {
    if (userRole === "personnel" && item.path === "/alerts") return false;
    return true;
  });

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-slate-200 z-50">
      <div className="grid grid-cols-4">
        {filteredItems.map(item => (
          <Button
            key={item.path}
            variant="ghost"
            className={`h-16 flex flex-col items-center gap-1 text-xs py-2 ${
              location.pathname === item.path 
                ? "text-teal-600" 
                : "text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => navigate(item.path)}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  );
}