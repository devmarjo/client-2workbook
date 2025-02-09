"use client";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "../ui/button"
import { Printer, Menu, X, ChevronsUpDown } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { SaveButton } from "./SaveButton";
import { ProgressTop } from "./ProgressTop";
import { Instructions } from "./menubar/Instructions";
import { useEffect, useState } from "react";
import { WorkbookSection, WorkbookUnit } from "@/utils/2workbookI";
import { UnitStateI, useFile } from "@/hooks/useFile";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import Image from "next/image";


export function EditorNavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const {workbook, unitsState} = useFile();
    const [sections, setSections] = useState<WorkbookSection[]>([])
    const [units, setUnits] = useState<UnitStateI>({})
    useEffect(() => {
      if (workbook) {
        setSections(workbook.sections)
      }
      if (unitsState) {
        setUnits(unitsState)
      }
    }, [workbook, unitsState])
  return (
    <div style={{position: 'fixed' , width: '100vw', top: '20px', zIndex: 30}} className="no-print" >  
      <Menubar style={{height: '3.5em', width: '80vw', margin: 'auto' }} className="w-full flex justify-between items-center px-4 py-2 border-b shadow-sm bg-white">
        <Image className="lg:hidden" src="/images/2workbook32.jpg" width={32} height={32} alt={'2W'} />
        <Image className="hidden lg:block" src="/images/2workbook.png" width={150} height={32} alt={'2W'} />
        <div className="px-2" style={{maxWidth: '30vw', width: '200px'}}>
          <ProgressTop />
        </div>
        <div className="hidden md:flex gap-2">
          <MenubarMenu>
            <a href="#start">
              <Button variant="ghost">Start </Button>
            </a>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Instructions</MenubarTrigger>
            <MenubarContent>      
              {
                sections.map((section, index) => {
                  return (
                    <a href={"#" +  encodeURI(section.title)} key={`SectionTopMenuBarItem`+ index}>
                      <MenubarItem >
                        {section.title}
                      </MenubarItem>
                    </a>
                  )
                })
              }
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Units</MenubarTrigger>
            <MenubarContent>      
              {
                Object.entries(units).map(([k, v]) => {
                  return (
                    <a href={"#" + k} key={`SectionTopMenuBarItem`+ k}>
                      <MenubarItem className={`${v && 'bg-green-200'}`} >
                        {k}
                      </MenubarItem>
                    </a>
                  )
                })
              }
            </MenubarContent>
          </MenubarMenu>
          <Button variant={'secondary'}><Printer/>Print</Button>
          <SaveButton/>
        </div>
        <div className="md:hidden gap-2">
          {/* <EditorSheetMenu/> */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline"><Menu/> </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Button variant={'secondary'}><Printer/>Print</Button>
                <SaveButton/>
              </div>

              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className=""
              >
                <div className="grid gap-4 pt-4">
                  <CollapsibleTrigger asChild>
                    <Button variant={"outline"}>Instructions<ChevronsUpDown className="h-4 w-4" /></Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent >
                  <div className="grid gap-4 p-4 bg-gray-100">
                    {
                      sections.map((section, index) => {
                        return (
                          <a href={"#" +  encodeURI(section.title)} key={`SectionTopMenuBarItem`+ index}>
                            <SheetClose asChild>
                              <Button style={{width: '100%'}} variant={"outline"}>{section.title}</Button>
                            </SheetClose>
                          </a>
                        )
                      })
                    }
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible
                open={isOpen2}
                onOpenChange={setIsOpen2}
                className=""
              >
                <div className="grid gap-4 pt-4">
                  <CollapsibleTrigger asChild>
                    <Button variant={"outline"}>Units<ChevronsUpDown className="h-4 w-4" /></Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent >
                  <div className="grid gap-4 p-4 bg-gray-100">    
                    {
                      Object.entries(units).map(([k, v]) => {
                        return (
                          <a href={"#" + k} key={`SectionTopMenuBarItem`+ k}>
                            <SheetClose asChild>
                              <Button className={`${v && 'bg-green-200'}`} style={{width: '100%'}} variant={"outline"}>{k}</Button>
                            </SheetClose>
                          </a>
                        )
                      })
                    }
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant={'ghost'}><X/> Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </Menubar>
    </div>

  )
}
