import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

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

    const response = await drive.files.get(
      {
        fileId,
        alt: "media", // Obtém o conteúdo do arquivo
      },
      { responseType: "arraybuffer" } // Retorna um Buffer
    );
    const fileContent = Buffer.from(response.data as ArrayBuffer).toString("utf-8");
    try {
      const parsedContent = JSON.parse(fileContent); // 🚀 Evita erro caso não seja um JSON válido
      return NextResponse.json({...parsedContent});
    } catch (parseError) {
      console.error("Erro ao parsear JSON:", parseError);
      return NextResponse.json({ error: "O conteúdo do arquivo não é um JSON válido." }, { status: 400 });
    }
    // console.log(response)
    // const content = response.data;
    // return NextResponse.json({ content });
  } catch (error) {
    console.error("Erro ao buscar arquivo:", error);
    return NextResponse.json({ error: "Erro ao buscar arquivo" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { fileId, updatedContent } = await req.json();
    const accessToken = req.headers.get("Authorization")?.split("Bearer ")[1];

    console.log(fileId, updatedContent, accessToken)
    if (!fileId || !accessToken) {
      return NextResponse.json({ error: "File ID ou Access Token ausente" }, { status: 400 });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth });

    await drive.files.update({
      fileId,
      media: {
        mimeType: "application/json",
        body: JSON.stringify(updatedContent),
      },
    });

    return NextResponse.json({ success: true, message: "Arquivo atualizado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar o arquivo", details: error }, { status: 500 });
  }
}