"use client";
export const getAccessToken = async (): Promise<string | null> => { 
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
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      console.error("Falha ao renovar access token");
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

export const setTokens = async (accessToken :string, refreshToken: string, expiryDate: string | null) => {
  if (typeof window === "undefined") return null; // 
  if (!expiryDate) {
    expiryDate = String(Date.now()  + 3600)
  }
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
  localStorage.setItem("expiry_date", String(expiryDate));
};


export const clearTokens = async () => {
  if (typeof window === "undefined") return null; // 
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expiry_date");
};

