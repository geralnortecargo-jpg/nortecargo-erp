'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

interface Step {
  title: string;
  desc: string;
}

interface ModalData {
  title: string;
  intro: string;
  steps: Step[];
}

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);

  // Estados para o formulário detalhado de orçamentos (Inventário)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    origem: '',
    destino: '',
    // Quartos
    camas: 0,
    mesinhasCabeceira: 0,
    // Sala
    sofas2Lugares: 0,
    mesas: 0,
    // Outros detalhes
    mensagem: '',
  });

  const handleIncrement = (field: keyof typeof formData) => {
    if (typeof formData[field] === 'number') {
      setFormData({ ...formData, [field]: (formData[field] as number) + 1 });
    }
  };

  const handleDecrement = (field: keyof typeof formData) => {
    if (typeof formData[field] === 'number' && (formData[field] as number) > 0) {
      setFormData({ ...formData, [field]: (formData[field] as number) - 1 });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pedido de orçamento detalhado enviado com sucesso! Entraremos em contacto brevemente.');
  };

  const modalContent: Record<string, ModalData> = {
    residenciais: {
      title: 'Mudanças Residenciais',
      intro: 'Processo chave-na-mão para habitações, com cuidado total e proteção especializada para os seus bens.',
      steps: [
        { title: '1. Avaliação e Planeamento', desc: 'Análise de volumes, acessos e planeamento logístico detalhado.' },
        { title: '2. Embalamento Profissional', desc: 'Proteção de móveis com plástico bolha, mantas e caixas etiquetadas.' },
        { title: '3. Transporte Seguro', desc: 'Frota equipada para garantir que tudo chega impecável ao destino.' }
      ]
    },
    empresas: {
      title: 'Empresas e Escritórios',
      intro: 'Relocalização empresarial planeada ao pormenor para minimizar qualquer paragem na sua atividade.',
      steps: [
        { title: '1. Inventário Técnico', desc: 'Mapeamento de postos de trabalho, servidores e equipamentos informáticos.' },
        { title: '2. Desmontagem e Montagem', desc: 'Desmontagem técnica de mobiliário de escritório e reinstalação no novo espaço.' },
        { title: '3. Logística Eficiente', desc: 'Execução rápida e fora de horas se necessário.' }
      ]
    },
    grupagens: {
      title: 'Grupagens de Carga',
      intro: 'Suporte a transitórios, tratamento de documentação alfandegária e transporte nacional e internacional.',
      steps: [
        { title: '1. Documentação e Alfândega', desc: 'Gestão completa de trâmites alfandegários e burocracia documental.' },
        { title: '2. Consolidação', desc: 'Agrupamento eficiente de cargas para rotas nacionais e internacionais.' },
        { title: '3. Entrega Garantida', desc: 'Envio seguro e pontual em território nacional e além-fronteiras.' }
      ]
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar />

      {/* Hero / Secção Inicial com os 3 Quadros em Glass */}
      <section id="home" className="pt-32 pb-24 px-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="text-emerald-500">NORTE</span>
            <span className="text-blue-500">CARGO</span> — Transportes & Logística
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Soluções completas e profissionais para mudanças e transporte de mercadorias.
          </p>
        </div>

        {/* 3 Quadros em Glass */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Quadro 1 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col justify-between shadow-2xl hover:border-emerald-500/50 transition-all">
            <div>
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center font-bold mb-6">📦</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Mudanças Residenciais</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Cuidado total com a sua casa, embalamento especializado e transporte seguro para particulares.
              </p>
            </div>
            <button
              onClick={() => setActiveModal(modalContent.residenciais)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-colors shadow-lg cursor-pointer"
            >
              Saber Mais
            </button>
          </div>

          {/* Quadro 2 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col justify-between shadow-2xl hover:border-blue-500/50 transition-all">
            <div>
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center font-bold mb-6">🏢</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Empresas e Escritórios</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Relocalização de escritórios e empresas com planeamento rigoroso para mínima interrupção do negócio.
              </p>
            </div>
            <button
              onClick={() => setActiveModal(modalContent.empresas)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-colors shadow-lg cursor-pointer"
            >
              Saber Mais
            </button>
          </div>

          {/* Quadro 3 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col justify-between shadow-2xl hover:border-indigo-500/50 transition-all">
            <div>
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center font-bold mb-6">🌐</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Grupagens de Carga</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Suporte a transitórios, tratamento documental e processos de mudança nacional e internacional.
              </p>
            </div>
            <button
              onClick={() => setActiveModal(modalContent.grupagens)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-colors shadow-lg cursor-pointer"
            >
              Saber Mais
            </button>
          </div>

        </div>
      </section>

      {/* Pop-up em Glass */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-2xl max-w-lg w-full p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-white mb-3">{activeModal.title}</h2>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">{activeModal.intro}</p>

            <div className="flex flex-col gap-3 mb-6">
              {activeModal.steps.map((step, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="font-bold text-emerald-400 text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Quem Somos */}
      <section id="quem-somos" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-white">Quem Somos</h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed text-center">
            Começámos há 15 anos e corremos todo o país. Damos suporte a transitórios, tratamos de toda a documentação e executamos processos de mudança nacional e internacional com rigor, segurança e total profissionalismo.
          </p>
        </div>
      </section>

      {/* Orçamentos com Questionário / Inventário */}
      <section id="agendamento" className="py-24 px-6 bg-slate-950">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-3xl font-extrabold mb-2 text-center text-white">Orçamentos & Inventário</h2>
          <p className="text-center text-slate-400 mb-8 text-sm">
            Preencha os dados e indique os itens a transportar para uma estimativa precisa.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300">Nome</label>
                <input type="text" name="nome" required value={formData.nome} onChange={handleChange} className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300">Telefone</label>
                <input type="tel" name="telefone" required value={formData.telefone} onChange={handleChange} className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-emerald-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-300">E-mail</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-emerald-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300">Origem</label>
                <input type="text" name="origem" required value={formData.origem} onChange={handleChange} className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300">Destino</label>
                <input type="text" name="destino" required value={formData.destino} onChange={handleChange} className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-emerald-500" />
              </div>
            </div>

            {/* Inventário por Divisão */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
              <h3 className="font-bold text-emerald-400 text-sm">Inventário por Divisão</h3>

              {/* Quarto */}
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-2">Quarto</div>
              
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-sm text-slate-200">Cama</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => handleDecrement('camas')} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-white cursor-pointer">-</button>
                  <span className="w-6 text-center font-bold">{formData.camas}</span>
                  <button type="button" onClick={() => handleIncrement('camas')} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-white cursor-pointer">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-sm text-slate-200">Mesinha cabeceira</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => handleDecrement('mesinhasCabeceira')} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-white cursor-pointer">-</button>
                  <span className="w-6 text-center font-bold">{formData.mesinhasCabeceira}</span>
                  <button type="button" onClick={() => handleIncrement('mesinhasCabeceira')} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-white cursor-pointer">+</button>
                </div>
              </div>

              {/* Sala */}
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-2">Sala</div>

              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-sm text-slate-200">Sofá de 2 lugares</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => handleDecrement('sofas2Lugares')} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-white cursor-pointer">-</button>
                  <span className="w-6 text-center font-bold">{formData.sofas2Lugares}</span>
                  <button type="button" onClick={() => handleIncrement('sofas2Lugares')} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-white cursor-pointer">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-sm text-slate-200">Mesa</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => handleDecrement('mesas')} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-white cursor-pointer">-</button>
                  <span className="w-6 text-center font-bold">{formData.mesas}</span>
                  <button type="button" onClick={() => handleIncrement('mesas')} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-white cursor-pointer">+</button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-300">Detalhes Adicionais / Outros itens</label>
              <textarea name="mensagem" rows={3} value={formData.mensagem} onChange={handleChange} placeholder="Outros móveis, caixas, pisos, elevador..." className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-emerald-500" />
            </div>

            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-4 rounded-xl text-base transition-colors shadow-lg cursor-pointer mt-2">
              Enviar Pedido de Orçamento
            </button>
          </form>
        </div>
      </section>

      {/* Contactos */}
      <section id="contacto" className="py-24 px-6 bg-slate-900/50 text-center">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-3xl font-extrabold mb-4 text-white">Contactos</h2>
          <p className="text-slate-400 mb-8 text-sm">Fale diretamente connosco para esclarecer qualquer dúvida.</p>
          <div className="flex justify-center gap-8 flex-wrap text-base">
            <div><strong>Telefone / Orçamentos:</strong> <a href="tel:965531009" className="text-emerald-400 hover:underline">965 531 009</a></div>
            <div><strong>E-mail:</strong> <a href="mailto:Geral@nortecargo.pt" className="text-blue-400 hover:underline">Geral@nortecargo.pt</a></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-8 px-6 text-center text-xs border-t border-white/10">
        <p>© {new Date().getFullYear()} NORTECARGO - Transportes e Mudanças. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}