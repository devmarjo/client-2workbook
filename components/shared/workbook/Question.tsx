"use client";
import { Button } from "@/components/ui/button";
import { useFile } from "@/hooks/useFile";
import { WorkbookI, WorkbookUnitI } from "@/utils/2workbookI";
import PrintMiddleware from "@/utils/PrintMiddleware";
import { Edit, Save, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react"
import Editor, { ContentEditableEvent } from 'react-simple-wysiwyg';


export function WorkbookQuestion(props: { unit: string, subunit: string, qkey: string | number, q: string }) {
  const [editMode, setEditMode] = useState(false)
  const [editValue, setEditValue] = useState('')
  const {workbook, setWorkbook, saveWorkbook } = useFile()
  function onChange(e: ContentEditableEvent) {
    setEditValue(e?.target?.value || '');
  }
  // const getAnswer = () => {
  //   if (workbook) { 
  //     const t  = workbook?.units?.[props.unit]?.subUnits?.[props.subunit]?.answers?.[props.qkey]
  //     if (t) {
  //       setEditValue(t)
  //     } 
  //   }
  // }
  const getAnswer = useCallback(() => {
    if (workbook) { 
      const t  = workbook?.units?.[props.unit]?.subUnits?.[props.subunit]?.answers?.[props.qkey]
      if (t) {
        setEditValue(t)
      } 
    }
  },[workbook, props.unit, props.subunit, props.qkey])
  const cancelEditMode = () => {
    getAnswer()
    setEditMode(false)
  }
  useEffect(()=>{
    getAnswer()
  }, [getAnswer]) 
  const save = () => {
    if (workbook) {
      const units: { [key: string]: WorkbookUnitI } = {}
      Object.entries(workbook.units).forEach(([k, v]) => units[k] = v)
      if (!units?.[props.unit]?.subUnits?.[props.subunit]?.answers) {
        units[props.unit].subUnits[props.subunit].answers = {}
      }
      const testElement: HTMLSpanElement = document.createElement('span')
      testElement.innerHTML = editValue
      console.log('@@@@testElement.innerText.length', testElement.innerText.length)
      if (testElement.innerText.length > 0) {
        units[props.unit].subUnits[props.subunit].answers[props.qkey] = editValue 
      } else {
        units[props.unit].subUnits[props.subunit].answers[props.qkey] = ""
        setEditValue("")
      }
      console.log(units)
      const newWorbook: WorkbookI = { ...workbook, units: units }
      setWorkbook(newWorbook)
      saveWorkbook()
      setEditMode(false)
    }
  }
  PrintMiddleware(
    () => {
      if (editMode) {
        save()
      }
    }
  )
  
  return(
    <div className="no-page-break">
      <div className="p-5 py-5 text-left leading-none tracking-tight text-gray-900"> {props.qkey} - {props.q}  </div>
      <div className="pb-10">
        {
          editMode ? 
          <>
            <div style={{margin: 'auto', maxWidth: '900px'}} className="no-print ">
              <Editor value={editValue} onChange={onChange} /> 
            </div>
            <div style={{margin: 'auto', maxWidth: '900px'}} className="py-3 flex justify-between no-print">
              <Button variant='destructive' onClick={cancelEditMode}><X/>Cancel</Button>
              <Button onClick={save}><Save/>SAVE</Button>
            </div>
          </>:
          <>
            {
              editValue.length > 0 ?
              <div style={{margin: 'auto', maxWidth: '900px'}}>
                <p className="border-2 border-dotted p-5 my-2" dangerouslySetInnerHTML={{__html:editValue}}></p>
                <Button  variant={'outline'} onClick={() => setEditMode(!editMode)} className="no-print" ><Edit/>Edit</Button>
              </div> :
              <div className="text-center border-2 border-dotted py-10 print:py-[10vh]" style={{margin: 'auto', maxWidth: '900px'}}>
                <Button className="bg-blue-500 no-print" onClick={() => setEditMode(!editMode)} ><Edit/>ANSWER</Button>
              </div>
              
            }
          </>
        }

      </div>
    </div>
  )
    
}