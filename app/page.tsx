'use client';

import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    title: 'Bem-vindo',
    description: 'Soluções profissionais à sua medida.',
  },
  {
    title: 'Qualidade e Confiança',
    description: 'Trabalho garantido e dedicação total.',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Deteta automaticamente se é telemóvel ou computador
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Executa ao carregar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      color: '#1f2937',
      fontFamily: 'Arial, sans-serif',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1f2937',
      color: '#ffffff',
      position: 'relative' as const,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    logo: {
      fontSize: '1.25rem',
      fontWeight: 'bold' as const,
    },
    navLinksDesktop: {
      display: isMobile ? 'none' : 'flex',
      gap: '1.5rem',
      alignItems: 'center',
    },
    hamburgerButton: {
      display: isMobile ? 'block' : 'none',
      background: 'none',
      border: 'none',
      color: '#ffffff',
      fontSize: '1.5rem',
      cursor: 'pointer',
    },
    mobileMenu: {
      display: mobileMenuOpen && isMobile ? 'flex' : 'none',
      flexDirection: 'column' as const,
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      width: '100%',
      backgroundColor: '#1f2937',
      padding: '1.5rem 2rem',
      gap: '1rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
      zIndex: 100,
      borderTop: '1px solid #374151',
    },
    link: {
      color: '#ffffff',
      textDecoration: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    section: {
      padding: '4rem 2rem',
      textAlign: 'center' as const,
    },
    sliderContainer: {
      position: 'relative' as const,
      maxWidth: '800px',
      margin: '0 auto',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#1f2937',
      color: '#ffffff',
      padding: '3rem 2rem',
    },
    dotsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '1.5rem',
    },
    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>MeuSite</div>

        {/* Links no Computador */}
        <div style={styles.navLinksDesktop}>
          <a href="#home" style={styles.link}>Início</a>
          <a href="#services" style={styles.link}>Serviços</a>
          <a href="#contact" style={styles.link}>Contacto</a>
        </div>

        {/* Botão de Hambúrguer no Telemóvel */}
        <button 
          style={styles.hamburgerButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Menu Dropdown do Telemóvel */}
        <div style={styles.mobileMenu}>
          <a href="#home" style={styles.link} onClick={() => setMobileMenuOpen(false)}>Início</a>
          <a href="#services" style={styles.link} onClick={() => setMobileMenuOpen(false)}>Serviços</a>
          <a href="#contact" style={styles.link} onClick={() => setMobileMenuOpen(false)}>Contacto</a>
        </div>
      </nav>

      {/* CONTEÚDO DA PÁGINA / SLIDER */}
      <section style={styles.section}>
        <div style={styles.sliderContainer}>
          <h1>{SLIDES[currentSlide].title}</h1>
          <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
            {SLIDES[currentSlide].description}
          </p>

          <div style={styles.dotsContainer}>
            {SLIDES.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  ...styles.dot,
                  backgroundColor:
                    index === currentSlide ? '#16a34a' : 'rgba(255, 255, 255, 0.5)',
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}