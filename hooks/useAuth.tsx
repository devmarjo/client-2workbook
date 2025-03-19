"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";


// Tipagem do contexto
interface AuthContextType {
  accessToken: string | null;
  setTokens: (accessToken :string, refreshToken: string, expiryDate: string | null) =>  Promise<null | undefined>;
  getAccessToken: ()=> Promise<string | null>;
  clearTokens: () => Promise<null | undefined>;
  fetchToken:  () => Promise<null | undefined>;
}

// Criando o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Criando o Provider para gerenciar o estado global do accessToken
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const ParamsAccessToken = searchParams.get("access_token");
  const ParamsRefreshToken = searchParams.get("refresh_token");
  const ParamsExpiryDate = searchParams.get("expiry_date");

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  const getAccessToken = async (): Promise<string | null> => { 
    if (typeof window === "undefined") return null; // 
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const expiryDate = localStorage.getItem("expiry_date");
  
    if (!accessToken || !refreshToken || !expiryDate) {
      console.log("Usuário não autenticado");
      return null;
    }
  
    const now = Date.now();
    const expiryTimestamp = parseInt(expiryDate);
  
    if (now < expiryTimestamp) {
      return accessToken; // ✅ Token ainda é válido
    }
  
    console.log("Token expirado, tentando renovar...");
  
    // ✅ Se o token expirou, tentar usar o refresh_token para obter um novo
    try {
      const response = await fetch("/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
  
      if (!response.ok) {
        return null;
      }
  
      const data = await response.json();
  
      // ✅ Atualizar os tokens no localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("expiry_date", (Date.now() + 3600 * 1000).toString());
  
      return data.access_token;
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      return null;
    }
  };
  
  const setTokens = async (accessToken :string, refreshToken: string, expiryDate: string | null) => {
    if (typeof window === "undefined") return null; // 
    if (!expiryDate) {
      expiryDate = String(Date.now()  + 3600)
    }
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("expiry_date", String(expiryDate));
  };
  
  const clearTokens = async () => {
    if (typeof window === "undefined") return null; // 
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expiry_date");
    setAccessToken(null)
  };
  
  const fetchToken = useCallback(async () => {
    const token = await getAccessToken();
    if (token !== null && token === accessToken) {
      return;
    }
    if (!token) {
      try {
        const response = await fetch("/auth/google", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          console.error("Falha ao renovar access token");
          return null;
        }

        const data = await response.json();
        if (data.authUrl) {
          window.location = data.authUrl;
        } else {
          router.push("/BadAuthURL");
        }
      } catch (error) {
        console.error("Erro ao renovar token:", error);
        return null;
      }
    } else {
      setAccessToken(token);
    }
  }, [accessToken, router]);

  useEffect(() => {
    fetchToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  if (ParamsAccessToken && ParamsRefreshToken) {
    setTokens(ParamsAccessToken, ParamsRefreshToken, ParamsExpiryDate);
  }
  return (
    <AuthContext.Provider value={{ accessToken, setTokens, getAccessToken, clearTokens, fetchToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Criando o hook para acessar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};