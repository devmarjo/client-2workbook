import { EditorNavBar } from "@/components/shared/editorNavbar";
import { AuthProvider } from "@/hooks/useAuth";
import { FileProvider } from "@/hooks/useFile";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Suspense>
      <AuthProvider>
        <FileProvider viewer={false}>
          <EditorNavBar/>
          <div className="mt-[10vh] print:mt-0" > 
            {children}
          </div>
        </FileProvider>
      </AuthProvider>
    </Suspense>
  );
}
