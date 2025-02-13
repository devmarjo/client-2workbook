"use client";

import { useFile } from "@/hooks/useFile";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
const EditorComponent = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function EditorPage() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('clientRedirect', '/editor')
  }
  const router = useRouter()
  const {fileId, workbook, setFileId, getWorkbookByFileId} = useFile()
  const searchParams = useSearchParams()
  const urlFileId = searchParams.get("file_id");
  useEffect(() => {
    if (urlFileId) {
      localStorage.setItem("file_id", urlFileId);
      setFileId(urlFileId);
    } else {
      const cachedFileId = localStorage.getItem("file_id") || ''
      if (cachedFileId.length > 0) {
        setFileId(localStorage.getItem("file_id"));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(()=> {
    if (fileId) {
      if (fileId.length > 0) {
        getWorkbookByFileId()
      } 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId])

  useEffect(()=> {
    router.replace('editor')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId])
  return (
    <>
        <h1>{fileId}</h1>
        { workbook ?
          <EditorComponent /> :
          <div className="w-[100vw] text-center text-white p-20 text-xl"><b>LOADING...</b></div>
        }
    </>
  );
}
