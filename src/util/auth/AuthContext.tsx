import { createContext, ReactNode, useContext, useState } from "react";
import { ITrainerLoginDTO, ITrainerRegisterDTO } from "../types/Trainer";
import { axiosInstance } from "../axios";
import { useNavigate } from "react-router";

export type AuthContextType = {
  id: string | null;
  name: string | null;
  register: (registerDTO: ITrainerRegisterDTO) => Promise<boolean>;
  login: (loginDTO: ITrainerLoginDTO) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = async (registerDTO: ITrainerRegisterDTO) => {
    try {
      const { data } = await axiosInstance.post("trainer", registerDTO);
      setId(data.id);
      setName(data.name);
      navigate("/");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const login = async (loginDTO: ITrainerLoginDTO) => {
    try {
      const { data } = await axiosInstance.post("/trainer/login", loginDTO);
      setId(data.id);
      setName(data.name);
      return true;
    } catch (err) {
      console.error(err);
      return false;
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
