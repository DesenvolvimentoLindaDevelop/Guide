import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/sidebar";
import AuthGuard from "@/components/authGuard/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guide",
  description: "Guide",
};

export default function AuthedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <Sidebar />
      {children}
    </AuthGuard>
  );
}
