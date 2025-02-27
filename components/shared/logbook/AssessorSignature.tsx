import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useFile } from "@/hooks/useFile"
import { LogbookI } from "@/utils/2LogbookI"
import { WorkbookI } from "@/utils/2workbookI"
import { CircleX, Edit } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import SignatureCanvas from 'react-signature-canvas'
import { toast } from "sonner"
 
export function AssessorSignature() {
  const { workbook, setWorkbook } = useFile()
  const [openDialog, setopenDialog] = useState(false)
  const sig = useRef<SignatureCanvas| null>(null)
  const clear = () => {
    if (sig) {
        sig.current?.clear()
    }
  }
  const save = () => {
    if (workbook?.logbook?.assessor) {
      const canvas = sig.current?.getCanvas()
      if (canvas) {
        const dataUrl = canvas.toDataURL()
        if (!workbook) {
          toast('Workbook is not Loaded')
          return false
        }
        const newAssessor = {
          ...workbook.logbook?.assessor,
          signature: dataUrl,
          signatureDate: new Date().toLocaleString(),
        }
        const newLogbook: LogbookI = { ...workbook.logbook, assessor: newAssessor}
        const newWorkbook: WorkbookI = { ...workbook, logbook: newLogbook}
        setWorkbook(newWorkbook)
        setopenDialog(false)
      }
    }
  }

  return (
    <div className="p-10">
      <div className="p-2">
        {
          workbook?.logbook?.assessor?.signature?.length ?
          <Image className="m-auto" src={String(workbook.logbook.assessor.signature)} width={300} height={200} alt="Assessor Signature" /> : ''
        }
        {
          workbook?.logbook?.assessor &&
          <div className="text-right">
            <Dialog open={openDialog} onOpenChange={setopenDialog}>
              <DialogTrigger asChild >
                <Button variant="outline"><Edit/></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Signature</DialogTitle>
                  <DialogDescription>
                    Draw your signature below:
                  </DialogDescription>
                </DialogHeader>
                <div className="flex">
                  <div className="mx-auto">
                    <div className="text-emerald-600 text-2xl font-extrabold pt-5">Signature</div>
                    <SignatureCanvas ref={sig} penColor='black' canvasProps={{width: 300, height: 200, className: 'sigCanvas'}} />
                  </div>
                </div>
                <div className="text-center"><b>{workbook?.logbook?.assessor?.name}</b></div>
                <DialogFooter>
                  <div className="w-full flex justify-between">
                    <Button onClick={clear}>Clear<CircleX/></Button>
                    <Button onClick={save}>Save Signature</Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
    
        }
      </div>
      <div>
        {workbook?.logbook?.assessor?.signatureDate}
      </div>
      <div className="border-t-2 border-black">
        {workbook?.logbook?.assessor?.name}
        <b><br /> ASSESSOR</b>
        
      </div>
    </div>
  )
}