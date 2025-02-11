import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const FileList: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

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
      <div className="text-center"><b>Download Workbooks:</b></div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {files.map((file, index) => (
            <a key={'workbook'+index} href={'/api/download/' + encodeURIComponent(file)} download>
              <Button >{file}</Button>
            </a>
          ))}
        </>
      )}
    </div>
  );
};

export default FileList;