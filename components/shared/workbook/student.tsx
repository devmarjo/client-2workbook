"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFile } from "@/hooks/useFile";
import { SignatureDialog } from "./SignatureDialog";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";

export function WorkbookStudent() {
  const { workbook } = useFile()
  const [name, setName] = useState('')
  const [editMode, setEditMode] = useState(true)
  useEffect(() => {
    if (workbook?.student?.name) {
      setName(workbook.student.name)
      setEditMode(false)
    } else {
      setEditMode(true)
    }
  }, [workbook])
  return (
    editMode ?
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
            <Image src={String(workbook?.student.signature)} width={300} height={200} alt="Signature" />
            <div className="text-black">
              <b>{workbook?.student.name}</b>
            </div>
            <div className="text-black">
              {workbook?.student.signatureDate}
            </div>
            <div className="pt-3">
              <Button onClick={() => setEditMode(true) } >Edit <EditIcon/></Button>
            </div>
          </div>
        </CardContent>
      </Card>
  )
}

