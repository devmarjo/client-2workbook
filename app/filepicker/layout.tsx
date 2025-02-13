import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <div className="mt-[10vh] print:mt-0" > 
        {children}
      </div>
    </Suspense>    
      
  );
}
