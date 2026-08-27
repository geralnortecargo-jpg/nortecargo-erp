'use client';

import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">NorteCargo</div>

      {/* Links para Computador */}
      <div className="nav-links-desktop">
        <a href="#home">Início</a>
        <a href="#services">Serviços</a>
        <a href="#contact">Contacto</a>
      </div>

      {/* Botão Hambúrguer para Telemóvel */}
      <button 
        className="hamburger-button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Menu"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Menu Dropdown do Telemóvel */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>Início</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Serviços</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contacto</a>
        </div>
      )}
    </nav>
  );
}