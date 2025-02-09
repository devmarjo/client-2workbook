import { useFile } from "@/hooks/useFile";
import { Button } from "../ui/button";
import { Save } from "lucide-react";

export function SaveButton() {
  const {saveWorkbook} = useFile()
  return(
    <Button onClick={saveWorkbook}> <Save/> Save</Button>
  )
}
