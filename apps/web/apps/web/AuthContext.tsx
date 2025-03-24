"use client";

import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  user: { email: string } | null;
  isSignedIn: boolean;
  setUser: (user: { email: string } | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const isSignedIn = !!user;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      setUser({ email });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isSignedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
