'use client'
import { DialogGDrive } from "@/components/shared/DialogGDrive";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import FileList from "@/components/FileListWorkbooks";

export default function Home() {
  const router = useRouter();
  const [inputValue, setInputVlaue] = useState('')
  const [validLink, setValidLink] = useState(false)
  const [fileId, setFileId] = useState('')
  useEffect(() => {
    const match = inputValue.match(/[-\w]{25,}/)
    if (match?.[0]) {
      setValidLink(true)
      setFileId(match[0])
    } else {
      setValidLink(false)
      setFileId('')
    }
  }, [inputValue])
  const open = () => {
    if (validLink && fileId.length > 0) {
      router.push("/editor?file_id=" + fileId);
    }
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
            aria-hidden
            src="/images/2workbook.png"
            alt="2workbook"
            width={500}
            height={500}
          />
        <div className="flex items-center" style={{ width: "100%"}}>
          <DialogGDrive />
          <Input className="mx-2 bg-white" value={inputValue} onChange={(e) => setInputVlaue(e.target.value)} placeholder="Google Drive File Link"  />
          <Button disabled={!validLink} onClick={open}><BookOpen/>Open</Button>
        </div>
        <FileList/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/images/2wards.png"
            alt="Window icon"
            width={200}
            height={16}
          />
        </a>
      </footer>
    </div>
  );
}
