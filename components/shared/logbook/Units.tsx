import { useFile } from "@/hooks/useFile";
import { useEffect, useState } from "react";
import { commentatorEnum, LogbookComments } from "./Comments";
import { LogbookUnit } from "@/utils/2LogbookI";

interface LogbookUnitToRender extends LogbookUnit{
  title: string
  unit: string
}

export function LogbookUnits() {
  const {workbook} = useFile()
  const [units, setUnits] = useState([] as LogbookUnitToRender[]) // units to be rendered
  useEffect(() => {
    const listUnits: string[] = []
    let unitsToRender: LogbookUnitToRender[] = []
    if (workbook?.logbook) {
      workbook.unitsMandatory.forEach(el => {
        listUnits.push(...el.units)
      })
      workbook.unitsOptional.forEach(el => {
        listUnits.push(...el.selected)
      })
      unitsToRender = listUnits.map(el => {
        if (workbook.units[el]) {
          if (workbook.logbook?.units[el]) {
            return {...workbook.logbook?.units[el], unit: el, title: workbook.units[el].title }
          } else {
            return {unit: el, title: workbook.units[el].title, assessorComment: '', iqaComment: '' }
          }
        }
        return false
      }).filter((el: LogbookUnitToRender | false) => el !== false)
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
            <div className="p-20 print:p-0">
              <div className="text-xl "><b>Assessor comments:</b></div>
              <LogbookComments unit={unit.unit} commentator={commentatorEnum.Assessor} comment={unit.assessorComment}  />
            </div>
            <div className="p-20 print:p-0">
              <div className="text-xl "><b>IQA comments:</b></div>
              <LogbookComments unit={unit.unit} commentator={commentatorEnum.IQA} comment={unit.iqaComment}  />
            </div>
          </div>
        )
      })}
    </>
  )
}
