'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Cliente {
  id: string;
  nome: string;
  telemovel?: string;
  email?: string;
  morada?: string;
}

interface Servico {
  id: string;
  cliente_id: string;
  descricao: string;
  morada_carga?: string;
  morada_descarga?: string;
  horas_trabalhadas?: number;
  material_usado?: string;
  valor_sem_iva?: number;
  valor_com_iva?: number;
  estado_faturacao?: string;
  estado: string;
  data_servico?: string;
  created_at: string;
}

export default function DetalheClientePage() {
  const params = useParams();
  const router = useRouter();
  const clienteId = params.id as string;

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados do Modal de Novo Serviço Detalhado
  const [modalServicoAberto, setModalServicoAberto] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [moradaCarga, setMoradaCarga] = useState('');
  const [moradaDescarga, setMoradaDescarga] = useState('');
  const [horasTrabalhadas, setHorasTrabalhadas] = useState('');
  const [materialUsado, setMaterialUsado] = useState('');
  const [valorSemIva, setValorSemIva] = useState('');
  const [valorComIva, setValorComIva] = useState('');
  const [dataServico, setDataServico] = useState('');
  const [estadoFaturacao, setEstadoFaturacao] = useState('Por facturar');
  const [estado, setEstado] = useState('Pendente');

  const carregarDados = async () => {
    if (!clienteId || clienteId === 'id') return;
    setLoading(true);

    const { data: clienteData } = await supabase.from('clientes').select('*').eq('id', clienteId).single();
    if (clienteData) setCliente(clienteData);

    const { data: servicosData } = await supabase.from('servicos').select('*').eq('cliente_id', clienteId).order('data_servico', { ascending: false });
    if (servicosData) setServicos(servicosData || []);

    setLoading(false);
  };

  useEffect(() => {
    carregarDados();
  }, [clienteId]);

  // Função automática para calcular o valor com IVA (23%)
  const handleValorSemIvaChange = (val: string) => {
    setValorSemIva(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const comIva = num * 1.23; // Taxa de IVA padrão (23%)
      setValorComIva(comIva.toFixed(2));
    } else {
      setValorComIva('');
    }
  };

  const handleGuardarServico = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('servicos').insert([
      {
        cliente_id: clienteId,
        descricao,
        morada_carga: moradaCarga,
        morada_descarga: moradaDescarga,
        horas_trabalhadas: horasTrabalhadas ? parseFloat(horasTrabalhadas) : 0,
        material_usado: materialUsado,
        valor_sem_iva: valorSemIva ? parseFloat(valorSemIva) : 0,
        valor_com_iva: valorComIva ? parseFloat(valorComIva) : 0,
        estado_faturacao: estadoFaturacao,
        estado,
        data_servico: dataServico ? new Date(dataServico).toISOString() : new Date().toISOString(),
      },
    ]);

    if (error) {
      alert('Erro ao guardar serviço: ' + error.message);
    } else {
      setModalServicoAberto(false);
      // Limpar campos
      setDescricao('');
      setMoradaCarga('');
      setMoradaDescarga('');
      setHorasTrabalhadas('');
      setMaterialUsado('');
      setValorSemIva('');
      setValorComIva('');
      setDataServico('');
      setEstadoFaturacao('Por facturar');
      setEstado('Pendente');
      carregarDados();
    }
  };

  if (loading) return <div style={{ padding: '40px', color: '#fff' }}>A carregar dados...</div>;
  if (!cliente) return <div style={{ padding: '40px', color: '#fff' }}>Cliente não encontrado.</div>;

  return (
    <main style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <button onClick={() => router.push('/dashboard/clientes')} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '15px', marginBottom: '20px', padding: 0 }}>
        ← Voltar à Lista de Clientes
      </button>

      {/* Cartão do Cliente */}
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '14px', padding: '24px', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '26px', color: '#fff', margin: '0 0 10px 0' }}>{cliente.nome}</h1>
        <div style={{ display: 'flex', gap: '24px', color: '#94a3b8', fontSize: '14px', flexWrap: 'wrap' }}>
          <p style={{ margin: 0 }}>📞 Telemóvel: <span style={{ color: '#fff' }}>{cliente.telemovel || 'N/A'}</span></p>
          <p style={{ margin: 0 }}>✉️ Email: <span style={{ color: '#fff' }}>{cliente.email || 'N/A'}</span></p>
          <p style={{ margin: 0 }}>📍 Morada: <span style={{ color: '#fff' }}>{cliente.morada || 'N/A'}</span></p>
        </div>
      </div>

      {/* Cabeçalho de Serviços */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', margin: 0 }}>Serviços Realizados ({servicos.length})</h2>
        <button
          onClick={() => setModalServicoAberto(true)}
          style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 16px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          + Adicionar Serviço Completo
        </button>
      </div>

      {/* Tabela de Serviços Detalhada */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '14px', border: '1px solid #334155', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
              <th style={thStyle}>Descrição / Rotas</th>
              <th style={thStyle}>Data e Hora</th>
              <th style={thStyle}>Horas / Material</th>
              <th style={thStyle}>Valores (€)</th>
              <th style={thStyle}>Faturação</th>
              <th style={thStyle}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {servicos.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>Ainda sem serviços registados para este cliente.</td>
              </tr>
            ) : (
              servicos.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={tdStyle}>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{s.descricao}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                      🟢 Carga: {s.morada_carga || 'N/A'}<br />
                      🔴 Descarga: {s.morada_descarga || 'N/A'}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: '13px', color: '#38bdf8' }}>
                      {s.data_servico ? new Date(s.data_servico).toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' }) : 'N/A'}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: '13px', color: '#fff' }}>⏱️ {s.horas_trabalhadas || 0}h</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>📦 {s.material_usado || 'Nenhum'}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: '13px', color: '#fff' }}>s/IVA: {s.valor_sem_iva || 0} €</div>
                    <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 'bold' }}>c/IVA: {s.valor_com_iva || 0} €</div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      backgroundColor: s.estado_faturacao === 'Facturado' ? '#065f46' : '#854d0e',
                      color: '#fff'
                    }}>
                      {s.estado_faturacao || 'Por facturar'}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      backgroundColor: s.estado === 'Concluído' ? '#1e3a8a' : '#334155',
                      color: '#fff'
                    }}>
                      {s.estado}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Avançado de Registo de Serviço */}
      {modalServicoAberto && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px', maxWidth: '550px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '20px' }}>Registar Serviço Detalhado</h3>
            
            <form onSubmit={handleGuardarServico} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Descrição do Serviço</label>
                <input required type="text" placeholder="Ex: Transporte de carga Porto - Lisboa" value={descricao} onChange={(e) => setDescricao(e.target.value)} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Data e Hora do Serviço (Ex: Hoje às 18:00)</label>
                <input required type="datetime-local" value={dataServico} onChange={(e) => setDataServico(e.target.value)} style={inputStyle} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Morada de Carga</label>
                  <input type="text" placeholder="Ex: Rua A, Porto" value={moradaCarga} onChange={(e) => setMoradaCarga(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Morada de Descarga</label>
                  <input type="text" placeholder="Ex: Rua B, Lisboa" value={moradaDescarga} onChange={(e) => setMoradaDescarga(e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Nº de Horas Trabalhadas</label>
                  <input type="number" step="0.5" placeholder="Ex: 4" value={horasTrabalhadas} onChange={(e) => setHorasTrabalhadas(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Material Usado</label>
                  <input type="text" placeholder="Ex: Caixas, Fita, Paletes" value={materialUsado} onChange={(e) => setMaterialUsado(e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Valor s/ IVA (€)</label>
                  <input type="number" step="0.01" placeholder="0.00" value={valorSemIva} onChange={(e) => handleValorSemIvaChange(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Valor c/ IVA (€) [Auto]</label>
                  <input type="number" step="0.01" placeholder="0.00" value={valorComIva} onChange={(e) => setValorComIva(e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Estado da Faturação</label>
                  <select value={estadoFaturacao} onChange={(e) => setEstadoFaturacao(e.target.value)} style={inputStyle}>
                    <option value="Por facturar">Por facturar</option>
                    <option value="Facturado">Facturado</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Estado do Trabalho</label>
                  <select value={estado} onChange={(e) => setEstado(e.target.value)} style={inputStyle}>
                    <option value="Pendente">Pendente</option>
                    <option value="Em Curso">Em Curso</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setModalServicoAberto(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Guardar Serviço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

const thStyle: React.CSSProperties = { padding: '12px', fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '12px', fontSize: '14px', verticalAlign: 'middle' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '4px' };
const inputStyle: React.CSSProperties = { width: '100%', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', padding: '9px', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' };