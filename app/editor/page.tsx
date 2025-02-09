"use client";

import { WorkbookCover } from "@/components/shared/workbook/cover";
import { QualificationStructure } from "@/components/shared/workbook/qualificationStructure";
import { WorkbookSections } from "@/components/shared/workbook/sections";
import { WorkbookStudent } from "@/components/shared/workbook/student";
import { WorkbookUnits } from "@/components/shared/workbook/Units";
import { useFile } from "@/hooks/useFile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditorPage() {
  const router = useRouter();
  const { fileId, workbook } = useFile(); // Pegando os dados do contexto global


  useEffect(() => {
    router.replace('/editor')
  }, []);

  return (
    <div className="page-break-after">
      <div id="start"></div>
      <div className='container mx-auto max-w-6xl p-4 bg-white mb-32'>
        <WorkbookCover/>
        <WorkbookSections/>
        <WorkbookStudent/>
        <QualificationStructure/>
        <WorkbookUnits/>
      </div>
    </div>
  );
}