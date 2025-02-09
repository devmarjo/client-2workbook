
"use client";
import { useFile } from "@/hooks/useFile";

export function WorkbookSections() {
  const { workbook } = useFile()
  return (
    <div className="pb-20 md:px-20 print:pb-0">
      {
          workbook &&
          workbook.sections.map((section, index) => {
            return (
              <div className="pb-20 no-page-break" key={"section" + index} id={encodeURI(section.title)}>
                  <div className="text-emerald-600 text-4xl font-extrabold pb-5">{section.title}</div>
                  <div className="text-lg font-extrabold" dangerouslySetInnerHTML={{ __html: section.content}}></div>
              </div>
            )
          })
        }  
    </div>
  )
}
