"use client";

import { WorkbookCover } from "@/components/shared/workbook/cover";
import { QualificationStructure } from "@/components/shared/workbook/qualificationStructure";
import { WorkbookSections } from "@/components/shared/workbook/sections";
import { WorkbookStudent } from "@/components/shared/workbook/student";
import { WorkbookUnits } from "@/components/shared/workbook/Units";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { setTokens } from "@/utils/auth";
import { useFile } from "@/hooks/useFile";

export default function Editor() {
  const { setFileIdFromParams } = useFile()
  const router = useRouter();
  const searchParams = useSearchParams();
  const ParamsAccessToken = searchParams.get('access_token')
  const ParamsRefreshToken = searchParams.get('refresh_token')
  const ParamsExpiryDate = searchParams.get('expiry_date')
  if (ParamsAccessToken && ParamsRefreshToken) {
    setTokens(ParamsAccessToken, ParamsRefreshToken, ParamsExpiryDate )
  }
  const urlFileId = searchParams.get("file_id");
  if (urlFileId) {
    localStorage.setItem("file_id", urlFileId);
    setFileIdFromParams (urlFileId);
  }

  useEffect(() => {
    router.replace('/editor')
  }, [router]);

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