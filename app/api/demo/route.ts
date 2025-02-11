import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function GET() {
  const directoryPath = path.join(process.cwd(), "workbooks"); // Ajuste o caminho conforme necessário
  try {
    const files = fs.readdirSync(directoryPath);
    return NextResponse.json({files});

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to read directory" }, { status: 500 });

  }
}