import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"

export function InfoGDrive() {
  return (
    <Tabs defaultValue="account" >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Open With</TabsTrigger>
        <TabsTrigger value="password">Get Link</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Open With</CardTitle>
            <CardDescription>
              “Click on &quot;Open with&quot; and select 2workbook from the list to open the workbook.”
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Image className="m-auto" src={'/images/OpenWith.png'} width={'720'} height={'22'} alt="OpenWithImage" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Get Link</CardTitle>
            <CardDescription>
              “Click on &quot;Share&quot; and &quot;Get Link&quot;. Paste the link on 2workbook homepage an click in &quot;Open&quot;.”
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Image className="m-auto" src={'/images/GetLink.png'} width={'720'} height={'22'} alt="OpenWithImage" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
