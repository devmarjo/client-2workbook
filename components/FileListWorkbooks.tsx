'use client'
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
const proQualCourses = [
  "ProQual Level 3 NVQ Certificate in Occupational Health and Safety",
  "ProQual Level 6 NVQ Diploma in Occupational Health and Safety Practice",
  "ProQual Level 2 Diploma in Construction Operations",
  "ProQual Level 6 NVQ Diploma in Construction Site Management",
  "ProQual Level 3 Diploma in Business Administration",
  "ProQual Level 5 NVQ Diploma in Management and Leadership",
  "ProQual Level 3 Award in Assessing Competence in the Work Environment",
  "ProQual Level 4 Award in the Internal Quality Assurance of Assessment Processes and Practice",
  "ProQual Level 3 Award in Introduction to Crime Prevention",
  "ProQual Level 5 Diploma in Crime Prevention & Designing Out Crime"
];
const FileList: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [files, setFiles] = useState<string[]>([]);
  const [filesFiltered, setFilesFiltered] = useState<string[]>([]);
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
  useEffect(() => {
    if (search.length > 0) {
      const filtered = files.filter(e => e.toUpperCase().indexOf(search.toUpperCase()) >= 0 )
      setFilesFiltered(filtered) 
    } else {
      setFilesFiltered(files) 
    }
  }, [files, search]);

  return (
    <div className="m-auto bg-emerald-300 p-10 flex flex-col gap-2 text-center min-h-[80vh]">
      <div className="text-start"><b>List of Workbooks:</b></div>
      <Input className="bg-white" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} ></Input>
      <p>
        {search.length >0 ?
          <span className="text-sm">Searching for: {search}</span> :
          <span className="text-sm">Showing All</span> 
        }
      </p>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {filesFiltered.map((file, index) => (
            <div className="flex flex-col" key={'workbook'+index}>
              <Button onClick={() => router.push("/view?url=/api/download/" + encodeURIComponent(file))}>
                <span className="overflow-hidden text-ellipsis">{file.replaceAll('.2workbook', '')}</span>
              </Button>
              {/* <a href={'/api/download/' + encodeURIComponent(file)} download>
                <Button ><Download/></Button>
              </a> */}
            </div>
          ))}
          <div className="text-start pt-5 "><b>SOON:</b></div>
          {
              proQualCourses.map((el, index) => (
                <div className="flex flex-row" key={'workbook'+index}>
                  <Button  style={{width: '75%'}} disabled>
                    <span className="overflow-hidden text-ellipsis">{el}</span>
                  </Button>
                  <div style={{width: '25%'}}>
                    <Button disabled><Download/></Button>
                  </div>
                </div>
              ))
            }
        </>
      )}
    </div>
  );
};

export default FileList;
