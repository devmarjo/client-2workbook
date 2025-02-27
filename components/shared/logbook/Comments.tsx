import { Button } from "@/components/ui/button";
import { useFile } from "@/hooks/useFile";
import { LogbookUnit } from "@/utils/2LogbookI";
import { WorkbookI } from "@/utils/2workbookI";
import PrintMiddleware from "@/utils/PrintMiddleware";
import { Edit, Save, X } from "lucide-react";
import { useEffect, useState } from "react"
import Editor, { ContentEditableEvent } from 'react-simple-wysiwyg';
export enum commentatorEnum {
  Assessor = 'assessorComment',
  IQA = 'iqaComment',
}
export function LogbookComments(props: { unit: string, commentator: commentatorEnum, comment: string  }) {
  const [editMode, setEditMode] = useState(false)
  const [editValue, setEditValue] = useState('')
  const {workbook, setWorkbook } = useFile()
  function onChange(e: ContentEditableEvent) {
    setEditValue(e?.target?.value || '');
  }
  const getAnswer = () => {
    if (workbook) { 
      const t  = workbook?.logbook?.units?.[props.unit]?.[props.commentator]
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
    if (workbook?.logbook) {
      const units: { [key: string]: LogbookUnit } = {}
      Object.entries(workbook.logbook?.units).forEach(([k, v]) => units[k] = v)
      if (!units?.[props.unit]) {
        units[props.unit] = {
          assessorComment: '',
          iqaComment: ''
        }
      }
      units[props.unit][props.commentator] = editValue
      const newLogbook = {...workbook.logbook, units}
      const newWorkbook: WorkbookI = { ...workbook, logbook: newLogbook }
      setWorkbook(newWorkbook)
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
                <p className="py-10" dangerouslySetInnerHTML={{__html:editValue}}></p>
                <Button  variant={'outline'} onClick={() => setEditMode(!editMode)} className="no-print" ><Edit/>Edit</Button>
              </div> :
              <div className="text-center print-space">
                <Button className="bg-blue-500  no-print" onClick={() => setEditMode(!editMode)} ><Edit/>Comment</Button>
              </div>
              
            }
          </>
        }

      </div>
    </div>
  )
    
}