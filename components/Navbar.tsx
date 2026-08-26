'use client';

import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ width: '100%', backgroundColor: '#ffffff', borderBottom: '1px solid #cbd5e1', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* LOGO */}
        <a href="/" style={{ textDecoration: 'none', fontSize: '26px', fontWeight: '900', color: '#0f2b5c' }}>
          NORTE<span style={{ color: '#16a34a' }}>CARGO</span>
        </a>

        {/* BOTÃO HAMBÚRGUER (Visível apenas em mobile) */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: '#0f2b5c',
            padding: '4px',
            display: 'block', // Em CSS puro para garantir que aparece no telemóvel
          }}
          aria-label="Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* MENU MOBILE EXPANSÍVEL (Aparece por baixo em bloco quando clicado) */}
      {mobileMenuOpen && (
        <nav style={{
          backgroundColor: '#ffffff',
          width: '100%',
          padding: '20px',
          borderBottom: '2px solid #cbd5e1',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
        }}>
          <a href="/" style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }} onClick={() => setMobileMenuOpen(false)}>Início</a>
          <a href="/servicos" style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }} onClick={() => setMobileMenuOpen(false)}>Serviços</a>
          <a href="/agendamento" style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }} onClick={() => setMobileMenuOpen(false)}>Agendamento</a>
          <a href="/contactos" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }} onClick={() => setMobileMenuOpen(false)}>Contacto</a>
        </nav>
      )}
    </header>
  );
}