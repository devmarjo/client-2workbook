
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-[10vh] print:mt-0" > 
      {children}
    </div>
  );
}
