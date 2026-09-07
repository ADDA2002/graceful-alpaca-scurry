"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "commander" | "welfare-officer" | "personnel";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  department: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    const mockUsers = {
      commander: {
        id: "cmd-001",
        name: "Commander Alex Rivera",
        role: "commander" as UserRole,
        department: "Operations Command"
      },
      "welfare-officer": {
        id: "wo-001",
        name: "Welfare Officer Sarah Chen",
        role: "welfare-officer" as UserRole,
        department: "Personnel Welfare"
      },
      personnel: {
        id: "p-001",
        name: "Sergeant Michael Torres",
        role: "personnel" as UserRole,
        department: "Special Operations"
      }
    };
    
    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};