import { AuthProvider } from "@/hooks/useAuth";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <AuthProvider>
        <div className="mt-[10vh] print:mt-0" > 
          {children}
        </div>
      </AuthProvider>
        
    </Suspense>    
      
  );
}
