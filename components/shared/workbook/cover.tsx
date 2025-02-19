
// "version": "V1",
// "versionDate": "April 2024",
// "Organisation": "ProQual",
// "specs": "https://www.proqualab.com/wp-content/uploads/2024/04/ProQual-Level-3-Award-in-Education-and-Training-2.pdf",

import { useFile } from "@/hooks/useFile";
import Image from "next/image";

export function WorkbookCover() {
  const { workbook } = useFile()
  return (
    <div className="pb-20 print:pb-0 no-page-break">
      {
        workbook &&
        <>
          <h1 className="py-20 text-center text-7xl font-extrabold leading-none tracking-tight text-gray-900 text-green-500">
          {workbook.coverTitle}
          </h1>
          <div className="text-center">
            <Image
              className="mx-auto max-h-[30vh]"
              width={300}
              height={300}
              alt=""
              src={workbook.coverImg?.length > 0 ? workbook.coverImg : '/images/workbooks/cover/default.png'}
            />
            <Image
              className="mx-auto image-print"
              width={200}
              height={100}
              alt=""
              src={workbook.coverAcademyImg?.length > 0 ? workbook.coverAcademyImg : '/images/workbooks/academy/default.png'}
            />
            <b><a href={workbook.specs}>{workbook.Organisation} {workbook.versionDate} {workbook.version} </a></b>
          </div>
        </>
      }

    </div>
  )
}
