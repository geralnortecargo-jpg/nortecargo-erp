'use client';

import React from 'react';

export default function Navbar() {
  return (
    <header style={{ width: '100%', backgroundColor: '#ffffff', borderBottom: '1px solid #cbd5e1' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <a href="/" style={{ textDecoration: 'none', fontSize: '28px', fontWeight: '900', color: '#0f2b5c' }}>
          NORTE<span style={{ color: '#16a34a' }}>CARGO</span>
        </a>

        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="/" style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold' }}>Início</a>
          <a href="/servicos" style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold' }}>Serviços</a>
          <a href="/agendamento" style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold' }}>Agendamento</a>
          <a href="/contactos" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: 'bold' }}>Contacto</a>
        </nav>

      </div>
    </header>
  );
}'use client';

import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ width: '100%', backgroundColor: '#ffffff', borderBottom: '1px solid #cbd5e1', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        
        <a href="/" style={{ textDecoration: 'none', fontSize: '26px', fontWeight: '900', color: '#0f2b5c' }}>
          NORTE<span style={{ color: '#16a34a' }}>CARGO</span>
        </a>

        {/* Botão Hambúrguer para Mobile */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'block',
            background: 'none',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: '#0f2b5c',
            padding: '4px',
            '@media (min-width: 768px)': {
              display: 'none',
            }
          }}
          aria-label="Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Links de Navegação (Desktop e Mobile Toggle) */}
        <nav style={{
          display: mobileMenuOpen ? 'flex' : 'none',
          flexDirection: mobileMenuOpen ? 'column' : 'row',
          position: mobileMenuOpen ? 'absolute' : 'static',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          padding: mobileMenuOpen ? '20px' : '0',
          borderBottom: mobileMenuOpen ? '1px solid #cbd5e1' : 'none',
          boxShadow: mobileMenuOpen ? '0 10px 15px rgba(0,0,0,0.1)' : 'none',
          gap: mobileMenuOpen ? '16px' : '30px',
          alignItems: mobileMenuOpen ? 'flex-start' : 'center',
          zIndex: 200,
        }}>
          <a href="/" style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }} onClick={() => setMobileMenuOpen(false)}>Início</a>
          <a href="/servicos" style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }} onClick={() => setMobileMenuOpen(false)}>Serviços</a>
          <a href="/agendamento" style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }} onClick={() => setMobileMenuOpen(false)}>Agendamento</a>
          <a href="/contactos" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }} onClick={() => setMobileMenuOpen(false)}>Contacto</a>
        </nav>

      </div>
    </header>
  );
}