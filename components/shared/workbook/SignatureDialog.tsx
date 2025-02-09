"use client";
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
import { CircleX } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import SignatureCanvas from 'react-signature-canvas'
import { toast } from "sonner"
 
export function SignatureDialog(props: { name: string, setEditMode: (val: boolean) => void } ) {
  const { workbook, setWorkbook, saveWorkbook } = useFile()
  const [openDialog, setopenDialog] = useState(false)
  const sig = useRef<SignatureCanvas| null>(null)
    const clear = () => {
    if (sig) {
        sig.current?.clear()
    }
    }
    const save = () => {
    const canvas = sig.current?.getCanvas()
    if (canvas) {
      const dataUrl = canvas.toDataURL()
      if (!workbook) {
        toast('Workbook is not Loaded')
        return false
      }
      workbook.student = {
        name: props.name,
        signature: dataUrl,
        signatureDate: new Date().toLocaleString()
      }
      setWorkbook(workbook)
      saveWorkbook()
      setopenDialog(false)
      props.setEditMode(false)
    }
  }
  const [disableTrigger, setDisableTrigger] = useState(true)
  useEffect(() => {
    if (props.name.length < 5) {
      setDisableTrigger(true)
    } else {
      setDisableTrigger(false)
    }
  },[props.name])
  return (
    <Dialog open={openDialog} onOpenChange={setopenDialog}>
      <DialogTrigger asChild disabled={disableTrigger}>
        <Button variant="outline">Sign</Button>
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
        <div className="text-center"><b>{props.name}</b></div>
        <DialogFooter>
          <div className="w-full flex justify-between">
            <Button onClick={clear}>Clear<CircleX/></Button>
            <Button onClick={save}>Save Signature</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}