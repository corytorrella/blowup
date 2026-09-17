"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { CURRENT_USER_HANDLE } from "@/lib/data";

interface AuthState {
  isLoggedIn: boolean;
  handle: string;
  logIn: () => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const value = useMemo<AuthState>(
    () => ({
      isLoggedIn,
      handle: CURRENT_USER_HANDLE,
      logIn: () => setIsLoggedIn(true),
      logOut: () => setIsLoggedIn(false),
    }),
    [isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
