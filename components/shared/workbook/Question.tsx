import { Button } from "@/components/ui/button";
import { useFile } from "@/hooks/useFile";
import { WorkbookI, WorkbookUnit } from "@/utils/2workbookI";
import PrintMiddleware from "@/utils/PrintMiddleware";
import { Edit, Save, X } from "lucide-react";
import { useEffect, useState } from "react"
import Editor, { ContentEditableEvent } from 'react-simple-wysiwyg';

export function WorkbookQuestion(props: { unit: string, subunit: string, qkey: string | number, q: string }) {
  const [editMode, setEditMode] = useState(false)
  const [editValue, setEditValue] = useState('')
  const {workbook, setWorkbook, saveWorkbook } = useFile()
  function onChange(e: ContentEditableEvent) {
    setEditValue(e?.target?.value || '');
  }
  const getAnswer = () => {
    if (workbook) { 
      const t  = workbook?.units?.[props.unit]?.subUnits?.[props.subunit]?.answers?.[props.qkey]
      if (t) {
        setEditValue(t)
      } 
    }
  }
  const cancelEditMode = () => {
    getAnswer()
    setEditMode(false)
  }
  useEffect(()=>{
    getAnswer()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workbook]) 
  const save = () => {
    if (workbook) {
      const units: { [key: string]: WorkbookUnit } = {}
      Object.entries(workbook.units).forEach(([k, v]) => units[k] = v)
      if (!units?.[props.unit]?.subUnits?.[props.subunit]?.answers) {
        units[props.unit].subUnits[props.subunit].answers = {}
      }
      units[props.unit].subUnits[props.subunit].answers[props.qkey] = editValue
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
            <div style={{margin: 'auto', maxWidth: '720px'}} className="no-print">
              <Editor value={editValue} onChange={onChange} /> 
            </div>
            <div className="py-3 flex justify-between no-print">
              <Button variant='destructive' onClick={cancelEditMode}><X/>Cancel</Button>
              <Button onClick={save}><Save/>SAVE</Button>
            </div>
          </>:
          <>
            {
              editValue.length > 0 ?
              <div style={{margin: 'auto', maxWidth: '720px'}}>
                <p dangerouslySetInnerHTML={{__html:editValue}}></p>
                <Button  variant={'outline'} onClick={() => setEditMode(!editMode)} className="no-print" ><Edit/>Edit</Button>
              </div> :
              <div className="text-center no-print">
                <Button className="bg-blue-500" onClick={() => setEditMode(!editMode)} ><Edit/>ANSWER</Button>
              </div>
              
            }
          </>
        }

      </div>
    </div>
  )
    
}