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

        {/* LINKS DE DESKTOP (Esconde automaticamente em ecrãs pequenos via inline style controlado por JS/Flex) */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
        }} className="desktop-links-container">
          <a href="#home" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 500 }}>Início</a>
          <a href="#empresas" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 500 }}>Empresas</a>
          <a href="#servicos" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 500 }}>Serviços</a>
          <a href="#agendamento" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 500 }}>Agendamento</a>
          <a href="#contacto" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 500 }}>Contacto</a>
        </div>

        {/* BOTÃO HAMBÚRGUER (Visível no mobile) */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.8rem',
            cursor: 'pointer',
            color: '#1f2937',
            padding: '0.2rem 0.5rem',
            display: 'block' // Forçado a aparecer
          }}
          aria-label="Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* MENU DROPDOWN MOBILE (Aparece logo abaixo da navbar se o estado for true) */}
      {mobileMenuOpen && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          padding: '1.5rem',
          gap: '1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #e5e7eb',
          position: 'absolute',
          width: '100%',
          zIndex: 1000
        }}>
          <a href="#home" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '1.1rem', padding: '0.5rem 0' }} onClick={() => setMobileMenuOpen(false)}>Início</a>
          <a href="#empresas" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '1.1rem', padding: '0.5rem 0' }} onClick={() => setMobileMenuOpen(false)}>Empresas</a>
          <a href="#servicos" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '1.1rem', padding: '0.5rem 0' }} onClick={() => setMobileMenuOpen(false)}>Serviços</a>
          <a href="#agendamento" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '1.1rem', padding: '0.5rem 0' }} onClick={() => setMobileMenuOpen(false)}>Agendamento</a>
          <a href="#contacto" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '1.1rem', padding: '0.5rem 0' }} onClick={() => setMobileMenuOpen(false)}>Contacto</a>
        </div>
      )}

      {/* CONTEÚDO */}
      <section style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Transportes e Mudanças com Rigor</h1>
        <p style={{ marginTop: '1rem', color: '#4b5563' }}>Soluções completas de mudanças em todo o país.</p>
      </section>

    </div>
  );
}