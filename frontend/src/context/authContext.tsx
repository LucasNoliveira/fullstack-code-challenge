import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthTokens {
  access: string;
  refresh: string;
}

interface AuthContextType {
  tokens: AuthTokens | null;
  saveTokens: (tokens: AuthTokens) => void;
  clearTokens: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<AuthTokens | null>(() => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");
    return access && refresh ? { access, refresh } : null;
  });

  const saveTokens = (newTokens: AuthTokens) => {
    localStorage.setItem("access_token", newTokens.access);
    localStorage.setItem("refresh_token", newTokens.refresh);
    setTokens(newTokens);
  };

  const clearTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setTokens(null);
  };

  return (
    <AuthContext.Provider
      value={{ tokens, saveTokens, clearTokens, isAuthenticated: !!tokens }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth should be used within AuthProvider");
  }
  return context;
}