import type { Metadata } from "next";

import "./globals.css";
import Footer from "@/components/Footer/Footer";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className="antialiased flex flex-col min-h-screen"
      >

        {children}

        <Footer/>
      </body>
    </html>
  );
}
