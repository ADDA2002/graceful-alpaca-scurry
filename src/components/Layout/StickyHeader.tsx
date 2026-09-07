"use client";

import { Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StickyHeaderProps {
  onMenuClick: () => void;
}

export default function StickyHeader({ onMenuClick }: StickyHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#0F766E]" />
          <h1 className="text-lg font-bold text-slate-900">RakhshaSetu</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="hover:bg-slate-100"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </Button>
      </div>
    </header>
  );
}