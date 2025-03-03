import { useFile } from "@/hooks/useFile";
import { WorkbookUnit } from "@/utils/2workbookI";
import { useEffect, useState } from "react";
import { WorkbookSubUnit } from "./SubUnit";

interface WorkbookUnitToRender extends WorkbookUnit{
  unit: string
}

export function WorkbookUnits() {
  const {workbook} = useFile()
  const [units, setUnits] = useState([] as WorkbookUnitToRender[]) // units to be rendered
  useEffect(() => {
    const listUnits: string[] = []
    let unitsToRender: WorkbookUnitToRender[] = []
    if (workbook) {
      workbook.unitsMandatory.forEach(el => {
        listUnits.push(...el.units)
      })
      workbook.unitsOptional.forEach(el => {
        listUnits.push(...el.selected)
      })
      unitsToRender = listUnits.map(el => {
        if (workbook.units[el]) return {...workbook.units[el], unit: el}
        return false
      }).filter((el: WorkbookUnitToRender | false) => el !== false)
    }
    setUnits(unitsToRender)
  }, [workbook])
  return (
    <>
      {units.map(unit => {
        return (
          <div key={'UNIT-'+unit.unit} id={unit.unit} className="page-break-before" >
            <div  className="p-20 print:p-5 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 text-green-500">
              {unit.unit} - {unit.title}
            </div>
            {
              Object.entries(unit.subUnits).filter(([,v]) => !(v?.isPratical)).map(([k, ]) =>  <WorkbookSubUnit key={'SubUnit-' + unit.unit + '-' + k} unit={unit.unit} subunit={k} /> )
            }
          </div>
        )
      })}
    </>
  )
}
