'use client';

import React, { useState } from 'react';

// Item individual do inventário
interface ItemInventario {
  item: string;
  quantidade: number;
  categoria?: string;
}

// Estrutura detalhada do serviço
interface ServicoAgendado {
  id: string;
  hora: string;
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
  notas?: string;
  corBorda: string;
}

interface DiaAgenda {
  diaSemana: string;
  data: string;
  hoje?: boolean;
  servicos: ServicoAgendado[];
}

const EMPRESAS_MOCK = [
  {
    id: 'nortecargo',
    nome: 'NorteCargo (Mudanças & Transportes)',
    agenda: [
      {
        diaSemana: 'Seg',
        data: '24 Ago',
        servicos: [
          {
            id: 's1',
            hora: '09:00',
            titulo: 'Mudança T2 Completa',
            cliente: 'João Silva',
            telefone: '912 345 678',
            email: 'joao.silva@email.com',
            localOrigem: 'Rua de Santa Catarina, nº 450, 3º Dto, Porto',
            localDestino: 'Av. da República, nº 1200, 5º Esq, Vila Nova de Gaia',
            valor: 350,
            estadoPagamento: 'Sinal Pago',
            faturado: true,
            volume: '18 m³',
            inventario: [
              { item: 'Sofá Chaiselongue 3 Lugares', quantidade: 1, categoria: 'Sala' },
              { item: 'Móvel de TV + Televisão 55"', quantidade: 1, categoria: 'Sala' },
              { item: 'Mesa de Jantar + 6 Cadeiras', quantidade: 1, categoria: 'Sala' },
              { item: 'Cama Casal + Colchão King Size', quantidade: 1, categoria: 'Quarto Principal' },
              { item: 'Roupeiro 3 Portas (Para Desmontar)', quantidade: 1, categoria: 'Quarto Principal' },
              { item: 'Frigorífico Americano', quantidade: 1, categoria: 'Cozinha' },
              { item: 'Máquina de Lavar Roupa', quantidade: 1, categoria: 'Cozinha' },
              { item: 'Caixas de Cartão (Livros e Roupa)', quantidade: 25, categoria: 'Diversos' },
            ],
            notas: 'Prédio de origem sem elevador (3º andar). Necessário cuidado extra com a televisão e espelho de grandes dimensões.',
            corBorda: '#38bdf8',
          },
        ],
      },
      {
        diaSemana: 'Ter',
        data: '25 Ago',
        hoje: true,
        servicos: [
          {
            id: 's2',
            hora: '10:30',
            titulo: 'Transporte de Carga Empresarial',
            cliente: 'LogiTech Lda (Resp: Carlos)',
            telefone: '934 567 890',
            email: 'logistica@logitech.pt',
            localOrigem: 'Zona Industrial da Maia, Setor 4, Armazém 12',
            localDestino: 'Centro Logístico de Matosinhos, Cais 3',
            valor: 200,
            estadoPagamento: 'Pago',
            faturado: true,
            volume: '8 m³',
            inventario: [
              { item: 'Palete com Servidores / TI', quantidade: 2, categoria: 'Equipamento' },
              { item: 'Caixas com Monitores', quantidade: 10, categoria: 'Material' },
              { item: 'Cadeiras de Escritório Ergonómicas', quantidade: 6, categoria: 'Mobiliário' },
            ],
            notas: 'Carga paletizada com filme extensível. Apresentar guia de transporte no cais de receção.',
            corBorda: '#4ade80',
          },
          {
            id: 's3',
            hora: '14:30',
            titulo: 'Avaliação & Orçamento no Local',
            cliente: 'Maria Santos',
            telefone: '961 112 233',
            email: 'maria.santos@gmail.com',
            localOrigem: 'Rua Formosa, nº 88, Porto',
            localDestino: 'A definir no local',
            valor: 0,
            estadoPagamento: 'Pendente',
            faturado: false,
            volume: 'A medir',
            inventario: [
              { item: 'Visita técnica para medição de móveis antigos', quantidade: 1, categoria: 'Serviço' },
            ],
            notas: 'Verificar se o sofá de 3 lugares passa nas escadas do prédio ou se precisará de elevador exterior.',
            corBorda: '#facc15',
          },
        ],
      },
      { diaSemana: 'Qua', data: '26 Ago', servicos: [] },
      {
        diaSemana: 'Qui',
        data: '27 Ago',
        servicos: [
          {
            id: 's4',
            hora: '08:00',
            titulo: 'Mudança de Escritório Regional',
            cliente: 'Consultoria Alfa S.A.',
            telefone: '925 998 877',
            email: 'geral@consultoriaalfa.pt',
            localOrigem: 'Av. dos Aliados, nº 210, 2º Andar, Porto',
            localDestino: 'Centro Empresarial de Braga, Bloco B',
            valor: 850,
            estadoPagamento: 'Sinal Pago',
            faturado: false,
            volume: '35 m³',
            inventario: [
              { item: 'Secretárias Individuais', quantidade: 8, categoria: 'Escritório' },
              { item: 'Cadeiras Giratórias', quantidade: 12, categoria: 'Escritório' },
              { item: 'Blocos de Gavetas', quantidade: 8, categoria: 'Escritório' },
              { item: 'Armários Arquivadores de Aço', quantidade: 4, categoria: 'Arquivo' },
              { item: 'Caixas com Documentação', quantidade: 40, categoria: 'Arquivo' },
            ],
            notas: 'Necessários 3 ajudantes + 2 carrinhas de caixa aberta. Autorização de estacionamento na Av. dos Aliados já tratada.',
            corBorda: '#38bdf8',
          },
        ],
      },
      { diaSemana: 'Sex', data: '28 Ago', servicos: [] },
      {
        diaSemana: 'Sáb',
        data: '29 Ago',
        servicos: [
          {
            id: 's5',
            hora: '09:30',
            titulo: 'Mudança T3 Familiar',
            cliente: 'Carlos Rocha',
            telefone: '918 887 766',
            email: 'carlos.rocha@sapo.pt',
            localOrigem: 'Rua do Amial, Gondomar',
            localDestino: 'Rua Senhora da Luz, Foz do Douro, Porto',
            valor: 480,
            estadoPagamento: 'Pendente',
            faturado: false,
            volume: '24 m³',
            inventario: [
              { item: 'Cama Casal com Arrumação', quantidade: 1, categoria: 'Quarto' },
              { item: 'Camas Solteiro', quantidade: 2, categoria: 'Quarto' },
              { item: 'Móvel de Sala + Louceiro', quantidade: 1, categoria: 'Sala' },
              { item: 'Caixas de Louça Delicada / Cristais', quantidade: 15, categoria: 'Cozinha' },
            ],
            notas: 'Embalamento de louças delicadas e cristais incluído no preço final.',
            corBorda: '#38bdf8',
          },
        ],
      },
      { diaSemana: 'Dom', data: '30 Ago', servicos: [] },
    ] as DiaAgenda[],
    financas: {
      entrou: 14500,
      saiu: 6200,
      faturado: 11200,
      naoFaturado: 3300,
      despesasFixas: 3500,
      despesasVariaveis: 2700,
    },
  },
  {
    id: 'empresa_2',
    nome: 'Empresa 2 (Futuro Negócio)',
    agenda: [
      { diaSemana: 'Seg', data: '24 Ago', servicos: [] },
      { diaSemana: 'Ter', data: '25 Ago', hoje: true, servicos: [] },
      { diaSemana: 'Qua', data: '26 Ago', servicos: [] },
      { diaSemana: 'Qui', data: '27 Ago', servicos: [] },
      { diaSemana: 'Sex', data: '28 Ago', servicos: [] },
      { diaSemana: 'Sáb', data: '29 Ago', servicos: [] },
      { diaSemana: 'Dom', data: '30 Ago', servicos: [] },
    ],
    financas: {
      entrou: 0,
      saiu: 0,
      faturado: 0,
      naoFaturado: 0,
      despesasFixas: 0,
      despesasVariaveis: 0,
    },
  },
];

export default function DashboardCentralPage() {
  const [empresaSelecionadaId, setEmpresaSelecionadaId] = useState<string>('nortecargo');
  const [servicoSelecionado, setServicoSelecionado] = useState<ServicoAgendado | null>(null);

  const empresaAtiva =
    EMPRESAS_MOCK.find((e) => e.id === empresaSelecionadaId) || EMPRESAS_MOCK[0];
  const { financas, agenda } = empresaAtiva;

  const saldoLiquidoFaturado = financas.faturado - financas.saiu;
  const saldoTotalEstimado = financas.entrou - financas.saiu;
  const totalServicosSemana = agenda.reduce((acc, dia) => acc + dia.servicos.length, 0);

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      
      {/* CABEÇALHO */}
      <header style={{ maxWidth: '1200px', margin: '0 auto 24px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0, color: '#ffffff' }}>Painel de Saúde Empresarial</h1>
          <p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontSize: '16px' }}>Gestão central e controlo financeiro interno</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <label style={{ fontSize: '15px', color: '#cbd5e1', fontWeight: 600 }}>Negócio Ativo:</label>
          <select
            value={empresaSelecionadaId}
            onChange={(e) => setEmpresaSelecionadaId(e.target.value)}
            style={{ backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', padding: '12px 18px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}
          >
            {EMPRESAS_MOCK.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.nome}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* QUADRO AMPLIADO DE SERVIÇOS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 28px auto' }}>
        <div style={{ ...cardStyle, padding: '28px' }}>
          <div style={{ ...cardHeaderStyle, marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>Agenda Semanal de Serviços</span>
              <span style={{ fontSize: '14px', backgroundColor: '#0284c7', color: '#ffffff', padding: '4px 12px', borderRadius: '6px', fontWeight: 700 }}>
                {totalServicosSemana} Agendamentos
              </span>
            </div>
            <span style={{ fontSize: '14px', color: '#38bdf8', fontWeight: 700 }}>Clica num serviço para abrir detalhes + inventário</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: '14px' }}>
            {agenda.map((dia) => (
              <div
                key={dia.diaSemana}
                style={{
                  backgroundColor: dia.hoje ? '#0f172a' : '#111827',
                  border: dia.hoje ? '2px solid #38bdf8' : '1px solid #334155',
                  borderRadius: '10px',
                  padding: '14px',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: dia.hoje ? '#38bdf8' : '#cbd5e1' }}>
                    {dia.diaSemana} {dia.hoje && '(Hoje)'}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{dia.data}</span>
                </div>

                {dia.servicos.length === 0 ? (
                  <span style={{ fontSize: '13px', color: '#475569', fontStyle: 'italic', marginTop: '8px' }}>Sem serviços</span>
                ) : (
                  dia.servicos.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setServicoSelecionado(s)}
                      style={{
                        backgroundColor: '#1e293b',
                        borderLeft: `5px solid ${s.corBorda}`,
                        padding: '10px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease, backgroundColor 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.backgroundColor = '#334155';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.backgroundColor = '#1e293b';
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: '13px', color: '#f8fafc' }}>
                        {s.hora} - {s.titulo}
                      </div>
                      <div style={{ color: '#cbd5e1', fontSize: '12px', marginTop: '4px', fontWeight: 600 }}>
                        👤 {s.cliente}
                      </div>
                      <div style={{ color: '#4ade80', fontSize: '13px', marginTop: '3px', fontWeight: 800 }}>
                        {s.valor > 0 ? `${s.valor} €` : 'A Avaliar'}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRELHA DOS 4 PAINÉIS FINANCEIROS */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        
        {/* PAINEL 1 */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#94a3b8' }}>1. FLUXO DE CAIXA</span>
            <span style={{ fontSize: '12px', backgroundColor: '#334155', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px' }}>Entrou / Saiu</span>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '14px', color: '#cbd5e1' }}>Total Receitas</span>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#4ade80', marginTop: '2px' }}>
                + {financas.entrou.toLocaleString('pt-PT')} €
              </div>
            </div>

            <div style={{ borderTop: '1px solid #334155', paddingTop: '12px' }}>
              <span style={{ fontSize: '14px', color: '#cbd5e1' }}>Total Despesas</span>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#f87171', marginTop: '2px' }}>
                - {financas.saiu.toLocaleString('pt-PT')} €
              </div>
            </div>
          </div>
        </div>

        {/* PAINEL 2 */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#94a3b8' }}>2. FATURAÇÃO</span>
            <span style={{ fontSize: '12px', backgroundColor: '#334155', color: '#facc15', padding: '2px 8px', borderRadius: '4px' }}>Estado</span>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '14px', color: '#cbd5e1' }}>Saldo Faturado</span>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
                {financas.faturado.toLocaleString('pt-PT')} €
              </div>
            </div>

            <div style={{ borderTop: '1px solid #334155', paddingTop: '12px' }}>
              <span style={{ fontSize: '14px', color: '#cbd5e1' }}>Pendente Faturação</span>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#facc15', marginTop: '2px' }}>
                {financas.naoFaturado.toLocaleString('pt-PT')} €
              </div>
            </div>
          </div>
        </div>

        {/* PAINEL 3 */}
        <div style={{ ...cardStyle, borderLeft: '4px solid #16a34a' }}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#94a3b8' }}>3. BALANÇO INTERNO</span>
            <span style={{ fontSize: '12px', backgroundColor: '#14532d', color: '#4ade80', padding: '2px 8px', borderRadius: '4px' }}>Lucro Real</span>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '14px', color: '#cbd5e1' }}>Lucro Líquido Real</span>
              <div style={{ fontSize: '28px', fontWeight: 800, color: saldoLiquidoFaturado >= 0 ? '#4ade80' : '#f87171', marginTop: '2px' }}>
                {saldoLiquidoFaturado.toLocaleString('pt-PT')} €
              </div>
            </div>

            <div style={{ borderTop: '1px solid #334155', paddingTop: '12px' }}>
              <span style={{ fontSize: '14px', color: '#cbd5e1' }}>Balanço Potencial</span>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                {saldoTotalEstimado.toLocaleString('pt-PT')} €
              </div>
            </div>
          </div>
        </div>

        {/* PAINEL 4 */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#94a3b8' }}>4. CUSTOS E MARGEM</span>
            <span style={{ fontSize: '12px', backgroundColor: '#334155', color: '#cbd5e1', padding: '2px 8px', borderRadius: '4px' }}>Métricas</span>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
              <span style={{ color: '#94a3b8' }}>Despesas Fixas:</span>
              <span style={{ fontWeight: 700, color: '#f8fafc' }}>{financas.despesasFixas.toLocaleString('pt-PT')} €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
              <span style={{ color: '#94a3b8' }}>Despesas Variáveis:</span>
              <span style={{ fontWeight: 700, color: '#f8fafc' }}>{financas.despesasVariaveis.toLocaleString('pt-PT')} €</span>
            </div>
            <div style={{ borderTop: '1px solid #334155', paddingTop: '12px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
              <span style={{ color: '#cbd5e1', fontWeight: 700 }}>Margem Operacional:</span>
              <span style={{ fontWeight: 800, color: '#4ade80' }}>
                {financas.entrou > 0 ? ((saldoTotalEstimado / financas.entrou) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>

      </main>

      {/* POP-UP / MODAL AMPLIADO DE DETALHES + INVENTÁRIO */}
      {servicoSelecionado && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justify: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={() => setServicoSelecionado(null)}
        >
          <div
            style={{
              backgroundColor: '#1e293b',
              border: '2px solid #334155',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '750px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              color: '#f8fafc',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CABEÇALHO DO MODAL */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #334155', paddingBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '15px', color: servicoSelecionado.corBorda, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {servicoSelecionado.hora} • {servicoSelecionado.titulo}
                </span>
                <h2 style={{ margin: '6px 0 0 0', fontSize: '28px', fontWeight: 800 }}>
                  {servicoSelecionado.cliente}
                </h2>
              </div>
              <button
                onClick={() => setServicoSelecionado(null)}
                style={{ backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontWeight: 800, fontSize: '18px' }}
              >
                ✕
              </button>
            </div>

            {/* CONTEÚDO PRINCIPAL DO POP-UP */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginTop: '20px' }}>
              
              {/* 1. SEÇÃO DE CONTACTO E ESTADO FINANCEIRO */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', backgroundColor: '#0f172a', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
                <div>
                  <span style={modalLabelStyle}>Contacto Telefónico</span>
                  <div style={modalValueStyle}>📞 {servicoSelecionado.telefone}</div>
                </div>

                <div>
                  <span style={modalLabelStyle}>E-mail</span>
                  <div style={modalValueStyle}>✉️ {servicoSelecionado.email}</div>
                </div>

                <div>
                  <span style={modalLabelStyle}>Valor Acordado</span>
                  <div style={{ ...modalValueStyle, color: '#4ade80', fontSize: '22px', fontWeight: 800 }}>
                    {servicoSelecionado.valor > 0 ? `${servicoSelecionado.valor} €` : 'A Avaliar'}
                  </div>
                </div>

                <div>
                  <span style={modalLabelStyle}>Estado do Pagamento</span>
                  <div style={{ ...modalValueStyle, color: servicoSelecionado.estadoPagamento === 'Pago' ? '#4ade80' : '#facc15' }}>
                    💳 {servicoSelecionado.estadoPagamento}
                  </div>
                </div>

                <div>
                  <span style={modalLabelStyle}>Faturação</span>
                  <div style={{ ...modalValueStyle, color: servicoSelecionado.faturado ? '#38bdf8' : '#f87171' }}>
                    📄 {servicoSelecionado.faturado ? 'Faturado (Emitido)' : 'Pendente de Fatura'}
                  </div>
                </div>

                <div>
                  <span style={modalLabelStyle}>Volume Estimado</span>
                  <div style={modalValueStyle}>📦 {servicoSelecionado.volume}</div>
                </div>
              </div>

              {/* 2. TRAJETO (ORIGEM E DESTINO) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <span style={modalLabelStyle}>📍 Local de Origem</span>
                  <div style={modalAddressStyle}>{servicoSelecionado.localOrigem}</div>
                </div>

                <div>
                  <span style={modalLabelStyle}>🏁 Local de Destino</span>
                  <div style={modalAddressStyle}>{servicoSelecionado.localDestino}</div>
                </div>
              </div>

              {/* 3. INVENTÁRIO COMPLETO DE CARGA */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#38bdf8' }}>📦 Inventário de Carga</span>
                  <span style={{ fontSize: '14px', backgroundColor: '#0284c7', color: '#fff', padding: '3px 10px', borderRadius: '6px', fontWeight: 700 }}>
                    Total: {servicoSelecionado.inventario.reduce((acc, item) => acc + item.quantidade, 0)} itens
                  </span>
                </div>

                <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
                        <th style={tableHeaderStyle}>Item / Descrição</th>
                        <th style={{ ...tableHeaderStyle, width: '120px', textAlign: 'center' }}>Qtd</th>
                        <th style={tableHeaderStyle}>Categoria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicoSelecionado.inventario.map((inv, idx) => (
                        <tr key={idx} style={{ borderBottom: idx !== servicoSelecionado.inventario.length - 1 ? '1px solid #1e293b' : 'none' }}>
                          <td style={{ ...tableCellStyle, fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>{inv.item}</td>
                          <td style={{ ...tableCellStyle, fontSize: '18px', fontWeight: 800, color: '#4ade80', textAlign: 'center' }}>
                            x{inv.quantidade}
                          </td>
                          <td style={{ ...tableCellStyle, fontSize: '15px', color: '#94a3b8' }}>
                            {inv.categoria || 'Geral'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. NOTAS E OBSERVAÇÕES */}
              {servicoSelecionado.notas && (
                <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #facc15' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#facc15', textTransform: 'uppercase' }}>⚠️ Notas & Observações da Operação</span>
                  <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: '#cbd5e1', lineHeight: '1.5', fontWeight: 600 }}>
                    {servicoSelecionado.notas}
                  </p>
                </div>
              )}

            </div>

            {/* BOTÃO DE FECHAR */}
            <button
              onClick={() => setServicoSelecionado(null)}
              style={{
                width: '100%',
                backgroundColor: '#0284c7',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '16px',
                marginTop: '26px',
                fontWeight: 800,
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// ESTILOS REUTILIZÁVEIS
const cardStyle: React.CSSProperties = {
  backgroundColor: '#1e293b',
  borderRadius: '12px',
  padding: '20px',
  border: '1px solid #334155',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
};

const cardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justify: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #334155',
  paddingBottom: '12px',
};

const modalLabelStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#94a3b8',
  fontWeight: 800,
  textTransform: 'uppercase',
  display: 'block',
};

const modalValueStyle: React.CSSProperties = {
  fontSize: '17px',
  color: '#f8fafc',
  fontWeight: 700,
  marginTop: '4px',
};

const modalAddressStyle: React.CSSProperties = {
  fontSize: '17px',
  color: '#ffffff',
  fontWeight: 700,
  backgroundColor: '#0f172a',
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1px solid #334155',
  marginTop: '4px',
};

const tableHeaderStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '13px',
  fontWeight: 800,
  color: '#94a3b8',
  textTransform: 'uppercase',
};

const tableCellStyle: React.CSSProperties = {
  padding: '12px 16px',
};