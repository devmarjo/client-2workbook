"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, setTokens,clearTokens } from "../utils/auth";

export const useAuth = () => {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken();

      if (!token) {
        // if (!window.confirm("Sem token, vamos redirecionar?")) {
        //     return false
        // }
        try {
          const response = await fetch("/auth/google", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          });
      
          if (!response.ok) {
            console.error("Falha ao renovar access token");
            router.push("/BadGatway");
            return null;
          }
      
          const data = await response.json();
          if(data.authUrl) {
            window.location = data.authUrl
          } else {
            router.push("/BadAuthURL");
          }
        } catch (error) {
          router.push("/BadGatway");
          console.error("Erro ao renovar token:", error);
          return null;
        }



      } else {
        setAccessToken(token);
      }
    };

    fetchToken();
  }, [router]);

  return { accessToken, setTokens, getAccessToken, clearTokens };
};