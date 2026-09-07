import { Shield } from "lucide-react";

export default function TopNav({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-4">
      <Shield className="h-5 w-5 text-[#0F766E]" />
    </div>
  );
}