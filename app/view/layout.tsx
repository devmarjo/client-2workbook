import { ViewNavBar } from "@/components/shared/viewNavbar";
import { FileProvider } from "@/hooks/useFile";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <FileProvider viewer={true}>
        <ViewNavBar/>
        <div className="mt-[10vh] print:mt-0" > 
          {children}
        </div>
      </FileProvider>
    </Suspense>
  );
}
