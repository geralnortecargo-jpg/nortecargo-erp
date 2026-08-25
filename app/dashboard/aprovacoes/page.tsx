'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface PedidoPendente {
  id: string;
  nome_cliente: string;
  telemovel?: string;
  email?: string;
  morada_cliente?: string;
  descricao_servico: string;
  morada_carga?: string;
  morada_descarga?: string;
  horas_trabalhadas?: number;
  material_usado?: string;
  data_servico?: string;
}

export default function AprovacoesPage() {
  const [pedidos, setPedidos] = useState<PedidoPendente[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para controlar os inputs de preço de cada pedido individualmente
  const [precosHora, setPrecosHora] = useState<{ [key: string]: string }>({});
  const [minHoras, setMinHoras] = useState<{ [key: string]: string }>({});

  const carregarPedidos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pedidos_pendentes')
      .select('*')
      .eq('estado_pedido', 'Pendente')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao carregar pedidos pendentes:', error.message);
    } else {
      setPedidos(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const enviarOrcamento = async (pedido: PedidoPendente) => {
    const preco = precosHora[pedido.id];
    const horas = minHoras[pedido.id] || '1';

    if (!preco) {
      alert('Por favor, define o preço por hora antes de enviar o orçamento.');
      return;
    }

    if (!pedido.email) {
      alert('Este cliente não tem um e-mail válido registado.');
      return;
    }

    // Calcular valor total estimado
    const totalSemIva = parseFloat(preco) * parseFloat(horas);
    const totalComIva = totalSemIva * 1.23; // IVA a 23%

    try {
      const response = await fetch('/api/enviar-orcamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pedidoId: pedido.id,
          emailCliente: pedido.email,
          nomeCliente: pedido.nome_cliente,
          descricao: pedido.descricao_servico,
          precoHora: preco,
          minimoHoras: horas,
          totalSemIva: totalSemIva.toFixed(2),
          totalComIva: totalComIva.toFixed(2),
          dataServico: pedido.data_servico,
        }),
      });

      const resultado = await response.json();

      if (response.ok) {
        alert('Orçamento enviado com sucesso para o e-mail do cliente!');
        carregarPedidos();
      } else {
        alert('Erro ao enviar e-mail: ' + resultado.error);
      }
    } catch (err) {
      console.error(err);
      alert('Erro de ligação ao enviar o orçamento.');
    }
  };

  return (
    <main style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', color: '#fff', margin: 0 }}>Aprovação e Orçamentos de Clientes</h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>
          {pedidos.length} pedidos pendentes a aguardar definição de preço e proposta
        </p>
      </div>

      <div style={{ backgroundColor: '#1e293b', borderRadius: '14px', border: '1px solid #334155', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
              <th style={thStyle}>Cliente & Contactos</th>
              <th style={thStyle}>Detalhes do Serviço / Rota</th>
              <th style={thStyle}>Definir Condições (€ / Hora)</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                  A carregar pedidos pendentes...
                </td>
              </tr>
            ) : pedidos.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
                  Não existem pedidos pendentes de momento.
                </td>
              </tr>
            ) : (
              pedidos.map((pedido) => (
                <tr key={pedido.id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={tdStyle}>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{pedido.nome_cliente}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                      📞 {pedido.telemovel || 'N/A'}<br />
                      ✉️ {pedido.email || 'N/A'}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ color: '#fff', fontWeight: 'bold' }}>{pedido.descricao_servico}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                      🟢 Carga: {pedido.morada_carga || 'N/A'}<br />
                      🔴 Descarga: {pedido.morada_descarga || 'N/A'}<br />
                      📅 Data: {pedido.data_servico ? new Date(pedido.data_servico).toLocaleString('pt-PT') : 'N/A'}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div>
                        <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Preço/Hora (€)</label>
                        <input
                          type="number"
                          placeholder="Ex: 40"
                          value={precosHora[pedido.id] || ''}
                          onChange={(e) => setPrecosHora({ ...precosHora, [pedido.id]: e.target.value })}
                          style={inputStyleSmall}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Mín. Horas</label>
                        <input
                          type="number"
                          placeholder="Ex: 3"
                          value={minHoras[pedido.id] || ''}
                          onChange={(e) => setMinHoras({ ...minHoras, [pedido.id]: e.target.value })}
                          style={inputStyleSmall}
                        />
                      </div>
                    </div>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    <button
                      onClick={() => enviarOrcamento(pedido)}
                      style={{
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '13px',
                      }}
                    >
                      📧 Enviar Orçamento
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const thStyle: React.CSSProperties = { padding: '14px', fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '14px', fontSize: '14px', verticalAlign: 'middle' };
const inputStyleSmall: React.CSSProperties = { width: '90px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', padding: '8px', borderRadius: '6px', outline: 'none' };