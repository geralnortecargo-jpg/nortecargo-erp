'use client';

import React, { useState, useEffect } from 'react';

const SLIDES = [
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
];

export default function ContactosPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* NAVBAR COM LARGURA TOTAL E ALINHAMENTO NOS EXTREMOS */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
          <a href="/" style={{ textDecoration: 'none', fontWeight: '900', fontSize: '24px', color: '#0f2b5c' }}>
            NORTE<span style={{ color: '#16a34a' }}>CARGO</span>
          </a>
          <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="/" style={{ color: '#334155', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>Início</a>
            <a href="/servicos" style={{ color: '#334155', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>Serviços</a>
            <a href="/agendamento" style={{ color: '#334155', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>Agendamento</a>
            <a href="/contactos" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: 700, fontSize: '15px' }}>Contacto</a>
          </nav>
        </div>
      </header>

      {/* BANNER ROTATIVO */}
      <section style={styles.heroSection}>
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            style={{
              ...styles.bgSlide,
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url(${slide})`,
              opacity: index === currentSlide ? 1 : 0,
            }}
          />
        ))}
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Contactos e Informações</h1>
          <p style={styles.heroSubtitle}>Estamos à sua disposição para esclarecer qualquer dúvida ou agendar o seu serviço.</p>
        </div>
      </section>

      {/* CONTEÚDO DE CONTACTOS */}
      <main style={{ maxWidth: '1200px', width: '100%', margin: '50px auto', padding: '0 20px', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          
          {/* Cartão 1 */}
          <div style={{ backgroundColor: '#ffffff', padding: '35px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h2 style={{ color: '#0f2b5c', fontSize: '20px', marginBottom: '24px', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>Fale Connosco</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>TELEFONE</p>
              <a href="tel:965531009" style={{ fontSize: '20px', color: '#16a34a', fontWeight: 700, textDecoration: 'none' }}>965 531 009</a>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>MORADA</p>
              <p style={{ margin: 0, fontSize: '16px', color: '#1e293b', fontWeight: 500 }}>Porto, Portugal</p>
            </div>

            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>EMAIL</p>
              <p style={{ margin: 0, fontSize: '16px', color: '#1e293b', fontWeight: 500 }}>geral@nortecargo.pt</p>
            </div>
          </div>

          {/* Cartão 2 */}
          <div style={{ backgroundColor: '#ffffff', padding: '35px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ color: '#0f2b5c', fontSize: '20px', marginBottom: '24px', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>Dados da Empresa</h2>
              
              <div style={{ marginBottom: '16px' }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>RAZÃO SOCIAL</p>
                <p style={{ margin: 0, fontSize: '15px', color: '#1e293b', fontWeight: 600 }}>Mérito Corcante Unip. Lda</p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>NIF</p>
                <p style={{ margin: 0, fontSize: '15px', color: '#1e293b', fontWeight: 600 }}>518 351 939</p>
              </div>
            </div>

            {/* IMT */}
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ backgroundColor: '#0f2b5c', color: '#fff', padding: '10px 14px', borderRadius: '6px', fontWeight: 800, fontSize: '14px' }}>
                IMT
              </div>
              <div>
                <p style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Operador Autorizado</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Certificado pelo Instituto da Mobilidade e dos Transportes</p>
              </div>
            </div>
          </div>

        </div>

        {/* LIVRO DE RECLAMAÇÕES */}
        <div style={{ backgroundColor: '#ffffff', padding: '30px 35px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '18px' }}>Livro de Reclamações Eletrónico</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Disponibilizamos o acesso ao Livro de Reclamações para salvaguarda dos direitos dos nossos clientes.</p>
          </div>
          <a 
            href="https://www.livroreclamacoes.pt" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ backgroundColor: '#0f2b5c', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
          >
            Aceder ao Livro de Reclamações
          </a>
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  heroSection: {
    position: 'relative',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '90px 20px',
    textAlign: 'center',
    overflow: 'hidden',
    minHeight: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  bgSlide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1.5s ease-in-out',
    zIndex: 1,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '38px',
    fontWeight: 800,
    margin: '0 0 12px 0',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '16px',
    color: '#cbd5e1',
    margin: 0,
    lineHeight: '1.5',
  },
};