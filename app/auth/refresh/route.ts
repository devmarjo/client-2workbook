import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const refreshToken = body.refresh_token;

    if (!refreshToken) {
      return NextResponse.json({ error: "Refresh token ausente" }, { status: 400 });
    }

    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const { credentials } = await oauth2Client.refreshAccessToken();

    return NextResponse.json({
      access_token: credentials.access_token,
      expires_in: credentials.expiry_date,
    });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao renovar token - " + error }, { status: 500 });
  }
}