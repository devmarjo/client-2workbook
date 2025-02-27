import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFile } from "@/hooks/useFile";
import { WorkbookGroup } from "@/utils/2workbookI";
import { useEffect, useState } from "react";

export function QualificationStructure() {
  const {workbook, setWorkbook} = useFile()
  const [unitsOptional, setUnitsOptional] = useState<WorkbookGroup[]>([])
  useEffect(() => {
    if (workbook) {
      console.log('efec')
      setUnitsOptional(workbook.unitsOptional) 
    } else {
      setUnitsOptional([]) 
    }
  }, [workbook])
  const onCheckedChange = (state: boolean, index: number, unit: string)  => {
    if (workbook) {
      if (unitsOptional?.[index]) {
        if (state) {
          if (unitsOptional[index].selected.length < unitsOptional[index].qtyRequired) {
            unitsOptional[index].selected.push(unit)
            unitsOptional[index].selected = [...new Set(unitsOptional[index].selected)]
          }
        } else {
          unitsOptional[index].selected = unitsOptional[index].selected.filter(el => el === unit)
        }
      }
      workbook.unitsOptional = unitsOptional
      setWorkbook(workbook)
    }
  }
  return(
    <div className="pt-10 px-3 md:px-10 ">
      <div className="text-emerald-600 text-4xl font-extrabold pb-5">Qualification Structure</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>UNIT</TableHead>
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
                    <TableCell colSpan={workbook?.unitsColumnsData.length + 1} className="font-medium text-center text-xl"><b>{el.groupName}</b></TableCell>
                  </TableRow>
                  {
                    el.units.filter(el2 => el2 in workbook?.units).map((el2) => 
                      <TableRow key={'unitsMadatoryGroupBody' + el2}>
                        <TableCell className="font-medium">{el2}</TableCell>
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
                    <TableCell colSpan={workbook?.unitsColumnsData.length + 1} className="font-medium text-center text-xl pt-5"><b>{el.groupName}</b></TableCell>
                  </TableRow>
                  {
                    el.units.filter(el2 => el2 in workbook?.units).map((el2) => 
                      <TableRow key={'unitsMadatoryGroupBody' + el2}>
                        <TableCell className="font-medium">
                          <Checkbox checked={el.selected.includes(el2)} onCheckedChange={(state) => onCheckedChange(Boolean(state), i, el2) } /> 
                          <Label className="pl-2 ">
                            {el2}
                          </Label>
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
      AKI
    </div>
  )
}