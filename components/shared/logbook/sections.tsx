
import { useFile } from "@/hooks/useFile";
import { AssessorName } from "./AssessorName";
import { IQAName } from "./IQAName";

export function LogkbookSections() {
  const { workbook } = useFile()
  return (
    <div className="pb-20 md:px-20 print:pb-0 print:px-0 print:pt-10">
      <div className="text-3xl">Introduction</div>
      <div className="pt-4 text-lg">
        This logbook aims to document my learning journey throughout the <b>{workbook?.coverTitle}</b>.
        It includes descriptions of the activities completed, reflections on the learning process,
        and how the acquired knowledge applies to my professional practice.
        The logbook is structured by units, covering the key topics studied and the evidence demonstrating my progress.
      </div>
      <div className="flex flex-row text-xl gap-4 pt-4">
        <div className="basis-1/4 text-right">Awarding Body:</div>
        <div className="basis-3/4 text-left">
          {workbook?.Organisation}
        </div>
      </div>
      <div className="flex flex-row text-xl gap-4 pt-4">
        <div className="basis-1/4 text-right">Student:</div>
        <div className="basis-3/4 text-left"> {workbook?.student?.name}</div>
      </div>
      <div className="flex flex-row text-xl gap-4 pt-4">
        <div className="basis-1/4 text-right">Assessor:</div>
        <div className="basis-3/4 text-left">
          <AssessorName/>
        </div>
      </div>
      <div className="flex flex-row text-xl gap-4 pt-4">
        <div className="basis-1/4 text-right">IQA:</div>
        <div className="basis-3/4 text-left">
          <IQAName/>
        </div>
      </div>
      {/* {
        workbook &&
        workbook.sections.map((section, index) => {
          return (
            <div className="pb-20 no-page-break" key={"section" + index} id={encodeURI(section.title)}>
                <div className="text-emerald-600 text-4xl font-extrabold pb-5">{section.title}</div>
                <div className="text-lg font-extrabold" dangerouslySetInnerHTML={{ __html: section.content}}></div>
            </div>
          )
        })
      }   */}
    </div>
  )
}
