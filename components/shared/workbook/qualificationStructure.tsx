"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFile } from "@/hooks/useFile";
import { WorkbookI } from "@/utils/2workbookI";
import { toast } from "sonner";

export function QualificationStructure() {
  const {workbook, setWorkbook, saveWorkbook} = useFile()
  const onCheckedChange = (state: boolean | string, index: number, unit: string)  => {
    if (workbook) {
      const opUnits = workbook.unitsOptional.map(el => el)  
      if (opUnits[index]) {
        if (state) {
          if (opUnits[index].selected.length < opUnits[index].qtyRequired) {
            opUnits[index].selected.push(unit)
            opUnits[index].selected = [...new Set(opUnits[index].selected)]
          } else {
            return toast('The required quantity is ' + opUnits[index].qtyRequired + ' Unit(s)' )
          }
        } else {
          console.log(opUnits[index].selected,unit)
          opUnits[index].selected = opUnits[index].selected.filter(el => el !== unit)
          console.log(opUnits[index].selected)
        }
      }
      const newWorbook: WorkbookI = { ...workbook, unitsOptional: opUnits }
      setWorkbook(newWorbook)
      saveWorkbook()
    }
  }
  return(
    <div className="pt-10 px-3 md:px-10 no-page-break ">
      <div className="text-emerald-600 text-4xl font-extrabold pb-5">Qualification Structure</div>
      <Table>
        <TableCaption>------Qualification Structure------</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Unit</TableHead>
            <TableHead>Title</TableHead>
            {
              workbook?.unitsColumnsData.map(el => <TableHead key={'QS'+el}>{el}</TableHead> )
            }
          </TableRow>
        </TableHeader>
          {
            workbook?.unitsMandatory.map((el, i) => {
              return (
                <TableBody key={'unitsMadatoryGroupHeader' + i}>
                  <TableRow>
                    <TableCell colSpan={workbook?.unitsColumnsData.length + 2} className="font-medium text-center text-xl"><b>{el.groupName}</b></TableCell>
                  </TableRow>
                  {
                    el.units.filter(el2 => el2 in workbook?.units).map((el2) => 
                      <TableRow key={'unitsMadatoryGroupBody' + el2}>
                        <TableCell className="font-medium">{el2}</TableCell>
                        <TableCell className="font-medium">
                          {workbook?.units[el2]?.title}
                        </TableCell>
                        {
                          workbook?.units[el2]?.data.map((data, i3) => <TableCell key={'TC' + i + el2 + i3} className="font-medium">{data}</TableCell> )
                        }
                        
                      </TableRow>
                    )
                  }
                </TableBody>
              )
            } )
          }

          {
            workbook?.unitsOptional.map((el, i) => {
              return (
                <TableBody key={'unitsMadatoryGroupHeader' + i}>
                  <TableRow>
                    <TableCell colSpan={workbook?.unitsColumnsData.length + 2} className="font-medium text-center text-xl pt-5"><b>{el.groupName}</b></TableCell>
                  </TableRow>
                  {
                    el.units.filter(el2 => el2 in workbook?.units).map((el2) => 
                      <TableRow key={'unitsMadatoryGroupBody' + el2}>
                        <TableCell className="font-medium">
                          <Checkbox checked={el.selected.includes(el2)} onCheckedChange={(state) => onCheckedChange(state, i, el2) } /> 
                          <Label className="pl-2 ">
                            {el2}
                          </Label>
                        </TableCell>
                        <TableCell className="font-medium">
                          {workbook?.units[el2]?.title}
                        </TableCell>
                        {
                          workbook?.units[el2]?.data.map((data, i3) => <TableCell key={'TC' + i + el2 + i3} className="font-medium">{data}</TableCell> )
                        }
                        
                      </TableRow>
                    )
                  }
                </TableBody>
              )
            } )
          }
      </Table>
    </div>
  )
}