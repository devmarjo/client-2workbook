import * as React from "react"

import { useMediaQuery } from "@custom-react-hooks/use-media-query"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Image from "next/image"
import { InfoGDrive } from "./InfoGDrive"

export function DialogGDrive() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>
            <span>Open in</span>
            <Image className="cursor-pointer" src={'images/google-drive.svg'} width={'64'} height={'64'} alt='GoogleDrive' />
          </div>
        </DialogTrigger>
        <DialogContent className="w-[90vw] min-w-[70vw]">
          <DialogHeader>
            <DialogTitle>How to Open Workbook</DialogTitle>
          </DialogHeader>
          <InfoGDrive />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div>
          <span>Open in</span>
          <Image className="cursor-pointer" src={'images/google-drive.svg'} width={'64'} height={'64'} alt='GoogleDrive' />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>How to Open Workbook</DrawerTitle>
        </DrawerHeader>
        <InfoGDrive />
      </DrawerContent>
    </Drawer>
  )
}
