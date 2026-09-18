import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "NorteCargo - Mudanças e Transportes",
  description: "Transportes e Logística Nacional e Internacional",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" style={{ width: '100%', overflowX: 'hidden' }}>
      <body style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc' }}>
        <Navbar />
        <main style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box' }}>
          {children}
        </main>
      </body>
    </html>
  );
}