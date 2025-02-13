'use client'
import { DialogGDrive } from "@/components/shared/DialogGDrive";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { BookOpen } from "lucide-react";
import Image from "next/image";
// import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import FileList from "@/components/FileListWorkbooks";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  // const [inputValue, setInputVlaue] = useState('')
  // const [validLink, setValidLink] = useState(false)
  // const [fileId, setFileId] = useState('')
  // useEffect(() => {
  //   const match = inputValue.match(/[-\w]{25,}/)
  //   if (match?.[0]) {
  //     setValidLink(true)
  //     setFileId(match[0])
  //   } else {
  //     setValidLink(false)
  //     setFileId('')
  //   }
  // }, [inputValue])
  // const open = () => {
  //   if (validLink && fileId.length > 0) {
  //     router.push("/editor?file_id=" + fileId);
  //   }
  // }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="m-auto">
          <Image
            aria-hidden
            src="/images/2workbook.png"
            alt="2workbook"
            width={500}
            height={500}
          />
        </div>
        {/* <div className="flex items-center" style={{ width: "100%"}}>
          <Input className="mx-2 bg-white" value={inputValue} onChange={(e) => setInputVlaue(e.target.value)} placeholder="Google Drive File Link"  />
          <Button disabled={!validLink} onClick={open}><BookOpen/>Open</Button>
        </div> */}
        <div className="text-center m-auto py-[10vh]">
          <Button variant={"outline"} onClick={() => router.push('/filepicker') } >Open Google Drive File</Button>
        </div>
        <FileList/>
      </main>
      <footer className=" min-w-[70vw] row-start-3 flex justify-between gap-6 items-center ">
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
          <DialogGDrive />
        <div>
          <a className="font-medium text-blue-600 dark:text-blue-500 hover:underlin" href="/TermsOfService">Terms Of Service</a>
          <br />
          <a className="font-medium text-blue-600 dark:text-blue-500 hover:underlin" href="/PrivacyPolicy">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
