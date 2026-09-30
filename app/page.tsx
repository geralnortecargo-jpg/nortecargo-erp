'use client';

import React, { useState, useEffect } from 'react';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Formulário Rápido de Orçamento
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [tipologia, setTipologia] = useState('T1 / T2');
  const [orcamentoEstimado, setOrcamentoEstimado] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calcularOrcamento = (e: React.FormEvent) => {
    e.preventDefault();
    let base = 150;
    if (tipologia === 'T3 / T4') base = 300;
    if (tipologia === 'Moradia / Grande Porte') base = 500;
    if (tipologia === 'Empresa / Escritório') base = 400;

    setOrcamentoEstimado(base);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1e293b', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* 1. SECÇÃO HERO / PRINCIPAL */}
      <section id="home" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '80px 20px 100px 20px', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span style={{ backgroundColor: '#1e3a8a', color: '#60a5fa', fontSize: '13px', fontWeight: '800', padding: '6px 16px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Serviço Profissional de Mudanças
          </span>
          <h1 style={{ fontSize: mounted && isMobile ? '32px' : '52px', fontWeight: '900', margin: '20px 0 16px 0', lineHeight: 1.1, letterSpacing: '-1px' }}>
            Transportes e Mudanças com Rigor
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '650px', margin: '0 auto 36px auto', lineHeight: 1.6 }}>
            Soluções completas de logística, embalamento e mudanças residenciais ou empresariais em todo o país com máxima segurança.
          </p>

          {/* SIMULADOR RÁPIDO */}
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', maxWidth: '650px', margin: '0 auto', textAlign: 'left', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '800', color: '#f8fafc' }}>
              ⚡ Simulação Rápida de Orçamento
            </h3>
            <form onSubmit={calcularOrcamento} style={{ display: 'grid', gridTemplateColumns: mounted && isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Origem</label>
                <input type="text" placeholder="Ex: Porto" value={origem} onChange={(e) => setOrigem(e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Destino</label>
                <input type="text" placeholder="Ex: Lisboa" value={destino} onChange={(e) => setDestino(e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ gridColumn: mounted && isMobile ? 'span 1' : 'span 2' }}>
                <label style={labelStyle}>Tipo de Servico / Tipologia</label>
                <select value={tipologia} onChange={(e) => setTipologia(e.target.value)} style={inputStyle}>
                  <option value="T1 / T2">Mudança Residencial (T1 / T2)</option>
                  <option value="T3 / T4">Mudança Residencial (T3 / T4)</option>
                  <option value="Moradia / Grande Porte">Moradia / Grande Porte</option>
                  <option value="Empresa / Escritório">Mudança de Escritório / Empresa</option>
                  <option value="Transporte de Mercadoria">Transporte Único de Mercadoria</option>
                </select>
              </div>
              <button type="submit" style={{ gridColumn: mounted && isMobile ? 'span 1' : 'span 2', backgroundColor: '#16a34a', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '14px', fontWeight: '800', fontSize: '15px', cursor: 'pointer', marginTop: '8px' }}>
                Calcular Estimativa
              </button>
            </form>

            {orcamentoEstimado !== null && (
              <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#0f172a', border: '1px solid #16a34a', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>Valor estimado a partir de:</span>
                <div style={{ fontSize: '28px', fontWeight: '900', color: '#4ade80' }}>~ {orcamentoEstimado} €</div>
                <a href="https://wa.me/351965531009" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '8px', color: '#38bdf8', fontSize: '13px', fontWeight: '700', textDecoration: 'none' }}>
                  💬 Confirmar valor final via WhatsApp →
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. SECÇÃO SERVIÇOS */}
      <section id="servicos" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: '0 0 12px 0' }}>Serviços Especializados</h2>
          <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>Cuidamos dos seus bens como se fossem nossos</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mounted && isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📦</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px 0', color: '#0f172a' }}>Mudanças Particulares</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
              Serviço chave na mão para habitações. Inclui desmontagem, embalamento protegido e montagem no destino.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏢</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px 0', color: '#0f172a' }}>Mudanças Empresariais</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
              Transição rápida e eficiente para escritórios e lojas, garantindo o mínimo tempo de paragem para o seu negócio.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚚</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px 0', color: '#0f172a' }}>Transporte & Logística</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
              Transporte de mercadorias pontual e entregas personalizadas em todo o território nacional e internacional.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SECÇÃO EMPRESAS / SOBRE */}
      <section id="empresas" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: mounted && isMobile ? '1fr' : '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#16a34a', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase' }}>Porquê a NorteCargo</span>
            <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: '8px 0 16px 0', lineHeight: 1.2 }}>
              Segurança, Pontualidade e Confiança
            </h2>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px' }}>
              Trabalhamos com equipas experientes e frota própria equipada para manusear todo o tipo de carga com a máxima proteção.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
              <li>✓ Material de embalamento de alta qualidade</li>
              <li>✓ Frota com rastreio e frota própria</li>
              <li>✓ Prazos cumpridos à risca</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: '900', color: '#0f172a' }}>100%</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#475569', marginTop: '4px' }}>Compromisso e Qualidade</div>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '12px' }}>
              Acompanhamos todo o processo desde o primeiro contacto até à colocação do último móvel.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SECÇÃO CONTACTO & AGENDAMENTO */}
      <section id="contacto" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 12px 0' }}>Pronto para agendar a sua mudança?</h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px' }}>
            Entre em contacto direto para esclarecer dúvidas ou agendar a sua data.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href="tel:965531009" style={{ backgroundColor: '#1e3a8a', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '16px' }}>
              📞 Ligar 965 531 009
            </a>
            <a href="mailto:Geral@nortecargo.pt" style={{ backgroundColor: '#16a34a', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '16px' }}>
              ✉️ Enviar E-mail
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

// Estilos Auxiliares
const labelStyle: React.CSSProperties = { fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' };
const inputStyle: React.CSSProperties = { width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' };
const cardStyle: React.CSSProperties = { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' };