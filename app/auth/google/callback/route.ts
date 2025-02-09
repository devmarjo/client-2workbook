import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Código de autenticação ausente" }, { status: 400 });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    // Redireciona para a página do frontend passando os tokens na URL (não recomendado para produção)
    return NextResponse.redirect(
      new URL(`/editor?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}&expiry_date=${tokens.expiry_date}`, req.url)
    );
  } catch (error) {
    return NextResponse.json({ error: "Falha ao trocar código por token - " + error }, { status: 500 });
  }
}