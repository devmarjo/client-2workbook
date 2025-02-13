"use client";

import { WorkbookCover } from "@/components/shared/workbook/cover";
import { QualificationStructure } from "@/components/shared/workbook/qualificationStructure";
import { WorkbookSections } from "@/components/shared/workbook/sections";
import { WorkbookStudent } from "@/components/shared/workbook/student";
import { WorkbookUnits } from "@/components/shared/workbook/Units";

export default function Viewer() {
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