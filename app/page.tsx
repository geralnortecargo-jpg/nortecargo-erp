'use client';

import React, { useState, useEffect } from 'react';
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

  // Estados para o carrossel superior
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop',
      title: 'Logística e Armazéns de Confiança',
      subtitle: 'Gestão de stocks e movimentação de mercadorias com total segurança.'
    },
    {
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1600&auto=format&fit=crop',
      title: 'Frota Moderna e Especializada',
      subtitle: 'Veículos equipados para mudanças residenciais e empresariais de qualquer escala.'
    },
    {
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop',
      title: 'Transportes Nacionais e Internacionais',
      subtitle: 'Suporte completo a transitórios e grupagens de carga por todo o país.'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Estados para o formulário detalhado de orçamentos (Inventário)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    origem: '',
    destino: '',
    camas: 0,
    mesinhasCabeceira: 0,
    sofas2Lugares: 0,
    mesas: 0,
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
    <main className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      <Navbar />

      {/* Carrossel de Imagens no Topo */}
      <section className="pt-24 relative overflow-hidden bg-slate-200">
        <div className="relative h-[480px] md:h-[540px] w-full overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-slate-900/40 to-black/30 z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform scale-105"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-white drop-shadow-md">
                  <span className="text-emerald-400">NORTE</span>
                  <span className="text-blue-400">CARGO</span> — {slide.title}
                </h1>
                <p className="text-base md:text-xl text-slate-100 max-w-2xl drop-shadow">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Botões do Carrossel */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-emerald-600/80 hover:bg-emerald-600 text-white p-3 rounded-full backdrop-blur-md transition-colors cursor-pointer shadow-lg"
          >
            ❮
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-emerald-600/80 hover:bg-emerald-600 text-white p-3 rounded-full backdrop-blur-md transition-colors cursor-pointer shadow-lg"
          >
            ❯
          </button>
        </div>
      </section>

      {/* Secção com os 3 Quadros (Com Imagens Destacadas) */}
      <section id="home" className="py-20 px-6 bg-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Quadro 1: Mudanças Residenciais */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-emerald-500 transition-all group">
            <div>
              <div className="h-48 w-full overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" 
                  alt="Mudanças Residenciais" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                  Particulares
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Mudanças Residenciais</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Cuidado total com a sua casa, embalamento especializado e transporte seguro para particulares.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => setActiveModal(modalContent.residenciais)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-colors shadow-md cursor-pointer"
              >
                Saber Mais
              </button>
            </div>
          </div>

          {/* Quadro 2: Empresas e Escritórios */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-emerald-500 transition-all group">
            <div>
              <div className="h-48 w-full overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" 
                  alt="Empresas e Escritórios" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                  Empresarial
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Empresas e Escritórios</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Relocalização de escritórios e empresas com planeamento rigoroso para mínima interrupção do negócio.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => setActiveModal(modalContent.empresas)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-colors shadow-md cursor-pointer"
              >
                Saber Mais
              </button>
            </div>
          </div>

          {/* Quadro 3: Grupagens de Carga */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-emerald-500 transition-all group">
            <div>
              <div className="h-48 w-full overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop" 
                  alt="Grupagens de Carga" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                  Nacional e Int.
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Grupagens de Carga</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Suporte a transitórios, tratamento documental e processos de mudança nacional e internacional.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => setActiveModal(modalContent.grupagens)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-colors shadow-md cursor-pointer"
              >
                Saber Mais
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Pop-up em Modal Claro */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-slate-900 mb-3">{activeModal.title}</h2>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">{activeModal.intro}</p>

            <div className="flex flex-col gap-3 mb-6">
              {activeModal.steps.map((step, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-emerald-600 text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-md"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Quem Somos */}
      <section id="quem-somos" className="py-20 px-6 bg-slate-100">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-slate-900">Quem Somos</h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed text-center">
            Começámos há 15 anos e corremos todo o país. Damos suporte a transitórios, tratamos de toda a documentação e executamos processos de mudança nacional e internacional com rigor, segurança e total profissionalismo.
          </p>
        </div>
      </section>

      {/* Orçamentos com Questionário / Inventário */}
      <section id="agendamento" className="py-20 px-6 bg-slate-100">
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl font-extrabold mb-2 text-center text-slate-900">Orçamentos & Inventário</h2>
          <p className="text-center text-slate-500 mb-8 text-sm">
            Preencha os dados e indique os itens a transportar para uma estimativa precisa.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700">Nome</label>
                <input type="text" name="nome" required value={formData.nome} onChange={handleChange} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700">Telefone</label>
                <input type="tel" name="telefone" required value={formData.telefone} onChange={handleChange} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-emerald-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700">E-mail</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-emerald-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700">Origem</label>
                <input type="text" name="origem" required value={formData.origem} onChange={handleChange} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700">Destino</label>
                <input type="text" name="destino" required value={formData.destino} onChange={handleChange} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-emerald-500" />
              </div>
            </div>

            {/* Inventário por Divisão */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-4">
              <h3 className="font-bold text-emerald-600 text-sm">Inventário por Divisão</h3>

              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">Quarto</div>
              
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-sm text-slate-700">Cama</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => handleDecrement('camas')} className="w-8 h-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold cursor-pointer">-</button>
                  <span className="w-6 text-center font-bold text-slate-900">{formData.camas}</span>
                  <button type="button" onClick={() => handleIncrement('camas')} className="w-8 h-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold cursor-pointer">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-sm text-slate-700">Mesinha cabeceira</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => handleDecrement('mesinhasCabeceira')} className="w-8 h-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold cursor-pointer">-</button>
                  <span className="w-6 text-center font-bold text-slate-900">{formData.mesinhasCabeceira}</span>
                  <button type="button" onClick={() => handleIncrement('mesinhasCabeceira')} className="w-8 h-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold cursor-pointer">+</button>
                </div>
              </div>

              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">Sala</div>

              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-sm text-slate-700">Sofá de 2 lugares</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => handleDecrement('sofas2Lugares')} className="w-8 h-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold cursor-pointer">-</button>
                  <span className="w-6 text-center font-bold text-slate-900">{formData.sofas2Lugares}</span>
                  <button type="button" onClick={() => handleIncrement('sofas2Lugares')} className="w-8 h-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold cursor-pointer">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-sm text-slate-700">Mesa</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => handleDecrement('mesas')} className="w-8 h-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold cursor-pointer">-</button>
                  <span className="w-6 text-center font-bold text-slate-900">{formData.mesas}</span>
                  <button type="button" onClick={() => handleIncrement('mesas')} className="w-8 h-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold cursor-pointer">+</button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700">Detalhes Adicionais / Outros itens</label>
              <textarea name="mensagem" rows={3} value={formData.mensagem} onChange={handleChange} placeholder="Outros móveis, caixas, pisos, elevador..." className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-emerald-500" />
            </div>

            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-4 rounded-xl text-base transition-colors shadow-md cursor-pointer mt-2">
              Enviar Pedido de Orçamento
            </button>
          </form>
        </div>
      </section>

      {/* Contactos */}
      <section id="contacto" className="py-20 px-6 bg-slate-100 text-center">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl font-extrabold mb-4 text-slate-900">Contactos</h2>
          <p className="text-slate-600 mb-8 text-sm">Fale diretamente connosco para esclarecer qualquer dúvida.</p>
          <div className="flex justify-center gap-8 flex-wrap text-base">
            <div><strong>Telefone / Orçamentos:</strong> <a href="tel:965531009" className="text-emerald-600 hover:underline">965 531 009</a></div>
            <div><strong>E-mail:</strong> <a href="mailto:Geral@nortecargo.pt" className="text-blue-600 hover:underline">Geral@nortecargo.pt</a></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-200 text-slate-600 py-8 px-6 text-center text-xs border-t border-slate-300">
        <p>© {new Date().getFullYear()} NORTECARGO - Transportes e Mudanças. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}