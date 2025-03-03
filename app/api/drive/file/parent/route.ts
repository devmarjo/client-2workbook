import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// async function getTokenScopes(accessToken: string) {
//   const auth = new google.auth.OAuth2(); 
//   auth.setCredentials({ access_token: accessToken });

//   const oauth2 = google.oauth2({
//       version: "v2",
//       auth: auth, // Usar o auth que já tem o token
//   });

//   try {
//       const res = await oauth2.tokeninfo({ access_token: accessToken });
//       console.log("Escopos disponíveis:", res.data.scope);
//   } catch (error) {
//       console.error("Erro ao obter escopos:", error || error);
//   }
// }


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const fileId = url.searchParams.get("id");
  const accessToken = req.headers.get("Authorization")?.split("Bearer ")[1];

  if (!fileId || !accessToken) {
    return NextResponse.json({ error: "File ID ou Access Token ausente" }, { status: 400 });
  }

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.get({
      fileId,
      fields: "parents",
      supportsAllDrives: true,
      supportsTeamDrives: true,
    });
    return NextResponse.json({ parents: response.data.parents || [] });
  } catch (error) {
    console.error("Erro ao buscar pasta do arquivo:", error);
    return NextResponse.json({ error: "Erro ao buscar pasta do arquivo" }, { status: 500 });
  }
}