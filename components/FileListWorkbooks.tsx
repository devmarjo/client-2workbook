'use client'
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";

const FileList: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/demo")
      .then((res) => res.json())
      .then((data) => {
        if (data.files) {
          setFiles(data.files);
        } else {
          setError("No files found.");
        }
      })
      .catch(() => setError("Error fetching files."));
  }, []);

  return (
    <div className="m-auto flex flex-col gap-2 text-center">
      <div className="text-center"><b>Workbooks:</b></div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {files.map((file, index) => (
            <div className="flex flex-row" key={'workbook'+index}>
              <Button  style={{width: '75%'}} onClick={() => router.push("/view?url=/api/download/" + encodeURIComponent(file))}>
                <span className="overflow-hidden text-ellipsis">{file}</span>
              </Button>
              <a style={{width: '25%'}} href={'/api/download/' + encodeURIComponent(file)} download>
                <Button ><Download/></Button>
              </a>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FileList;
