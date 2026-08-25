'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: '📊 Painel Geral', href: '/dashboard' },
    { label: '💸 Lançamentos', href: '/dashboard/lancamentos' },
    { label: '👥 Gestão de Clientes', href: '/dashboard/clientes' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* MENU LATERAL FIXO (SIDEBAR) */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#1e293b',
          borderRight: '1px solid #334155',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#38bdf8', margin: 0 }}>NorteCargo</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>Sistema de Gestão Interna</p>
        </div>

        {/* NAVEGAÇÃO */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  backgroundColor: isActive ? '#0284c7' : 'transparent',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  fontSize: '16px',
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
        <div style={{ marginTop: 'auto', borderTop: '1px solid #334155', paddingTop: '16px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Sessão Ativa:</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc', marginTop: '2px' }}>Administrador</div>
        </div>
      </aside>

      {/* CONTEÚDO DA PÁGINA ATIVA */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </div>

    </div>
  );
}