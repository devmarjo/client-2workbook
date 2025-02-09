"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAccessToken, setTokens,clearTokens } from "../utils/auth";

export const useAuth = () => {
  const searchParams = useSearchParams();
  const ParamsAccessToken = searchParams.get('access_token')
  const ParamsRefreshToken = searchParams.get('refresh_token')
  const ParamsExpiryDate = searchParams.get('expiry_date')
  if (ParamsAccessToken && ParamsRefreshToken) {
    setTokens(ParamsAccessToken, ParamsRefreshToken, ParamsExpiryDate )
  }
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