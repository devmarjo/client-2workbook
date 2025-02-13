"use client";

import GoogleDrivePicker from "@/components/GoogleDrivePickerApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function FilePicker() {
  const router = useRouter()
  if (typeof localStorage !== "undefined") {
    localStorage.setItem('clientRedirect', '/filepicker')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFilePicked = (file: any, createPicker:() => void) => {
    if (!file.name.toLowerCase().endsWith('.2workbook')) {
        toast('FILE INVALID')
        return createPicker()
      }
      console.log("Arquivo selecionado:", file.id);  
      localStorage.setItem("file_id", file.id);
      router.push('/editor?file_id='+file.id)
  };
  return (
    <>
      <GoogleDrivePicker onPicked={onFilePicked} onCancel={() => router.push('/')} />
    </>
  );
}

