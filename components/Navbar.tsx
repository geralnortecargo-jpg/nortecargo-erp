'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header style={styles.header}>
      {/* BARRA SUPERIOR DE CONTACTOS / INFO */}
      <div style={styles.topBar}>
        <div style={styles.topBarContainer}>
          <span>
            Orçamentos: <strong>965 531 009</strong> | Geral@nortecargo.pt
          </span>
          <span className="hidden-mobile">
            Transportes Nacionais e Internacionais
          </span>
        </div>
      </div>

      {/* NAVEGAÇÃO PRINCIPAL */}
      <nav style={styles.navContainer}>
        {/* LOGÓTIPO */}
        <Link href="/" style={styles.logoLink} onClick={closeMobileMenu}>
          <span style={styles.logoText}>
            NORTE<span style={styles.logoHighlight}>CARGO</span>
          </span>
        </Link>

        {/* LINKS DESKTOP (Escondidos em mobile via CSS em globals.css) */}
        <ul style={styles.desktopMenu} className="nav-links">
          <li><Link href="/" style={styles.navLink}>Início</Link></li>
          <li><Link href="/servicos" style={styles.navLink}>Serviços</Link></li>
          <li><Link href="/agendamento" style={styles.navLink}>Orçamento</Link></li>
          <li><Link href="/grupagem" style={styles.navLink}>Grupagem</Link></li>
          <li><Link href="/historia" style={styles.navLink}>História</Link></li>
          <li><Link href="/contactos" style={styles.navLink}>Contacto</Link></li>
        </ul>

        {/* BOTÃO HAMBÚRGUER MOBILE */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          style={styles.mobileMenuButton}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* MENU DESPLEGÁVEL MOBILE */}
      {isMobileMenuOpen && (
        <div style={styles.mobileDropdown}>
          <ul style={styles.mobileMenuList}>
            <li>
              <Link href="/" style={styles.mobileNavLink} onClick={closeMobileMenu}>
                Início
              </Link>
            </li>
            <li>
              <Link href="/servicos" style={styles.mobileNavLink} onClick={closeMobileMenu}>
                Serviços
              </Link>
            </li>
            <li>
              <Link href="/agendamento" style={styles.mobileNavLink} onClick={closeMobileMenu}>
                Orçamento
              </Link>
            </li>
            <li>
              <Link href="/grupagem" style={styles.mobileNavLink} onClick={closeMobileMenu}>
                Grupagem
              </Link>
            </li>
            <li>
              <Link href="/historia" style={styles.mobileNavLink} onClick={closeMobileMenu}>
                História
              </Link>
            </li>
            <li>
              <Link href="/contactos" style={styles.mobileNavLink} onClick={closeMobileMenu}>
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  topBar: {
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    fontSize: '12px',
    padding: '6px 16px',
  },
  topBarContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '12px 20px',
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
  },
  logoLink: {
    textDecoration: 'none',
  },
  logoText: {
    fontSize: '22px',
    fontWeight: 900,
    color: '#0f172a',
    letterSpacing: '-0.5px',
  },
  logoHighlight: {
    color: '#1d4ed8',
  },
  desktopMenu: {
    display: 'flex',
    listStyle: 'none',
    gap: '20px',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: '#334155',
    fontWeight: 600,
    fontSize: '14px',
    transition: 'color 0.2s',
  },
  mobileMenuButton: {
    backgroundColor: 'transparent',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '20px',
    padding: '4px 10px',
    cursor: 'pointer',
    color: '#0f172a',
  },
  mobileDropdown: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    padding: '12px 20px',
  },
  mobileMenuList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: '#0f172a',
    fontWeight: 600,
    fontSize: '15px',
    display: 'block',
    padding: '6px 0',
  },
};