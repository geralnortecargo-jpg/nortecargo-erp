'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  // Estado para o Formulário de Orçamento
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    origem: '',
    destino: '',
    tipoServico: 'mudanca_residencial',
    mensagem: '',
  });

  // Estado e dados para o Carrossel do Hero
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
      title: 'Transportes & Logística Internacional',
      subtitle: 'Trâmites alfandegários, carga marítima e transporte dedicado sem complicações.'
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      title: 'Mudanças Residenciais Chave-na-Mão',
      subtitle: 'Cuidado total com a sua casa, embalamento especializado e transporte seguro.'
    },
    {
      url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
      title: 'Transporte de Carga & Mercadorias',
      subtitle: 'Frota moderna e equipada para entregas rápidas em todo o país e Europa.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pedido de orçamento enviado com sucesso! Entraremos em contacto brevemente.');
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'sans-serif' }}>
      {/* 1. Navbar Mantida Intacta */}
      <Navbar />

      {/* 2. Hero Section com Carrossel e Efeito de Vidro */}
      <section id="home" style={{ position: 'relative', width: '100%', height: '520px', overflow: 'hidden' }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slide.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 1
            }}
          />
        ))}

        {/* Camada de sobreposição para contraste */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            zIndex: 2
          }}
        />

        {/* Cartão de Vidro (Glassmorphism) */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 20px'
          }}
        >
          <div
            style={{
              maxWidth: '850px',
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '16px',
              padding: '40px 30px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
              color: '#ffffff'
            }}
          >
            <h1 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.3)', lineHeight: '1.2' }}>
              {slides[currentIndex].title}
            </h1>
            <p style={{ fontSize: '18px', marginBottom: '28px', color: '#f8fafc', textShadow: '0 1px 2px rgba(0,0,0,0.3)', maxWidth: '650px', margin: '0 auto 28px auto' }}>
              {slides[currentIndex].subtitle}
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="#agendamento"
                style={{
                  backgroundColor: '#1e3a8a',
                  color: '#ffffff',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                }}
              >
                Pedir Orçamento Grátis
              </a>
              <a
                href="#servicos"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  color: '#0f172a',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                Ver Serviços
              </a>
            </div>
          </div>
        </div>

        {/* Setas de Navegação */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 4,
            backgroundColor: 'rgba(0,0,0,0.4)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            fontSize: '20px',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)'
          }}
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 4,
            backgroundColor: 'rgba(0,0,0,0.4)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            fontSize: '20px',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)'
          }}
        >
          ❯
        </button>

        {/* Indicadores do Carrossel */}
        <div style={{ position: 'absolute', bottom: '20px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 4 }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: index === currentIndex ? '28px' : '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: index === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </section>

      {/* 3. Secção Empresas */}
      <section id="empresas" style={{ padding: '60px 20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '12px' }}>
            Soluções para Empresas
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>
            Apoio logístico, mudança de instalações e transporte dedicado para o seu negócio.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '8px' }}>Relocalização de Escritórios</h3>
              <p style={{ color: '#475569', fontSize: '15px' }}>Mudanças rápidas e eficientes com o mínimo de impacto na operação da sua empresa.</p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '8px' }}>Logística & Transporte</h3>
              <p style={{ color: '#475569', fontSize: '15px' }}>Entregas e distribuição regular de carga e mercadorias a nível nacional e internacional.</p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '8px' }}>Gestão de Frota Dedicada</h3>
              <p style={{ color: '#475569', fontSize: '15px' }}>Viaturas e motoristas qualificados à disposição das suas necessidades logísticas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Secção Serviços */}
      <section id="servicos" style={{ padding: '60px 20px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '12px' }}>
            Os Nossos Serviços
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>
            Serviços chave-na-mão adaptados a cada necessidade.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Mudanças Residenciais</h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Embalamento, desmontagem, transporte e montagem de mobiliário em novas habitações.</p>
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Elevador Exterior</h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Operação de elevador de fachada para manuseamento seguro em pisos elevados.</p>
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Embalamento Especializado</h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Proteção reforçada para itens frágeis, objetos de valor e equipamento eletrónico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Secção Agendamento / Orçamento */}
      <section id="agendamento" style={{ padding: '60px 20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
            Pedir Orçamento / Agendamento
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>
            Preencha o formulário abaixo e receba a nossa estimativa detalhada sem compromisso.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Nome</label>
                <input type="text" name="nome" required value={formData.nome} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Telefone</label>
                <input type="tel" name="telefone" required value={formData.telefone} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>E-mail</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Localidade de Origem</label>
                <input type="text" name="origem" required value={formData.origem} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Localidade de Destino</label>
                <input type="text" name="destino" required value={formData.destino} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Tipo de Serviço</label>
              <select name="tipoServico" value={formData.tipoServico} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                <option value="mudanca_residencial">Mudança Residencial</option>
                <option value="mudanca_empresarial">Mudança Empresarial</option>
                <option value="transporte_carga">Transporte de Carga</option>
                <option value="outro">Outro Serviço</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Detalhes Adicionais</label>
              <textarea name="mensagem" rows={4} value={formData.mensagem} onChange={handleChange} placeholder="Descreva os objetos a transportar, pisos, acesso a elevador, etc." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>

            <button type="submit" style={{ backgroundColor: '#16a34a', color: '#ffffff', padding: '14px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '8px' }}>
              Enviar Pedido de Orçamento
            </button>
          </form>
        </div>
      </section>

      {/* 6. Secção Contacto */}
      <section id="contacto" style={{ padding: '60px 20px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>Contacte-nos</h2>
          <p style={{ color: '#475569', marginBottom: '24px' }}>Estamos disponíveis para responder a todas as suas questões.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', fontSize: '16px' }}>
            <div>
              <strong>Telefone / Orçamentos:</strong> <a href="tel:965531009" style={{ color: '#1e3a8a', textDecoration: 'none' }}>965 531 009</a>
            </div>
            <div>
              <strong>E-mail:</strong> <a href="mailto:Geral@nortecargo.pt" style={{ color: '#16a34a', textDecoration: 'none' }}>Geral@nortecargo.pt</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '30px 20px', textAlign: 'center', fontSize: '14px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p>© {new Date().getFullYear()} NORTECARGO - Transportes e Mudanças. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}