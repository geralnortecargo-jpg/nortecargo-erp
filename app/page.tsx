'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

interface ModalData {
  title: string;
  intro: string;
  steps: { title: string; desc: string }[];
}

export default function HomePage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    origem: '',
    destino: '',
    tipoServico: 'mudanca_residencial',
    mensagem: '',
  });

  // Estado para controlar o Pop-up Modal
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);

  // Dados dos Slides do Hero
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

  // Conteúdo detalhado para os Pop-ups em Vidro
  const modalContent: Record<string, ModalData> = {
    residenciais: {
      title: 'Mudanças Residenciais',
      intro: 'O nosso processo chave-na-mão garante a máxima tranquilidade para si e para a sua família durante a mudança de casa.',
      steps: [
        { title: '1. Avaliação e Planeamento', desc: 'Levantamento das volumetrias, acessos (escadas/elevadores) e definição do plano logístico.' },
        { title: '2. Desmontagem e Embalamento', desc: 'Proteção de móveis com plástico bolha e mantas térmicas. Embalamento etiquetado de louças, roupas e objetos frágeis.' },
        { title: '3. Carregamento e Elevação Exterior', desc: 'Acomodação segura na frota e utilização de elevador exterior quando necessário para evitar danos no imóvel.' },
        { title: '4. Transporte e Montagem no Destino', desc: 'Transporte com rastreio, descarregamento, montagem integral do mobiliário e colocação no local final.' }
      ]
    },
    escritorio: {
      title: 'Mudanças de Escritório & Empresas',
      intro: 'Planificação rigorosa orientada para minimizar o tempo de inatividade da sua empresa e proteger o seu ativo.',
      steps: [
        { title: '1. Inventário e Identificação', desc: 'Mapeamento de postos de trabalho, documentação, ficheiros confidenciais e equipamentos de informática.' },
        { title: '2. Embalamento Técnico de TI', desc: 'Acondicionamento especializado de computadores, servidores, monitores e periféricos com proteção antiestática.' },
        { title: '3. Desmontagem de Mobiliário de Escritório', desc: 'Desmontagem técnica de bancadas, secretárias compostas e estantes industriais.' },
        { title: '4. Reinstalação Rápida', desc: 'Transporte prioritário e posicionamento do mobiliário no novo espaço conforme o layout pré-definido.' }
      ]
    },
    grupagens: {
      title: 'Grupagens de Carga & LTL',
      intro: 'A solução ideal para enviar mercadorias sem necessidade de contratar um camião completo, reduzindo custos de transporte.',
      steps: [
        { title: '1. Consolidação da Carga', desc: 'Recolha da sua mercadoria ou palete e agrupamento num centro logístico estratégico.' },
        { title: '2. Triagem e Trâmites Alfandegários', desc: 'Gestão da documentação de transporte, CMR e desalfandegamento em rotas internacionais.' },
        { title: '3. Otimização de Rota', desc: 'Integração em frotas regulares que percorrem Portugal e a Europa de forma eficiente.' },
        { title: '4. Entrega Agendada', desc: 'Descarga controlada na morada do destinatário com confirmação e comprovativo de entrega.' }
      ]
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'sans-serif' }}>
      {/* 1. Navbar Integradada */}
      <Navbar />

      {/* 2. Hero Section com Carrossel e Glassmorphism */}
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

        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 2 }} />

        <div style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
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
              <a href="#agendamento" style={{ backgroundColor: '#1e3a8a', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
                Pedir Orçamento Grátis
              </a>
              <a href="#servicos" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', color: '#0f172a', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                Ver Serviços
              </a>
            </div>
          </div>
        </div>

        <button onClick={prevSlide} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 4, backgroundColor: 'rgba(0,0,0,0.4)', color: '#ffffff', border: 'none', borderRadius: '50%', width: '44px', height: '44px', fontSize: '20px', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>❮</button>
        <button onClick={nextSlide} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 4, backgroundColor: 'rgba(0,0,0,0.4)', color: '#ffffff', border: 'none', borderRadius: '50%', width: '44px', height: '44px', fontSize: '20px', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>❯</button>

        <div style={{ position: 'absolute', bottom: '20px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 4 }}>
          {slides.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} style={{ width: index === currentIndex ? '28px' : '10px', height: '10px', borderRadius: '5px', backgroundColor: index === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </div>
      </section>

      {/* 3. Secção de Serviços (3 Caixas lado a lado com Pop-up) */}
      <section id="servicos" style={{ padding: '70px 20px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', textAlign: 'center', marginBottom: '12px' }}>
            Soluções & Especialidades
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px', fontSize: '16px' }}>
            Apoio completo para habitações, empresas e logística de mercadorias.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {/* Caixa 1: Mudanças Residenciais */}
            <div style={{ backgroundColor: '#f8fafc', padding: '32px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e3a8a', marginBottom: '12px' }}>Mudanças Residenciais</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                  Serviço completo para a sua nova casa com embalamento profissional, desmontagem, transporte seguro e montagem no destino.
                </p>
              </div>
              <button
                onClick={() => setActiveModal(modalContent.residenciais)}
                style={{ backgroundColor: '#1e3a8a', color: '#ffffff', border: 'none', padding: '12px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', width: '100%' }}
              >
                Saber Mais
              </button>
            </div>

            {/* Caixa 2: Mudanças de Escritório */}
            <div style={{ backgroundColor: '#f8fafc', padding: '32px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e3a8a', marginBottom: '12px' }}>Mudanças de Escritório</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                  Relocalização rápida de empresas, escritórios e estabelecimentos comerciais com garantia de minima interrupção do negócio.
                </p>
              </div>
              <button
                onClick={() => setActiveModal(modalContent.escritorio)}
                style={{ backgroundColor: '#1e3a8a', color: '#ffffff', border: 'none', padding: '12px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', width: '100%' }}
              >
                Saber Mais
              </button>
            </div>

            {/* Caixa 3: Grupagens de Carga */}
            <div style={{ backgroundColor: '#f8fafc', padding: '32px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e3a8a', marginBottom: '12px' }}>Grupagens de Carga</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                  Transporte otimizado de volumes e paletes em regime partilhado, reduzindo custos para envios nacionais e internacionais.
                </p>
              </div>
              <button
                onClick={() => setActiveModal(modalContent.grupagens)}
                style={{ backgroundColor: '#1e3a8a', color: '#ffffff', border: 'none', padding: '12px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', width: '100%' }}
              >
                Saber Mais
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pop-up Modal em Vidro (Glassmorphism) */}
      {activeModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveModal(null)}
        >
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '16px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              position: 'relative',
              color: '#0f172a'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setActiveModal(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: '#e2e8f0',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: '#334155'
              }}
            >
              ✕
            </button>

            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1e3a8a', marginBottom: '12px' }}>
              {activeModal.title}
            </h2>
            <p style={{ color: '#475569', fontSize: '15px', marginBottom: '24px', lineHeight: '1.5' }}>
              {activeModal.intro}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              {activeModal.steps.map((step, idx) => (
                <div key={idx} style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              style={{ backgroundColor: '#1e3a8a', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '15px' }}
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}

      {/* 4. Secção Agendamento e Formulário de Orçamento */}
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
                <option value="grupagem_carga">Grupagem de Carga</option>
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

      {/* 5. Secção Contacto */}
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