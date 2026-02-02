import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DuNort | Mix de Nuts Premium Personalizado",
  description: "Monte seu mix de castanhas, amêndoas, sementes e frutas secas do seu jeito. Personalizado grão a grão, entregue na sua porta.",
  keywords: ["mix de nuts", "castanhas", "amêndoas", "sementes", "frutas secas", "saudável", "personalizado"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} `}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased light relative`}
        suppressHydrationWarning
      >
        <Navbar />
        <div className="w-full min-h-screen">{children}</div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
