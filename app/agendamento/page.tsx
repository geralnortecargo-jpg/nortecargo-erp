'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CATALOGO_ITENS = {
  sala: [
    { id: 'sofa_2', name: 'Sofá 2 Lugares', volume: 1.5 },
    { id: 'sofa_3', name: 'Sofá 3 Lugares', volume: 2.2 },
    { id: 'tv', name: 'Televisão / Ecrã', volume: 0.3 },
    { id: 'movel_tv', name: 'Móvel TV', volume: 0.8 },
    { id: 'mesa_centro', name: 'Mesa de Centro', volume: 0.5 },
    { id: 'mesa_jantar', name: 'Mesa de Jantar', volume: 2.0 },
    { id: 'cadeiras_jantar', name: 'Cadeiras de Jantar (conjunto/unid.)', volume: 0.3 },
    { id: 'aparador', name: 'Aparador / Louceiro', volume: 1.5 },
  ],
  cozinha: [
    { id: 'frigorifico', name: 'Frigorífico', volume: 1.8 },
    { id: 'maquina_lavar', name: 'Máquina de Lavar', volume: 1.0 },
    { id: 'microondas', name: 'Micro-ondas', volume: 0.2 },
    { id: 'mesa_cozinha', name: 'Mesa de Cozinha', volume: 1.2 },
  ],
  quarto: [
    { id: 'cama_casal', name: 'Cama de Casal', volume: 2.5 },
    { id: 'colchao', name: 'Colchão', volume: 1.2 },
    { id: 'guarda_fatos', name: 'Roupeiro / Guarda-fatos', volume: 3.0 },
    { id: 'comoda', name: 'Cómoda', volume: 1.0 },
    { id: 'mesa_cabeceira', name: 'Mesa de Cabeceira', volume: 0.2 },
    { id: 'secretaria', name: 'Secretária', volume: 1.0 },
    { id: 'cadeira_escritorio', name: 'Cadeira de Secretária', volume: 0.4 },
  ],
  bengaleiro: [
    { id: 'bengaleiro_peca', name: 'Bengaleiro / Cabide', volume: 0.4 },
    { id: 'caixa_cartao', name: 'Caixa de Cartão para Transporte', volume: 0.1 },
    { id: 'espelho', name: 'Espelho Grande', volume: 0.4 },
  ]
};

const SLIDES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
];

export default function AgendamentoPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    origem: '',
    destino: '',
    data: '',
    tipologia: 'T1',
    observacoes: '',
  });

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQtyChange = (divisaoKey: string, itemId: string, delta: number) => {
    const key = `${divisaoKey}_${itemId}`;
    setQuantities((prev) => {
      const atual = prev[key] || 0;
      const novo = Math.max(0, atual + delta);
      return { ...prev, [key]: novo };
    });
  };

  const getDivisoesAtivas = () => {
    const lista: { key: string; titulo: string; tipoCatalogo: string }[] = [
      { key: 'sala', titulo: 'Sala de Estar e Jantar', tipoCatalogo: 'sala' },
      { key: 'cozinha', titulo: 'Cozinha', tipoCatalogo: 'cozinha' },
    ];

    const numQuartos = parseInt(formData.tipologia.replace('T', '')) || 1;
    for (let i = 1; i <= numQuartos; i++) {
      lista.push({ key: `quarto_${i}`, titulo: `Quarto ${i}`, tipoCatalogo: 'quarto' });
    }

    lista.push({ key: 'bengaleiro', titulo: 'Bengaleiro / Outros e Caixas', tipoCatalogo: 'bengaleiro' });
    return lista;
  };

  const divisoesAtivas = getDivisoesAtivas();

  let totalVolume = 0;
  Object.entries(quantities).forEach(([key, qtd]) => {
    if (qtd > 0) {
      const parts = key.split('_');
      const itemId = parts.slice(1).join('_');
      let vol = 0;
      Object.values(CATALOGO_ITENS).forEach((catList) => {
        const found = catList.find((i) => i.id === itemId);
        if (found) vol = found.volume;
      });
      totalVolume += vol * qtd;
    }
  });

  const estimatedPrice = totalVolume > 0 ? Math.round(50 + totalVolume * 35) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const activeItems = Object.entries(quantities)
      .filter(([key, qtd]) => qtd > 0)
      .map(([key, qtd]) => {
        const parts = key.split('_');
        const itemId = parts.slice(1).join('_');
        let itemName = '';
        let itemVolume = 0;
        
        Object.values(CATALOGO_ITENS).forEach((catList) => {
          const found = catList.find((i) => i.id === itemId);
          if (found) {
            itemName = found.name;
            itemVolume = found.volume;
          }
        });
        
        return `• ${itemName}: ${qtd} unid. (${(itemVolume * qtd).toFixed(1)} m³)`;
      })
      .join('\n');

    const descricaoCompleta = `Tipologia: ${formData.tipologia} | Vol: ${totalVolume.toFixed(1)}m³\n\nInventário:\n${activeItems || 'Nenhum artigo selecionado.'}\n\nNotas: ${formData.observacoes || 'Nenhuma observação.'}`;

    const { error } = await supabase.from('pedidos_pendentes').insert([
      {
        nome_cliente: formData.nome,
        email: formData.email,
        telemovel: formData.telefone,
        morada_cliente: formData.origem,
        morada_carga: formData.origem,
        morada_descarga: formData.destino,
        descricao_servico: descricaoCompleta,
        valor_sem_iva: estimatedPrice,
        valor_com_iva: Math.round(estimatedPrice * 1.23),
        data_servico: formData.data ? new Date(formData.data).toISOString() : null,
        estado_pedido: 'Pendente',
      },
    ]);

    if (error) {
      console.error('Erro ao guardar pedido:', error);
      alert('Ocorreu um erro ao enviar o pedido. Tente novamente.');
      setLoading(false);
    } else {
      setSubmitted(true);
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* CSS para garantir responsividade perfeita em telemóveis */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .hero-title {
            font-size: 24px !important;
          }
          .hero-subtitle {
            font-size: 14px !important;
          }
          .section-card {
            padding: 16px !important;
          }
          .grid-form {
            grid-template-columns: 1fr !important;
          }
          .grid-items {
            grid-template-columns: 1fr !important;
          }
          .item-row {
            padding: 8px 10px !important;
          }
          .summary-box {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .submit-btn {
            width: 100% !important;
          }
        }
      `}</style>

      {/* BANNER ROTATIVO */}
      <section style={styles.heroSection} id="home">
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
          <h1 className="hero-title" style={styles.heroTitle}>Simulador e Agendamento Online</h1>
          <p className="hero-subtitle" style={styles.heroSubtitle}>Personalize o seu inventário detalhado e obtenha uma estimativa instantânea para a sua mudança.</p>
        </div>
      </section>

      <main style={{ maxWidth: '900px', margin: '20px auto', padding: '0 16px' }} id="agendamento">
        {submitted ? (
          <div className="section-card" style={{ backgroundColor: '#ffffff', padding: '30px 20px', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <h2 style={{ color: '#16a34a', marginBottom: '16px', fontSize: '20px' }}>Orçamento Submetido com Sucesso!</h2>
            <p style={{ color: '#334155', lineHeight: '1.6', fontSize: '14px' }}>Obrigado, <strong>{formData.nome}</strong>. A nossa equipa recebeu os dados do seu inventário ({totalVolume.toFixed(1)} m³) para a tipologia <strong>{formData.tipologia}</strong> e entraremos em contacto muito em breve com a proposta.</p>
            <a href="/" style={{ display: 'inline-block', marginTop: '24px', backgroundColor: '#0f2b5c', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', width: '100%', boxSizing: 'border-box' }}>Voltar à Página Principal</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            
            {/* 1. DADOS DO CLIENTE E TIPOLOGIA */}
            <div className="section-card" style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h2 style={{ color: '#0f172a', fontSize: '18px', marginBottom: '16px', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>1. Dados do Cliente e Tipologia</h2>

              <div className="grid-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={styles.label}>Nome Completo</label>
                  <input type="text" required value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} style={styles.input} placeholder="O seu nome" />
                </div>
                <div>
                  <label style={styles.label}>Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={styles.input} placeholder="exemplo@email.com" />
                </div>
                <div>
                  <label style={styles.label}>Telefone / Telemóvel</label>
                  <input type="tel" required value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} style={styles.input} placeholder="912 345 678" />
                </div>
                <div>
                  <label style={styles.label}>Tipologia da Habitação</label>
                  <select value={formData.tipologia} onChange={(e) => setFormData({ ...formData, tipologia: e.target.value })} style={{ ...styles.input, backgroundColor: '#fff' }}>
                    <option value="T0">T0 / Estúdio</option>
                    <option value="T1">T1</option>
                    <option value="T2">T2</option>
                    <option value="T3">T3</option>
                    <option value="T4">T4 ou Superior</option>
                  </select>
                </div>
                <div>
                  <label style={styles.label}>Morada de Recolha (Origem)</label>
                  <input type="text" required value={formData.origem} onChange={(e) => setFormData({ ...formData, origem: e.target.value })} style={styles.input} placeholder="Cidade ou Morada" />
                </div>
                <div>
                  <label style={styles.label}>Morada de Entrega (Destino)</label>
                  <input type="text" required value={formData.destino} onChange={(e) => setFormData({ ...formData, destino: e.target.value })} style={styles.input} placeholder="Cidade ou Morada" />
                </div>
                <div>
                  <label style={styles.label}>Data Pretendida</label>
                  <input type="date" required value={formData.data} onChange={(e) => setFormData({ ...formData, data: e.target.value })} style={styles.input} />
                </div>
              </div>
            </div>

            {/* 2. INVENTÁRIO DINÂMICO */}
            <div className="section-card" style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h2 style={{ color: '#0f172a', fontSize: '18px', marginBottom: '16px', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>2. Inventário de Bens ({formData.tipologia})</h2>

              {divisoesAtivas.map((div) => {
                const itensDoCatalogo = CATALOGO_ITENS[div.tipoCatalogo as keyof typeof CATALOGO_ITENS] || [];
                return (
                  <div key={div.key} style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#0f2b5c', fontSize: '15px', marginBottom: '10px' }}>{div.titulo}</h3>
                    <div className="grid-items" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                      {itensDoCatalogo.map((item) => {
                        const chaveQtd = `${div.key}_${item.id}`;
                        const qtd = quantities[chaveQtd] || 0;
                        return (
                          <div key={item.id} className="item-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <span style={{ fontSize: '13px', color: '#334155', fontWeight: 500 }}>{item.name}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <button type="button" onClick={() => handleQtyChange(div.key, item.id, -1)} style={styles.btnQty}>-</button>
                              <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 700, fontSize: '14px' }}>{qtd}</span>
                              <button type="button" onClick={() => handleQtyChange(div.key, item.id, 1)} style={{ ...styles.btnQty, backgroundColor: '#16a34a', color: '#fff' }}>+</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* CAIXA DE OBSERVAÇÕES */}
              <div style={{ marginTop: '24px' }}>
                <label style={styles.label}>Observações / Detalhes Adicionais</label>
                <textarea 
                  rows={3}
                  value={formData.observacoes} 
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })} 
                  style={{ ...styles.input, resize: 'vertical' }} 
                  placeholder="Indique se há acessos difíceis, escadas estreitas, piano, cofres ou objetos frágeis especiais..."
                />
              </div>

              {/* CAIXA DE RESUMO DE CÁLCULO */}
              <div className="summary-box" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ margin: 0, color: '#166534', fontSize: '13px' }}>Volume Total Estimado:</p>
                  <h4 style={{ margin: '2px 0 0 0', color: '#14532d', fontSize: '18px' }}>{totalVolume.toFixed(1)} m³</h4>
                </div>
                <div>
                  <p style={{ margin: 0, color: '#166534', fontSize: '13px' }}>Orçamento Indicativo:</p>
                  <h4 style={{ margin: '2px 0 0 0', color: '#16a34a', fontSize: '22px' }}>{estimatedPrice} €</h4>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button type="submit" disabled={loading} className="submit-btn" style={{ backgroundColor: '#16a34a', color: '#ffffff', padding: '14px 32px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)' }}>
                {loading ? 'A enviar...' : 'Confirmar e Solicitar Orçamento'}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  heroSection: {
    position: 'relative',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '50px 16px',
    textAlign: 'center',
    overflow: 'hidden',
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgSlide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1.0s ease-in-out',
    zIndex: 1,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '32px',
    fontWeight: 800,
    margin: '0 0 10px 0',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '15px',
    color: '#e2e8f0',
    margin: 0,
    lineHeight: '1.4',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#334155',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  btnQty: {
    width: '32px',
    height: '32px',
    backgroundColor: '#e2e8f0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};