"use client";

import GoogleDrivePicker from "@/components/GoogleDrivePickerApi";
import { useFile } from "@/hooks/useFile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


export default function Folderpicker() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('clientRedirect', '/view/folderpicker')
  }
  const router = useRouter();
  const { workbook, getWorkbookViewByURL, CreateNewFileWorkbook } = useFile()
  // const searchParams = useSearchParams()
  // const url = searchParams.get("url");

  useEffect(() => {
    if (!workbook) {
      const cachedUrl = localStorage.getItem("url") || ''
      if (cachedUrl.length > 0) {
        getWorkbookViewByURL(cachedUrl)
        return
      } else {
        toast('Nenhuma URL foi Definida, tente novamente')
        router.push('/')
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    // viewerWorkbook ('/api/download/' + encodeURIComponent(file))
    useEffect(() => {
      router.replace('/view/folderpicker')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFolderPicked = (folder: any, createPicker:() => void) => {
    if (!folder?.id) {
        toast('FOLDER INVALID')
        return createPicker()
      }
      console.log("Arquivo selecionado:", folder);  
      CreateNewFileWorkbook(folder.id)
      comeback()
      // localStorage.setItem("file_id", file.id);
      // router.push('/editor?file_id='+file.id)
  };
  const comeback = ()  => {
    router.push('/view')
  }
  return (
    <>
      {
        workbook?
        <GoogleDrivePicker onPicked={onFolderPicked} folder={true} onCancel={comeback} /> :
        <div className="w-[100vw] text-center text-white p-20 text-xl"><b>LOADING...</b></div>
      }
    </>
  );
}

