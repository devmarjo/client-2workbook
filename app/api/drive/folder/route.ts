import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const folderId = url.searchParams.get("id");
  const accessToken = req.headers.get("Authorization")?.split("Bearer ")[1];

  if (!folderId || !accessToken) {
    return NextResponse.json({ error: "File ID ou Access Token ausente" }, { status: 400 });
  }

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth });

    const folderData = await drive.files.get(
      {
        fileId: folderId,
        fields: "id, name"
      }
    );
    console.log('#############')
    console.log(folderData)
    console.log('#############')

    try {
      return NextResponse.json({...folderData});
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

// export async function PUT(req: NextRequest) {
//   try {
//     const { fileId, updatedContent } = await req.json();
//     const accessToken = req.headers.get("Authorization")?.split("Bearer ")[1];

//     console.log(fileId, updatedContent, accessToken)
//     if (!fileId || !accessToken) {
//       return NextResponse.json({ error: "File ID ou Access Token ausente" }, { status: 400 });
//     }

//     const auth = new google.auth.OAuth2();
//     auth.setCredentials({ access_token: accessToken });

//     const drive = google.drive({ version: "v3", auth });

//     await drive.files.update({
//       fileId,
//       media: {
//         mimeType: "application/x-2workbook",
//         body: JSON.stringify(updatedContent),
//       },
//     });

//     return NextResponse.json({ success: true, message: "Arquivo atualizado com sucesso" });
//   } catch (error) {
//     return NextResponse.json({ error: "Erro ao atualizar o arquivo", details: error }, { status: 500 });
//   }
// }


// export async function POST(req: NextRequest) {
//   try {

//     const { folderId, workbook } = await req.json();
//     const accessToken = req.headers.get("Authorization")?.split("Bearer ")[1];

//     if (!folderId || !accessToken || !workbook) {
//       return NextResponse.json(
//         { error: "folderId, accessToken and workbook are required." },
//         { status: 400 }
//       );
//     }
//     if (!('coverTitle' in workbook)) {
//       return NextResponse.json(
//         { error: "Workbook out of pattern" },
//         { status: 400 }
//       );
//     }

//     // Cria um cliente OAuth2 e define as credenciais (token de acesso)
//     const auth = new google.auth.OAuth2();
//     auth.setCredentials({ access_token: accessToken });

//     // Instancia o cliente do Google Drive
//     const drive = google.drive({ version: "v3", auth });

//     // Define os metadados do arquivo a ser criado
//     const fileMetadata = {
//       name: workbook.coverTitle + '.2workbook',
//       parents: [folderId],
//     };

//     // Define o conteúdo do arquivo (pode ser um stream, buffer ou string)
//     // Aqui, como exemplo, estamos criando um arquivo vazio.
//     const media = {
//       mimeType: "application/x-2workbook",
//       body: JSON.stringify(workbook), // ou um ReadableStream caso tenha conteúdo real
//     };

//     // Faz o upload/criação do arquivo
//     const response = await drive.files.create({
//       requestBody: fileMetadata,
//       media,
//       fields: "id, name, mimeType",
//     });

//     return NextResponse.json(response.data, { status: 200 });
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     console.error("Erro ao criar arquivo:", error);
//     return NextResponse.json(
//       { error: "Erro interno no servidor" },
//       { status: 500 }
//     );
//   }
// }