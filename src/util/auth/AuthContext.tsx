import { createContext, ReactNode, useContext, useState } from "react";
import { ITrainerLoginDTO, ITrainerRegisterDTO } from "../types/Trainer";
import { axiosInstance } from "../axios";
import useLocalStorage from "../hooks/useLocalStorage";

export type AuthContextType = {
  id: string | null;
  name: string | null;
  setName: (name: string) => void;
  register: (registerDTO: ITrainerRegisterDTO) => Promise<boolean>;
  login: (loginDTO: ITrainerLoginDTO) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useLocalStorage<string | null>("id", null);
  const [name, setName] = useLocalStorage<string | null>("name", null);

  const register = async (registerDTO: ITrainerRegisterDTO) => {
    try {
      await axiosInstance.post("trainer", registerDTO);
      await login({
        username: registerDTO.username,
        password: registerDTO.password,
      });
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
    <AuthContext.Provider
      value={{ id, name, setName, register, login, logout }}
    >
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
