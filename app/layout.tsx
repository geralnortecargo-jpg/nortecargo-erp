import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar'; // Ajusta o caminho se necessário

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
    <html lang="pt">
      <body style={{ margin: 0, padding: 0 }}>
        {/* Navbar Global Unificada */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}