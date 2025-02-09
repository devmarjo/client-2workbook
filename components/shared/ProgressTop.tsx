import { useFile } from "@/hooks/useFile";
import { Progress } from "../ui/progress";


export function ProgressTop() {
  const { progress } = useFile()
  return (
    <div>
      <div className="text-center text-sm"><b>{progress}% Complete</b></div>
      <Progress value={progress} className="w-[100%]" />
    </div>
  )
}