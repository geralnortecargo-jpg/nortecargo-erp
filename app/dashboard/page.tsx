'use client';

import React, { useState } from 'react';

interface ItemInventario {
  item: string;
  quantidade: number;
}

interface ServicoAgendado {
  id: string;
  hora: string;
  data: string; // Ex: '26 Ago' ou número do dia
  diaNumero: number;
  titulo: string;
  cliente: string;
  telefone: string;
  email: string;
  localOrigem: string;
  localDestino: string;
  valor: number;
  estadoPagamento: 'Pago' | 'Pendente' | 'Sinal Pago';
  faturado: boolean;
  volume: string;
  inventario: ItemInventario[];
  corBorda: string;
}

interface DiaMes {
  diaNumero: number;
  nomeDia: string;
  hoje?: boolean;
  servicos: ServicoAgendado[];
}

export default function DashboardPage() {
  const [empresaSelecionadaId, setEmpresaSelecionadaId] = useState<string>('nortecargo');
  const [abaAtiva, setAbaAtiva] = useState<'inicio' | 'servicos'>('inicio');
  const [servicoSelecionado, setServicoSelecionado] = useState<ServicoAgendado | null>(null);

  // Estados dos modais
  const [modalClienteAberto, setModalClienteAberto] = useState(false);
  const [modalServicoAberto, setModalServicoAberto] = useState(false);

  // Campos do formulário
  const [nomeCliente, setNomeCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');

  const [tituloServico, setTituloServico] = useState('');
  const [diaServico, setDiaServico] = useState('26');
  const [horaServico, setHoraServico] = useState('10:00');
  const [origemServico, setOrigemServico] = useState('');
  const [destinoServico, setDestinoServico] = useState('');
  const [valorServico, setValorServico] = useState('');
  const [volumeServico, setVolumeServico] = useState('Médio');

  // Gerar os dias do mês de Agosto (31 dias) por defeito
  const gerarDiasDoMes = (): DiaMes[] => {
    const diasArray: DiaMes[] = [];
    const nomesSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    for (let i = 1; i <= 31; i++) {
      // 1 de Agosto de 2026 começa a um Sábado (índice 6) por exemplo, ou simulamos a sequência
      const indiceSemana = (i + 5) % 7;
      diasArray.push({
        diaNumero: i,
        nomeDia: nomesSemana[indiceSemana],
        hoje: i === 26, // 26 de Agosto como dia atual
        servicos: []
      });
    }
    return diasArray;
  };

  const [diasMes, setDiasMes] = useState<DiaMes[]>(gerarDiasDoMes());

  const [financas, setFinancas] = useState({
    entrou: 0,
    saiu: 0,
    faturado: 0,
    naoFaturado: 0,
  });

  const todosOsServicos: ServicoAgendado[] = diasMes.flatMap((d) => d.servicos);
  const saldoLiquidoFaturado = financas.faturado - financas.saiu;
  const saldoTotalEstimado = financas.entrou - financas.saiu;
  const totalServicosMes = todosOsServicos.length;

  // Guardar novo serviço / cliente
  const guardarServico = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeCliente || !tituloServico) {
      alert('Por favor, preenche pelo menos o nome do cliente e o título do serviço.');
      return;
    }

    const diaNum = Number(diaServico) || 26;

    const novoServico: ServicoAgendado = {
      id: Date.now().toString(),
      hora: horaServico,
      data: `${diaNum} Ago`,
      diaNumero: diaNum,
      titulo: tituloServico,
      cliente: nomeCliente,
      telefone: telefoneCliente || 'Não especificado',
      email: emailCliente || 'Não especificado',
      localOrigem: origemServico || 'Porto',
      localDestino: destinoServico || 'Lisboa',
      valor: Number(valorServico) || 0,
      estadoPagamento: 'Pendente',
      faturado: false,
      volume: volumeServico,
      inventario: [
        { item: 'Caixas de papelão', quantidade: 10 },
        { item: 'Móvel / Diversos', quantidade: 2 },
      ],
      corBorda: '#38bdf8',
    };

    // Adicionar ao dia correspondente no mês
    setDiasMes(prev => prev.map(dia => {
      if (dia.diaNumero === diaNum) {
        return { ...dia, servicos: [...dia.servicos, novoServico] };
      }
      return dia;
    }));

    // Atualizar finanças
    const valNum = Number(valorServico) || 0;
    if (valNum > 0) {
      setFinancas(f => ({
        ...f,
        naoFaturado: f.naoFaturado + valNum,
        entrou: f.entrou + valNum
      }));
    }

    // Fechar modais e limpar
    setModalServicoAberto(false);
    setModalClienteAberto(false);
    setNomeCliente('');
    setTelefoneCliente('');
    setEmailCliente('');
    setTituloServico('');
    setValorServico('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* BARRA SUPERIOR */}
      <nav style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: 900, color: '#38bdf8' }}>
          NORTE<span style={{ color: '#4ade80' }}>CARGO</span> 
          <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'normal', marginLeft: '10px' }}>| Sistema de Gestão Interna</span>
        </span>
        <select
          value={empresaSelecionadaId}
          onChange={(e) => setEmpresaSelecionadaId(e.target.value)}
          style={{ backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 700 }}
        >
          <option value="nortecargo">NorteCargo (Mudanças & Transportes)</option>
        </select>
      </nav>

      {/* CORPO PRINCIPAL */}
      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* SIDEBAR */}
        <aside style={{ width: '260px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column', padding: '20px', gap: '12px' }}>
          
          <button
            onClick={() => setAbaAtiva('inicio')}
            style={{
              backgroundColor: abaAtiva === 'inicio' ? '#0284c7' : 'transparent',
              color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 14px', textAlign: 'left', fontWeight: 800, cursor: 'pointer', fontSize: '14px'
            }}
          >
            📊 Painel Geral
          </button>

          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', paddingLeft: '4px' }}>
              👥 Gestão de Clientes
            </div>
            
            <button
              onClick={() => setAbaAtiva('servicos')}
              style={{
                backgroundColor: abaAtiva === 'servicos' ? '#14532d' : 'transparent',
                color: abaAtiva === 'servicos' ? '#4ade80' : '#cbd5e1',
                border: 'none', borderRadius: '8px', padding: '10px 14px 10px 20px', textAlign: 'left', fontWeight: 700, cursor: 'pointer', fontSize: '14px'
              }}
            >
              🛠️ Serviços
            </button>
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid #334155', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', paddingLeft: '4px' }}>
              Ações Rápidas
            </div>

            <button
              onClick={() => setModalClienteAberto(true)}
              style={{ backgroundColor: '#0369a1', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 14px', textAlign: 'left', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}
            >
              👤 Adicionar Cliente
            </button>

            <button
              onClick={() => setModalServicoAberto(true)}
              style={{ backgroundColor: '#15803d', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 14px', textAlign: 'left', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}
            >
              ➕ Adicionar Serviço
            </button>
          </div>
        </aside>

        {/* CONTEÚDO */}
        <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
          {abaAtiva === 'inicio' && (
            <div>
              <header style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>Painel de Saúde Empresarial</h1>
                <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '15px' }}>Controlo financeiro e agenda mensal completa</p>
              </header>

              {/* AGENDA MENSAL COMPLETA */}
              <section style={{ ...cardStyle, marginBottom: '24px' }}>
                <div style={{ ...cardHeaderStyle, marginBottom: '16px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 800 }}>📅 Agenda Completa de Agosto de 2026</span>
                  <span style={{ fontSize: '13px', backgroundColor: '#0284c7', color: '#fff', padding: '3px 10px', borderRadius: '6px', fontWeight: 700 }}>
                    {totalServicosMes} Agendamentos este mês
                  </span>
                </div>

                {/* GRELHA DO MÊS (7 colunas para os dias da semana) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                    <div key={d} style={{ textAlign: 'center', fontSize: '12px', fontWeight: 800, color: '#94a3b8', paddingBottom: '6px' }}>
                      {d}
                    </div>
                  ))}

                  {diasMes.map((dia) => (
                    <div
                      key={dia.diaNumero}
                      style={{
                        backgroundColor: dia.hoje ? '#0f172a' : '#111827',
                        border: dia.hoje ? '2px solid #38bdf8' : '1px solid #334155',
                        borderRadius: '8px',
                        padding: '8px',
                        minHeight: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, borderBottom: '1px solid #1e293b', paddingBottom: '3px', color: dia.hoje ? '#38bdf8' : '#cbd5e1' }}>
                        <span>{dia.diaNumero}</span>
                        <span style={{ fontSize: '10px', color: '#64748b' }}>{dia.nomeDia}</span>
                      </div>

                      {dia.servicos.length === 0 ? (
                        <span style={{ fontSize: '10px', color: '#334155', fontStyle: 'italic' }}>-</span>
                      ) : (
                        dia.servicos.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => setServicoSelecionado(s)}
                            style={{ backgroundColor: '#1e293b', borderLeft: `3px solid ${s.corBorda}`, padding: '4px 6px', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            <div style={{ fontWeight: 800, fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.hora} {s.titulo}</div>
                            <div style={{ color: '#4ade80', fontSize: '10px', fontWeight: 800 }}>{s.valor > 0 ? `${s.valor} €` : 'Avaliar'}</div>
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* FINANCEIRO */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={cardStyle}>
                  <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 700 }}>FLUXO DE CAIXA</span>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#4ade80', marginTop: '8px' }}>+ {financas.entrou.toLocaleString('pt-PT')} €</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#f87171', marginTop: '4px' }}>- {financas.saiu.toLocaleString('pt-PT')} €</div>
                </div>

                <div style={cardStyle}>
                  <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 700 }}>FATURAÇÃO</span>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#38bdf8', marginTop: '8px' }}>{financas.faturado.toLocaleString('pt-PT')} €</div>
                  <div style={{ fontSize: '14px', color: '#facc15', marginTop: '8px' }}>Pendente: {financas.naoFaturado.toLocaleString('pt-PT')} €</div>
                </div>

                <div style={{ ...cardStyle, borderLeft: '4px solid #16a34a' }}>
                  <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 700 }}>LUCRO LÍQUIDO REAL</span>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#4ade80', marginTop: '8px' }}>{saldoLiquidoFaturado.toLocaleString('pt-PT')} €</div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '6px' }}>Potencial: {saldoTotalEstimado.toLocaleString('pt-PT')} €</div>
                </div>
              </div>
            </div>
          )}

          {abaAtiva === 'servicos' && (
            <div>
              <header style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>Listagem de Serviços Realizados</h1>
                <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '15px' }}>Clica num serviço para ver o cliente associado e detalhes</p>
              </header>

              <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
                {todosOsServicos.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
                    Ainda não existem serviços registados. Usa o botão verde "Adicionar Serviço" na barra lateral.
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
                        <th style={tableHeaderStyle}>Data / Hora</th>
                        <th style={tableHeaderStyle}>Serviço</th>
                        <th style={tableHeaderStyle}>Cliente Associado</th>
                        <th style={tableHeaderStyle}>Valor</th>
                        <th style={tableHeaderStyle}>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todosOsServicos.map((s, idx) => (
                        <tr
                          key={s.id}
                          onClick={() => setServicoSelecionado(s)}
                          style={{ borderBottom: idx !== todosOsServicos.length - 1 ? '1px solid #334155' : 'none', cursor: 'pointer' }}
                        >
                          <td style={tableCellStyle}><span style={{ fontWeight: 800, color: '#38bdf8' }}>{s.data}</span> ({s.hora})</td>
                          <td style={{ ...tableCellStyle, fontWeight: 700, color: '#fff' }}>{s.titulo}</td>
                          <td style={{ ...tableCellStyle, color: '#4ade80', fontWeight: 800 }}>👤 {s.cliente}</td>
                          <td style={{ ...tableCellStyle, fontWeight: 800, color: '#f8fafc' }}>{s.valor > 0 ? `${s.valor} €` : 'A Avaliar'}</td>
                          <td style={tableCellStyle}>
                            <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, backgroundColor: '#713f12', color: '#facc15' }}>
                              {s.estadoPagamento}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL ADICIONAR CLIENTE / SERVIÇO */}
      {(modalClienteAberto || modalServicoAberto) && (
        <div style={modalOverlayStyle} onClick={() => { setModalClienteAberto(false); setModalServicoAberto(false); }}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#38bdf8' }}>
                {modalClienteAberto ? '👤 Registar Novo Cliente' : '➕ Agendar Novo Serviço'}
              </h3>
              <button onClick={() => { setModalClienteAberto(false); setModalServicoAberto(false); }} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer', fontWeight: 800 }}>✕</button>
            </div>

            <form onSubmit={guardarServico} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={modalLabelStyle}>Nome do Cliente *</label>
                <input
                  type="text"
                  placeholder="Ex: Empresa Exemplo / João Silva"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={modalLabelStyle}>Telemóvel</label>
                  <input
                    type="text"
                    placeholder="912345678"
                    value={telefoneCliente}
                    onChange={(e) => setTelefoneCliente(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={modalLabelStyle}>E-mail</label>
                  <input
                    type="email"
                    placeholder="cliente@email.com"
                    value={emailCliente}
                    onChange={(e) => setEmailCliente(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={modalLabelStyle}>Título do Serviço *</label>
                <input
                  type="text"
                  placeholder="Ex: Mudança T2 para Foz"
                  value={tituloServico}
                  onChange={(e) => setTituloServico(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={modalLabelStyle}>Dia do Mês (1 a 31)</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={diaServico}
                    onChange={(e) => setDiaServico(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={modalLabelStyle}>Hora</label>
                  <input
                    type="text"
                    value={horaServico}
                    onChange={(e) => setHoraServico(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={modalLabelStyle}>Origem</label>
                  <input
                    type="text"
                    placeholder="Morada de recolha"
                    value={origemServico}
                    onChange={(e) => setOrigemServico(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={modalLabelStyle}>Destino</label>
                  <input
                    type="text"
                    placeholder="Morada de entrega"
                    value={destinoServico}
                    onChange={(e) => setDestinoServico(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={modalLabelStyle}>Valor (€)</label>
                <input
                  type="number"
                  placeholder="250"
                  value={valorServico}
                  onChange={(e) => setValorServico(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', marginTop: '10px' }}
              >
                Guardar e Registar no Mês
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// ESTILOS
const cardStyle: React.CSSProperties = { backgroundColor: '#1e293b', borderRadius: '12px', padding: '18px', border: '1px solid #334155' };
const cardHeaderStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '10px' };
const modalLabelStyle: React.CSSProperties = { fontSize: '12px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '4px' };
const inputStyle: React.CSSProperties = { width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', padding: '10px', color: '#fff', fontSize: '14px', outline: 'none' };
const tableHeaderStyle: React.CSSProperties = { padding: '12px 16px', fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' };
const tableCellStyle: React.CSSProperties = { padding: '12px 16px', fontSize: '14px' };
const modalOverlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' };
const modalContentStyle: React.CSSProperties = { backgroundColor: '#1e293b', border: '2px solid #334155', borderRadius: '16px', padding: '24px', maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' };