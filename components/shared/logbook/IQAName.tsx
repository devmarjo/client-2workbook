import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useFile } from "@/hooks/useFile"
import { LogbookI } from "@/utils/2LogbookI"
import { WorkbookI } from "@/utils/2workbookI"
import { Edit } from "lucide-react"
import { useEffect, useState } from "react"
 
export function IQAName() {
  const { workbook, setWorkbook } = useFile()
  const [name, setName] = useState('')
  const [openDialog, setopenDialog] = useState(false)
  const save = () => {
    if (workbook?.logbook?.iqa) {
      const newIqa = {...workbook.logbook.iqa}
      newIqa.name = name
      const newLogbook: LogbookI = { ...workbook.logbook, iqa: newIqa }
      const newWorkbook: WorkbookI = { ...workbook, logbook: newLogbook}
      setWorkbook(newWorkbook)
      setopenDialog(false)
    }
  }

  useEffect(() => {
    if (workbook?.logbook?.iqa.name) {
      setName(workbook.logbook.iqa.name)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
      {name.length > 0 && <span className="pr-4">{name}</span>} 
      <Dialog open={openDialog} onOpenChange={setopenDialog}>
        <DialogTrigger asChild style={{display: 'inline' }}>
          <div>
            <Button className="no-print" size={'sm'}  variant={'secondary'}><Edit/></Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Assessor Name</DialogTitle>
          </DialogHeader>
          <div className="flex">
            <div className="w-[100%]">
              <Input value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <div className="w-full flex justify-end">
              <Button onClick={save}>Save</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}