"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  name: string | null;
  email: string | null;
  role: string | null;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Function to refresh authentication state
  const refreshAuth = async () => {
    try {
      const response = await fetch("/api/user/me", {
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setName(userData.name);
        setEmail(userData.email);
        setRole(userData.role);
      } else {
        setIsAuthenticated(false);
        setName(null);
        setEmail(null);
        setRole(null);
      }
    } catch (error) {
      console.error("Error refreshing auth state:", error);
      setIsAuthenticated(false);
      setName(null);
      setEmail(null);
      setRole(null);
    }
  };

  // Function to handle logout
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        credentials: "include",
        method: "POST",
      });

      // Update local state
      setIsAuthenticated(false);
      setName(null);
      setEmail(null);
      setRole(null);

      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, name, email, logout, refreshAuth, role }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
