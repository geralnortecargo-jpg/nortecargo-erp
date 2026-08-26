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
}'client';

import React, { useState } from 'react';

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

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white relative shadow-md">
        <div className="text-xl font-bold">MeuSite</div>

        {/* Links para Computador (oculto no telemóvel com 'hidden md:flex') */}
        <div className="hidden md:flex gap-6 items-center">
          <a href="#home" className="hover:text-green-400 transition">Início</a>
          <a href="#services" className="hover:text-green-400 transition">Serviços</a>
          <a href="#contact" className="hover:text-green-400 transition">Contacto</a>
        </div>

        {/* Botão de Hambúrguer (visível apenas no telemóvel com 'md:hidden') */}
        <button 
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Menu Dropdown do Telemóvel (só abre se mobileMenuOpen for true) */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-900 flex flex-col p-6 gap-4 shadow-lg md:hidden z-50 border-t border-gray-800">
            <a 
              href="#home" 
              className="hover:text-green-400 transition py-2" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </a>
            <a 
              href="#services" 
              className="hover:text-green-400 transition py-2" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Serviços
            </a>
            <a 
              href="#contact" 
              className="hover:text-green-400 transition py-2" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </a>
          </div>
        )}
      </nav>

      {/* SECÇÃO DO SLIDER */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto rounded-lg shadow-lg bg-gray-900 text-white p-8 relative">
          <h1 className="text-2xl md:text-3xl font-bold">{SLIDES[currentSlide].title}</h1>
          <p className="mt-4 text-lg text-gray-300">
            {SLIDES[currentSlide].description}
          </p>

          <div className="flex justify-center gap-2 mt-6">
            {SLIDES.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                  index === currentSlide ? 'bg-green-500' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}