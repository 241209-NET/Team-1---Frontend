import { createContext, ReactNode, useContext, useState } from "react";

export type AuthContextType = {
  id: string | null;
  register: (username: string, password: string) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string | null>(null);

  const register = (username: string, password: string) => {};

  const login = (username: string, password: string) => {};

  const logout = () => {
    setId(null);
  };

  return (
    <AuthContext.Provider value={{ id, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
