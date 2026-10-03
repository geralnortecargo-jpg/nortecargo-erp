'use client';

import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header>
      <div style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', padding: '8px 16px', fontSize: '13px', color: '#64748b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span>Orçamentos: <strong style={{ color: '#0f172a' }}>965 531 009</strong></span>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <a href="mailto:Geral@nortecargo.pt" style={{ color: '#16a34a', fontWeight: 'bold', textDecoration: 'none' }}>Geral@nortecargo.pt</a>
          </div>
          {mounted && !isMobile && (
            <div style={{ color: '#64748b', fontWeight: 500 }}>
              Transportes Nacionais e Internacionais
            </div>
          )}
        </div>
      </div>

      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative', zIndex: 1000 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <a href="#home" style={{ textDecoration: 'none', fontSize: '24px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px' }}>
            NORTE<span style={{ color: '#1e3a8a' }}>CARGO</span>
          </a>

          {mounted && !isMobile && (
            <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
              <a href="#home" style={styles.navLink}>Início</a>
              <a href="#empresas" style={styles.navLink}>Empresas</a>
              <a href="#servicos" style={styles.navLink}>Serviços</a>
              <a href="#agendamento" style={styles.navLink}>Agendamento</a>
              <a href="#contacto" style={styles.navLink}>Contacto</a>
            </div>
          )}

          {mounted && isMobile && (
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#0f172a',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>

        {mounted && isMobile && mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            padding: '12px 20px 20px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            zIndex: 999
          }}>
            <a href="#home" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Início</a>
            <a href="#empresas" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Empresas</a>
            <a href="#servicos" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Serviços</a>
            <a href="#agendamento" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Agendamento</a>
            <a href="#contacto" style={{ ...styles.mobileNavLink, borderBottom: 'none' }} onClick={() => setMobileMenuOpen(false)}>Contacto</a>
          </div>
        )}
      </nav>
    </header>
  );
}

const styles = {
  navLink: {
    color: '#334155',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '15px',
    transition: 'color 0.2s',
  },
  mobileNavLink: {
    color: '#0f172a',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '16px',
    padding: '12px 0',
    borderBottom: '1px solid #f1f5f9',
    display: 'block',
  }
};