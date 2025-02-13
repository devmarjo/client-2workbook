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
import { CheckSquare } from "lucide-react";

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
        <div className="grid grid-cols-2 gap-4">
          <div className={"col-span-2 md:col-span-1"}>
            <div className="text-center p-10">
              <Button className="text-2xl mt-5 p-5" variant={"outline"} onClick={() => router.push('/filepicker') } >Open Google Drive File</Button>
            </div>
            <div className=" m-auto text-center text-4xl py-10">Welcome to 2Workbook</div>
            <p className="p-5 text-justify"><b>2Workbook</b> is a solution for streamlining the completion of educational materials in digital format. Designed for professionals and students in vocational training, it allows you to create, save, and access your question-and-answer workbooks directly from Google Drive, without the need for additional storage.</p>
            <div className=" m-auto text-center text-xl pt-5">What is 2Workbook?</div>
            <p className="p-5 text-justify"><b>2Workbook</b> is a web application integrated with Google Drive that enables users to open and save files in the .2workbook format. These files are structured to make completing mandatory training materials more efficient, helping you achieve your certification or qualification with ease.
            </p>
            <div className=" m-auto text-center text-xl pt-5">Key Features</div>
            <div className="p-5">
              <ul>
                <li className="p-5 items-center flex">
                  <div className="w-[60px]">
                    <CheckSquare size={30} className="text-white"/>
                  </div>
                  <div className="w-[100%] text-justify">Seamless Google Drive Integration - No extra accounts or storage required.</div>
                </li>
                <li className="p-5 items-center flex">
                  <div className="w-[60px]">
                    <CheckSquare size={30} className="text-white"/>
                  </div>
                  <div className="w-[100%] text-justify">Fast & Simple Access - Open your files directly using “Open with” in Google Drive.</div>
                </li>
                <li className="p-5 items-center flex">
                  <div className="w-[60px]">
                    <CheckSquare size={30} className="text-white"/>
                  </div>
                  <div className="w-[100%] text-justify">User-Friendly Interface - Keep your study materials organized in an easy-to-use environment.</div>
                </li>
                <li className="p-5 items-center flex">
                  <div className="w-[60px]">
                    <CheckSquare size={30} className="text-white"/>
                  </div>
                  <div className="w-[100%] text-justify">Optimized for Easy Completion - Renders content in responsive HTML, making navigation and editing smooth.</div>
                </li>
                <li className="p-5 items-center flex">
                  <div className="w-[60px]">
                    <CheckSquare size={30} className="text-white"/>
                  </div>
                  <div className="w-[100%] text-justify">100% Cloud-Based - All your files remain securely stored in Google Drive.</div>
                </li>
              </ul>
            </div>

            <div className=" m-auto text-center text-xl pt-5">How It Works?</div>
            <div className="p-5">
              <ol className="px-10 list-decimal">
                <li className="py-5">
                  Seamless Google Drive Integration - No extra accounts or storage required.
                </li>
                <li className="py-5">
                  Fast & Simple Access - Open your files directly using “Open with” in Google Drive.
                </li>
                <li className="py-5">
                  User-Friendly Interface - Keep your study materials organized in an easy-to-use environment.
                </li>
                <li className="py-5">
                  Optimized for Easy Completion - Renders content in responsive HTML, making navigation and editing smooth.
                </li>
                <li className="py-5">
                  100% Cloud-Based - All your files remain securely stored in Google Drive.
                </li>
              </ol>
            </div>
          </div>
          <div>
            <div className="mt-10"></div>
            <FileList/>
          </div>
        </div>
        <div className="grid">
        </div>
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
