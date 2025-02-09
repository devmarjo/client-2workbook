import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Printer, Save } from "lucide-react"

export function EditorSheetMenu() {
  return (
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
          <Button variant={'secondary'}><Save/>Print</Button>
          <Button> <Printer/> Save</Button>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={'ghost'}>close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
