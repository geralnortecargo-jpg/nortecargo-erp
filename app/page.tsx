'use client';

import React, { useState } from 'react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', color: '#1f2937', fontFamily: 'Arial, sans-serif' }}>
      
      {/* NAVBAR */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        backgroundColor: '#ffffff',
        position: 'relative',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        {/* LOGO / INFO TOPO */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Orçamentos: 965 531 009</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#16a34a' }}>Geral@nortecargo.pt</span>
        </div>

        {/* ESTILOS RESPONSIVOS DIRETOS */}
        <style jsx>{`
          .nav-links {
            display: flex;
            gap: 1.5rem;
            align-items: center;
          }
          .hamburger-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.8rem;
            cursor: pointer;
            color: #1f2937;
          }
          .mobile-menu-dropdown {
            display: none;
          }

          @media (max-width: 768px) {
            .nav-links {
              display: none !important;
            }
            .hamburger-btn {
              display: block !important;
            }
            .mobile-menu-dropdown {
              display: ${mobileMenuOpen ? 'flex' : 'none'} !important;
              flex-direction: column;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background-color: #ffffff;
              padding: 1.5rem;
              gap: 1rem;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
              border-top: 1px solid #e5e7eb;
              z-index: 1000;
            }
          }
        `}</style>

        {/* LINKS DE DESKTOP */}
        <div className="nav-links">
          <a href="#home" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 500 }}>Início</a>
          <a href="#empresas" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 500 }}>Empresas</a>
          <a href="#servicos" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 500 }}>Serviços</a>
          <a href="#agendamento" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 500 }}>Agendamento</a>
          <a href="#contacto" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 500 }}>Contacto</a>
        </div>

        {/* BOTÃO HAMBÚRGUER (MOBILE) */}
        <button 
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* MENU DROPDOWN MOBILE */}
        <div className="mobile-menu-dropdown">
          <a href="#home" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '1.1rem' }} onClick={() => setMobileMenuOpen(false)}>Início</a>
          <a href="#empresas" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '1.1rem' }} onClick={() => setMobileMenuOpen(false)}>Empresas</a>
          <a href="#servicos" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '1.1rem' }} onClick={() => setMobileMenuOpen(false)}>Serviços</a>
          <a href="#agendamento" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '1.1rem' }} onClick={() => setMobileMenuOpen(false)}>Agendamento</a>
          <a href="#contacto" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '1.1rem' }} onClick={() => setMobileMenuOpen(false)}>Contacto</a>
        </div>
      </nav>

      {/* CONTEÚDO */}
      <section style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Transportes e Mudanças com Rigor</h1>
        <p style={{ marginTop: '1rem', color: '#4b5563' }}>Soluções completas de mudanças em todo o país.</p>
      </section>

    </div>
  );
}