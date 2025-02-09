import { useFile } from "@/hooks/useFile";
import { WorkbookSubUnit } from "@/utils/2workbookI";
import { useEffect, useState } from "react";
import { WorkbookQuestion } from "./Question";


export function WorkbookSubUnit(props: { unit: string, subunit: string }) {
  const {workbook} = useFile()
  const [subUnit, setSubUnit] = useState({} as WorkbookSubUnit) // units to be rendered
  const [html, setHtml] = useState('my <b>HTML</b>');
  useEffect(() => {
    let nSubUnits: WorkbookSubUnit = {} as WorkbookSubUnit
    if (workbook) {
      nSubUnits = workbook.units[props.unit].subUnits[props.subunit]
      setSubUnit(nSubUnits)
    }
  }, [workbook])
  return (
    <>
      <div className="p-20 print:p-10 text-left text-2xl font-bold leading-none tracking-tight text-gray-900">
        {props.subunit} - {subUnit.title}
      </div>
      {
        subUnit.questions && 
        Object.entries(subUnit.questions).map(([k, v]) => {
          return(
            <WorkbookQuestion  key={`Q${props.unit}-${props.subunit}-${k}`}  unit={props.unit} subunit={props.subunit} qkey={k} q={v}  />
          )
        })
      }
    </>
  )
}
