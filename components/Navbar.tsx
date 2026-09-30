'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Topbar com contactos */}
      <div style={{ backgroundColor: '#0f172a', color: '#94a3b8', fontSize: '13px', padding: '6px 16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span>Orçamentos: <strong>965 531 009</strong> | Geral@nortecargo.pt</span>
          <span>Transportes Nacionais e Internacionais</span>
        </div>
      </div>

      {/* Barra Principal */}
      <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', textDecoration: 'none' }}>
          NORTECARGO
        </Link>

        {/* Links Desktop (Ocultos em ecrãs pequenos via CSS inline básico) */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="/" style={linkStyle}>Início</Link>
          <Link href="/empresas" style={linkStyle}>Empresas</Link>
          <Link href="/servicos" style={linkStyle}>Serviços</Link>
          <Link href="/agendamento" style={linkStyle}>Agendamento</Link>
          <Link href="/contacto" style={linkStyle}>Contacto</Link>
        </div>

        {/* Botão Hambúrguer Mobile */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir Menu"
          className="mobile-btn"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '4px 8px',
            color: '#0f172a'
          }}
        >
          {menuAberto ? '✕' : '☰'}
        </button>
      </nav>

      {/* Menu Dropdown Mobile */}
      {menuAberto && (
        <div style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link href="/" onClick={() => setMenuAberto(false)} style={mobileLinkStyle}>Início</Link>
          <Link href="/empresas" onClick={() => setMenuAberto(false)} style={mobileLinkStyle}>Empresas</Link>
          <Link href="/servicos" onClick={() => setMenuAberto(false)} style={mobileLinkStyle}>Serviços</Link>
          <Link href="/agendamento" onClick={() => setMenuAberto(false)} style={mobileLinkStyle}>Agendamento</Link>
          <Link href="/contacto" onClick={() => setMenuAberto(false)} style={mobileLinkStyle}>Contacto</Link>
        </div>
      )}

      {/* Regra CSS rápida para alternar entre Desktop e Mobile sem depender de classes compiladas */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .desktop-menu { display: flex !important; }
          .mobile-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}

const linkStyle: React.CSSProperties = { color: '#334155', textDecoration: 'none', fontWeight: 600, fontSize: '15px' };
const mobileLinkStyle: React.CSSProperties = { color: '#0f172a', textDecoration: 'none', fontWeight: 700, fontSize: '16px', padding: '8px 0' };