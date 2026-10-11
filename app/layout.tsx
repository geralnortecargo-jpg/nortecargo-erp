import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NorteCargo - Transportes e Mudanças',
  description: 'Soluções completas de mudanças e logística em todo o país.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}