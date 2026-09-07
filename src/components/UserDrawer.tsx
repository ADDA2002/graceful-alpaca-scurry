"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Shield, LogOut, X, Menu, Settings, Shield as ShieldIcon } from "lucide-react";

export default function UserDrawer() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleSignOut = () => {
    logout();
    setIsOpen(false);
    window.location.href = "/";
  };

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg hover:bg-white"
      >
        <Menu className="h-5 w-5 text-slate-700" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#0F766E]" />
            <h2 className="font-semibold text-slate-900">User Details</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-slate-100"
          >
            <X className="h-4 w-4 text-slate-500" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-4 space-y-4">
          {/* Avatar */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#0F766E]/10 flex items-center justify-center">
              <User className="h-6 w-6 text-[#0F766E]" />
            </div>
            <div>
              <p className="font-medium text-slate-900">{user.name}</p>
              <p className="text-sm text-slate-500 capitalize">{user.role.replace("-", " ")}</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Rank</span>
              <span className="font-medium text-slate-900">{user.rank}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Division</span>
              <span className="font-medium text-slate-900">{user.division}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Aadhar ID</span>
              <span className="font-mono text-slate-900">{user.aadharId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Years of Service</span>
              <span className="font-medium text-slate-900">{user.yearsOfService}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => handleNavigate("/profile")}
            >
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => handleNavigate("/privacy")}
            >
              <ShieldIcon className="h-4 w-4" />
              <span>Privacy Settings</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => handleNavigate("/dashboard")}
            >
              <Settings className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
}