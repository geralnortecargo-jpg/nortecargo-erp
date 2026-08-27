'use client';

import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1f2937',
      color: '#ffffff',
      position: 'relative',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '100%',
      zIndex: 1000
    }}>
      <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>NorteCargo</div>

      {/* Links Normais (Escondidos via CSS Global/Média ou visíveis no desktop) */}
      <div className="desktop-links" style={{
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center',
      }}>
        <a href="#home" style={{ color: '#fff', textDecoration: 'none' }}>Início</a>
        <a href="#services" style={{ color: '#fff', textDecoration: 'none' }}>Serviços</a>
        <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>Contacto</a>
      </div>

      {/* Botão Hambúrguer (Sempre visível para testes, depois filtramos se necessário) */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '1.8rem',
          cursor: 'pointer',
          padding: '0.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Menu Dropdown Telemóvel (Renderizado condicionalmente pelo Estado do React) */}
      {mobileMenuOpen && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          backgroundColor: '#1f2937',
          padding: '1.5rem 2rem',
          gap: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          borderTop: '1px solid #374151',
          zIndex: 1001
        }}>
          <a href="#home" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }} onClick={() => setMobileMenuOpen(false)}>Início</a>
          <a href="#services" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }} onClick={() => setMobileMenuOpen(false)}>Serviços</a>
          <a href="#contact" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }} onClick={() => setMobileMenuOpen(false)}>Contacto</a>
        </div>
      )}
    </nav>
  );
}