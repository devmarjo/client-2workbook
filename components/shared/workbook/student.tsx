
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFile } from "@/hooks/useFile";
import { SignatureDialog } from "./SignatureDialog";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash } from "lucide-react";
import { WorkbookI } from "@/utils/2workbookI";

export function WorkbookStudent() {
  const { workbook, setWorkbook } = useFile()
  const [name, setName] = useState('')
  const [editMode, setEditMode] = useState(true)
  const clearStudent = () => {
    if (workbook) {
      const newWorkbook: WorkbookI = { ...workbook, student: undefined }
      setWorkbook(newWorkbook)
    }
  }
  useEffect(() => {
    if (workbook?.student?.name) {
      if (workbook.student.name.length > 0) {
        setName(workbook.student.name)
        setEditMode(false)
        return
      } 
    }
    setEditMode(true)
  }, [workbook])
  return (
    (workbook && editMode)  ?
      <Card className="pb-20 md:px-20 no-page-break">
        <CardHeader>
          <CardTitle>
            <div className="text-emerald-600 text-4xl font-extrabold pb-5">Student</div>
          </CardTitle>
          <CardDescription>
            <Input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value) } />
          </CardDescription>
        </CardHeader>
        <CardContent className="text-right">
          <SignatureDialog name={name} setEditMode={setEditMode} />
        </CardContent>
      </Card>:

      <Card className="pb-20 md:px-20 no-page-break">
        <CardHeader>
          <CardTitle>
            <div className="text-emerald-600 text-4xl font-extrabold pb-5">Student</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-right">
          <div className="flex flex-col text-center items-center">
          {
            workbook?.student && 
            <>
              <Image src={String(workbook.student.signature)} width={300} height={200} alt="Signature" />
              <div className="text-black">
                <b>{workbook.student.name}</b>
              </div>
              <div className="text-black">
                {workbook.student.signatureDate}
              </div>
              <div>
                <Button className="m-3" variant="destructive" onClick={() => clearStudent() } >Clear <Trash/></Button>
                <Button className="m-3" onClick={() => setEditMode(true) } >Edit <EditIcon/></Button>
              </div>
            </>
          }
          </div>
        </CardContent>
      </Card>
  )
}

