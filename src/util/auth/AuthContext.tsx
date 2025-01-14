import { createContext, ReactNode, useContext, useState } from "react";
import { ITrainerLoginDTO, ITrainerRegisterDTO } from "../types/Trainer";
import { axiosInstance } from "../axios";

export type AuthContextType = {
  id: string | null;
  name: string | null;
  register: (registerDTO: ITrainerRegisterDTO) => Promise<void>;
  login: (loginDTO: ITrainerLoginDTO) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const register = async (registerDTO: ITrainerRegisterDTO) => {
    try {
      const { data } = await axiosInstance.post("trainer", registerDTO);
      setId(data.id);
      setName(data.name);
    } catch (err) {
      // TODO: Display error on frontend
      console.error(err);
    }
  };

  const login = async (loginDTO: ITrainerLoginDTO) => {
    try {
      const { data } = await axiosInstance.post("/trainer/login", loginDTO);
      setId(data.id);
      setName(data.name);
    } catch (err) {
      // TODO: Display error on frontend
      console.error(err);
    }
  };

  const logout = () => {
    setId(null);
  };

  return (
    <AuthContext.Provider value={{ id, name, register, login, logout }}>
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
