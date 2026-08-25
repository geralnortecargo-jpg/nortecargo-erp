'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicialização direta do Supabase (sem depender de ficheiros externos)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Lancamento {
  id: string;
  created_at?: string;
  tipo: 'entrada' | 'saida';
  categoria: string;
  descricao: string;
  valor: number;
  data_pagamento: string;
  metodo_pagamento?: string;
  servico_id?: string;
}

export default function LancamentosPage() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  const [novoLancamento, setNovoLancamento] = useState({
    tipo: 'entrada' as 'entrada' | 'saida',
    categoria: 'Transporte',
    descricao: '',
    valor: '',
    data_pagamento: new Date().toISOString().split('T')[0],
    metodo_pagamento: 'MBWAY',
  });

  const carregarLancamentos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('financeiro')
      .select('*')
      .order('data_pagamento', { ascending: false });

    if (error) {
      console.error('Erro ao carregar lançamentos:', error.message);
    } else {
      setLancamentos(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarLancamentos();
  }, []);

  const handleGuardarLancamento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoLancamento.descricao || !novoLancamento.valor) return;

    const { data, error } = await supabase
      .from('financeiro')
      .insert([
        {
          tipo: novoLancamento.tipo,
          categoria: novoLancamento.categoria,
          descricao: novoLancamento.descricao,
          valor: parseFloat(novoLancamento.valor),
          data_pagamento: novoLancamento.data_pagamento,
          metodo_pagamento: novoLancamento.metodo_pagamento,
        },
      ])
      .select();

    if (error) {
      alert('Erro ao guardar lançamento: ' + error.message);
    } else if (data) {
      setLancamentos([data[0], ...lancamentos]);
      setModalAberto(false);
      setNovoLancamento({
        tipo: 'entrada',
        categoria: 'Transporte',
        descricao: '',
        valor: '',
        data_pagamento: new Date().toISOString().split('T')[0],
        metodo_pagamento: 'MBWAY',
      });
    }
  };

  const handleEliminarLancamento = async (id: string) => {
    if (!confirm('Tem a certeza de que deseja eliminar este registo?')) return;

    const { error } = await supabase.from('financeiro').delete().eq('id', id);

    if (error) {
      alert('Erro ao eliminar: ' + error.message);
    } else {
      setLancamentos(lancamentos.filter((l) => l.id !== id));
    }
  };

  const totalEntradas = lancamentos
    .filter((l) => l.tipo === 'entrada')
    .reduce((acc, curr) => acc + Number(curr.valor), 0);

  const totalSaidas = lancamentos
    .filter((l) => l.tipo === 'saida')
    .reduce((acc, curr) => acc + Number(curr.valor), 0);

  const saldoTotal = totalEntradas - totalSaidas;

  return (
    <main style={{ padding: '32px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>Lançamentos Financeiros</h1>
          <p style={{ fontSize: '16px', color: '#94a3b8', margin: '6px 0 0 0' }}>
            {loading ? 'A carregar dados...' : 'Gestão de entradas e despesas da Nortecargo'}
          </p>
        </div>

        <button
          onClick={() => setModalAberto(true)}
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '14px 22px',
            fontSize: '16px',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          + Novo Lançamento
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '12px' }}>
          <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 700 }}>ENTRADAS</span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#4ade80', marginTop: '8px' }}>
            +{totalEntradas.toFixed(2)} €
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '12px' }}>
          <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 700 }}>DESPESAS</span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#f87171', marginTop: '8px' }}>
            -{totalSaidas.toFixed(2)} €
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '12px' }}>
          <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 700 }}>SALDO ATUAL</span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: saldoTotal >= 0 ? '#38bdf8' : '#ef4444', marginTop: '8px' }}>
            {saldoTotal.toFixed(2)} €
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#1e293b', borderRadius: '14px', border: '1px solid #334155', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
              <th style={thStyle}>Data</th>
              <th style={thStyle}>Tipo</th>
              <th style={thStyle}>Descrição / Categoria</th>
              <th style={thStyle}>Método</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Valor</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                  A carregar lançamentos do Supabase...
                </td>
              </tr>
            ) : lancamentos.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
                  Nenhum lançamento registado.
                </td>
              </tr>
            ) : (
              lancamentos.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={tdStyle}>{item.data_pagamento}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 800,
                        backgroundColor: item.tipo === 'entrada' ? '#14532d' : '#7f1d1d',
                        color: item.tipo === 'entrada' ? '#4ade80' : '#f87171',
                      }}
                    >
                      {item.tipo.toUpperCase()}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 700, color: '#ffffff' }}>{item.descricao}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>{item.categoria}</div>
                  </td>
                  <td style={tdStyle}>{item.metodo_pagamento || 'N/A'}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 800, color: item.tipo === 'entrada' ? '#4ade80' : '#f87171' }}>
                    {item.tipo === 'entrada' ? '+' : '-'}{Number(item.valor).toFixed(2)} €
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button
                      onClick={() => handleEliminarLancamento(item.id)}
                      style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalAberto && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
          }}
          onClick={() => setModalAberto(false)}
        >
          <div
            style={{ backgroundColor: '#1e293b', border: '2px solid #334155', borderRadius: '16px', padding: '32px', maxWidth: '500px', width: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0, color: '#ffffff' }}>Novo Lançamento</h2>
            <form onSubmit={handleGuardarLancamento} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Tipo</label>
                <select
                  value={novoLancamento.tipo}
                  onChange={(e) => setNovoLancamento({ ...novoLancamento, tipo: e.target.value as 'entrada' | 'saida' })}
                  style={inputStyle}
                >
                  <option value="entrada">Entrada (Ganho)</option>
                  <option value="saida">Saída (Despesa)</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Descrição</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Pagamento Servico Mudanca"
                  value={novoLancamento.descricao}
                  onChange={(e) => setNovoLancamento({ ...novoLancamento, descricao: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Valor (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={novoLancamento.valor}
                    onChange={(e) => setNovoLancamento({ ...novoLancamento, valor: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Data Pagamento</label>
                  <input
                    type="date"
                    required
                    value={novoLancamento.data_pagamento}
                    onChange={(e) => setNovoLancamento({ ...novoLancamento, data_pagamento: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Categoria</label>
                  <input
                    type="text"
                    value={novoLancamento.categoria}
                    onChange={(e) => setNovoLancamento({ ...novoLancamento, categoria: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Método Pagamento</label>
                  <select
                    value={novoLancamento.metodo_pagamento}
                    onChange={(e) => setNovoLancamento({ ...novoLancamento, metodo_pagamento: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="MBWAY">MBWAY</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Transferência">Transferência</option>
                    <option value="Cartão">Cartão</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setModalAberto(false)} style={{ flex: 1, padding: '12px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

const thStyle: React.CSSProperties = { padding: '16px', fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '16px', fontSize: '15px' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' };
const inputStyle: React.CSSProperties = { width: '100%', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', padding: '10px', borderRadius: '8px', outline: 'none' };