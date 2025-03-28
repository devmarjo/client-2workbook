import { useFile } from "@/hooks/useFile";
import { WorkbookSubUnitI } from "@/utils/2workbookI";
import { useEffect, useState } from "react";
import { WorkbookQuestion } from "./Question";


export function WorkbookSubUnit(props: { unit: string, subunit: string }) {
  const {workbook} = useFile()
  const [subUnit, setSubUnit] = useState({} as WorkbookSubUnitI) // units to be rendered
  useEffect(() => {
    let nSubUnits: WorkbookSubUnitI = {} as WorkbookSubUnitI
    if (workbook) {
      nSubUnits = workbook.units[props.unit].subUnits[props.subunit]
      setSubUnit(nSubUnits)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workbook])
  return (
    <>
      <div className={"p-20 print:p-10 text-left text-2xl font-bold leading-none tracking-tight text-gray-900" + (Number(props.subunit) > 1 ? ' page-break-before' : '' ) }>
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
