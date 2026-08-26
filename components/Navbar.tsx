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
      <style jsx>{`
        .desktop-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          color: #fff;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .mobile-dropdown {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-links {
            display: none !important;
          }
          .hamburger-btn {
            display: block !important;
          }
          .mobile-dropdown {
            display: ${mobileMenuOpen ? 'flex' : 'none'} !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: #1f2937;
            padding: 1.5rem 2rem;
            gap: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            border-top: 1px solid #374151;
          }
        }
      `}</style>

      <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>NorteCargo</div>

      {/* Links no PC */}
      <div className="desktop-links">
        <a href="#home" style={{ color: '#fff', textDecoration: 'none' }}>Início</a>
        <a href="#services" style={{ color: '#fff', textDecoration: 'none' }}>Serviços</a>
        <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>Contacto</a>
      </div>

      {/* Botão Hambúrguer Telemóvel */}
      <button 
        className="hamburger-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Menu Dropdown Telemóvel */}
      <div className="mobile-dropdown">
        <a href="#home" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>Início</a>
        <a href="#services" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>Serviços</a>
        <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>Contacto</a>
      </div>
    </nav>
  );
}