import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import { Inter } from 'next/font/google'
import "./globals.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "TimeTable",
  description: "Created to help students manage their class schedules",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} `}>
        <Navbar/>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
