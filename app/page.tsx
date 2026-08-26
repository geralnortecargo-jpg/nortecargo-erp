'use client';

import React, { useState } from 'react';

const SLIDES = [
  {
    title: 'Transportes e Mudanças com Confiança e Rigor',
    description: 'Soluções completas de mudanças residenciais e empresariais em todo o país. Calcule o seu inventário e agende o serviço em minutos.',
  },
  {
    title: 'Qualidade e Profissionalismo',
    description: 'Trabalho garantido, segurança total para os seus bens e dedicação absoluta em cada transporte.',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', color: '#1f2937', fontFamily: 'Arial, sans-serif' }}>
      
      {/* NAVBAR */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#ffffff',
        color: '#1f2937',
        position: 'relative',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        {/* LOGO / INFO TOPO */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>Orçamentos: 965 531 009</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#16a34a' }}>Geral@nortecargo.pt</span>
        </div>

        {/* CSS INJETADO LOCALMENTE PARA RESPONSIVIDADE GARANTIDA */}
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
              padding: 1.5rem 2rem;
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

      {/* CONTEÚDO PRINCIPAL / SLIDER */}
      <section style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          backgroundColor: '#ffffff',
          color: '#1f2937',
          padding: '3rem 2rem',
          border: '1px solid #e5e7eb'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>
            {SLIDES[currentSlide].title}
          </h1>
          <p style={{ marginTop: '1rem', fontSize: '1.1rem', color: '#4b5563', lineHeight: '1.6' }}>
            {SLIDES[currentSlide].description}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2rem' }}>
            {SLIDES.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  backgroundColor: index === currentSlide ? '#16a34a' : '#d1d5db',
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}