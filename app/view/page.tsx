"use client";
import { useFile } from "@/hooks/useFile";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
const Viewer = dynamic(() => import("@/components/Viewer"), { ssr: false });

export default function ViewPage() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('clientRedirect', '/view')
  }
  const router = useRouter();
  const { workbook, getWorkbookViewByURL } = useFile()
  const searchParams = useSearchParams()
  const url = searchParams.get("url");

  useEffect(() => {
    console.log('AKI', url)
    if (url) {
      localStorage.setItem("url", url);
      getWorkbookViewByURL(url)
      return
    } else {
      const cachedUrl = localStorage.getItem("url") || ''
      if (cachedUrl.length > 0) {
        getWorkbookViewByURL(cachedUrl)
        return
      }
    }
    toast('Nenhuma URL foi Definida')
    router.push('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    // viewerWorkbook ('/api/download/' + encodeURIComponent(file))
    useEffect(() => {
      router.replace('/view')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
  return (
    <>
    {
      workbook?
      <>
        <Viewer />
      </>:
      <div className="w-[100vw] text-center text-white p-20 text-xl"><b>LOADING...</b></div>
    }
    </>
  );
}
