'use client';

import React, { useState, useEffect } from 'react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Deteta automaticamente se o ecra e mobile/telemovel
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Executa ao carregar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1e293b', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* 1. BARRA SUPERIOR DE CONTACTOS */}
      <div style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', padding: '8px 16px', fontSize: '13px', color: '#64748b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span>Orçamentos: <strong style={{ color: '#0f172a' }}>965 531 009</strong></span>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <a href="mailto:Geral@nortecargo.pt" style={{ color: '#16a34a', fontWeight: 'bold', textDecoration: 'none' }}>Geral@nortecargo.pt</a>
          </div>
          {!isMobile && (
            <div style={{ color: '#64748b', fontWeight: 500 }}>
              Transportes Nacionais e Internacionais
            </div>
          )}
        </div>
      </div>

      {/* 2. NAVBAR PRINCIPAL */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative', zIndex: 1000 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* LOGO NORTECARGO */}
          <a href="#home" style={{ textDecoration: 'none', fontSize: '24px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px' }}>
            NORTE<span style={{ color: '#1e3a8a' }}>CARGO</span>
          </a>

          {/* LINKS DE DESKTOP (SÓ APARECEM SE NÃO FOR MOBILE) */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
              <a href="#home" style={styles.navLink}>Início</a>
              <a href="#empresas" style={styles.navLink}>Empresas</a>
              <a href="#servicos" style={styles.navLink}>Serviços</a>
              <a href="#agendamento" style={styles.navLink}>Agendamento</a>
              <a href="#contacto" style={styles.navLink}>Contacto</a>
            </div>
          )}

          {/* BOTÃO HAMBÚRGUER (SÓ APARECE SE FOR MOBILE) */}
          {isMobile && (
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
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>

        {/* MENU DROPDOWN MOBILE (ABRE AO CLICAR NO TELEMÓVEL) */}
        {isMobile && mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            zIndex: 999
          }}>
            <a href="#home" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Início</a>
            <a href="#empresas" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Empresas</a>
            <a href="#servicos" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Serviços</a>
            <a href="#agendamento" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Agendamento</a>
            <a href="#contacto" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Contacto</a>
          </div>
        )}
      </nav>

      {/* CONTEÚDO PRINCIPAL DA PÁGINA */}
      <section id="home" style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: '800', color: '#0f172a', margin: '0 0 16px 0', lineHeight: 1.2 }}>
          Transportes e Mudanças com Rigor
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', margin: 0 }}>
          Soluções completas de mudanças em todo o país.
        </p>
      </section>

    </div>
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
    padding: '8px 0',
    borderBottom: '1px solid #f1f5f9',
  }
};