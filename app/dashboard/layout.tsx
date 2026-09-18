'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: '📊 Painel Geral', href: '/dashboard' },
    { label: '💸 Lançamentos', href: '/dashboard/lancamentos' },
    { label: '👥 Gestão de Clientes', href: '/dashboard/clientes' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* CABEÇALHO MOBILE */}
      {isMobile && (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: '#1e293b', borderBottom: '1px solid #334155', position: 'sticky', top: 0, zIndex: 1000 }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#38bdf8', margin: 0 }}>NorteCargo</h2>
            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>Gestão Interna</p>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ backgroundColor: '#334155', color: '#ffffff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </header>
      )}

      {/* MENU LATERAL / MOBILE DROPDOWN */}
      {(!isMobile || mobileMenuOpen) && (
        <aside
          style={{
            width: isMobile ? '100%' : '260px',
            backgroundColor: '#1e293b',
            borderRight: isMobile ? 'none' : '1px solid #334155',
            borderBottom: isMobile ? '1px solid #334155' : 'none',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flexShrink: 0,
            position: isMobile ? 'static' : 'sticky',
            top: 0,
            height: isMobile ? 'auto' : '100vh',
            boxSizing: 'border-box',
          }}
        >
          {!isMobile && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#38bdf8', margin: 0 }}>NorteCargo</h2>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>Sistema de Gestão Interna</p>
            </div>
          )}

          {/* NAVEGAÇÃO */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobile && setMobileMenuOpen(false)}
                  style={{
                    backgroundColor: isActive ? '#0284c7' : 'transparent',
                    color: isActive ? '#ffffff' : '#cbd5e1',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    fontSize: '15px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* RODAPÉ DA SIDEBAR */}
          <div style={{ marginTop: isMobile ? '10px' : 'auto', borderTop: '1px solid #334155', paddingTop: '16px' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Sessão Ativa:</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc', marginTop: '2px' }}>Administrador</div>
          </div>
        </aside>
      )}

      {/* CONTEÚDO DA PÁGINA ATIVA */}
      <main style={{ flex: 1, padding: isMobile ? '16px' : '32px', width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
        {children}
      </main>

    </div>
  );
}