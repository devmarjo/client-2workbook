"use client";

import { WorkbookCover } from "@/components/shared/workbook/cover";
import { QualificationStructure } from "@/components/shared/workbook/qualificationStructure";
import { WorkbookSections } from "@/components/shared/workbook/sections";
import { WorkbookStudent } from "@/components/shared/workbook/student";
import { WorkbookUnits } from "@/components/shared/workbook/Units";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useFile } from "@/hooks/useFile";
import { useEffect, useState } from "react";
import { LogbookCover } from "./shared/logbook/cover";
import { LogkbookSections } from "./shared/logbook/sections";
import { LogbookUnits } from "./shared/logbook/Units";
import { LogbookSignatures } from "./shared/logbook/Signatures";

export default function Editor() {
  const { progress } = useFile()
  const [disableLogbook, setDisableLogbook] = useState(true)
  useEffect(() => {
    if (progress >= 100) {
      setDisableLogbook(false)
    } else {
      setDisableLogbook(true)
    }
  }, [progress, setDisableLogbook])
  return (
    <div className="page-break-after">
      <div id="start"></div>
      <div className='container mx-auto max-w-6xl p-4 bg-white mb-32'>
        <Tabs defaultValue="workbook">
          <TabsList className={'w-[100%] no-print' + (disableLogbook ? ' hidden' : '') }>
            <TabsTrigger className="w-[50%]" value="workbook">Workbook</TabsTrigger>
            <TabsTrigger disabled={disableLogbook} className="w-[50%]" value="logbook">Logbook</TabsTrigger>
          </TabsList>
          <TabsContent value="workbook">
            <WorkbookCover/>
            <WorkbookSections/>
            <WorkbookStudent/>
            <QualificationStructure/>
            <WorkbookUnits/>
          </TabsContent>
          <TabsContent value="logbook">
            <LogbookCover/>
            <LogkbookSections/>
            <LogbookUnits/>
            <LogbookSignatures/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}