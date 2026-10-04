'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

interface ModalData {
  title: string;
  intro: string;
  icon: React.ReactNode;
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

  const [activeModal, setActiveModal] = useState<ModalData | null>(null);

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

  // Ícones SVG Vetoriais
  const HomeIcon = () => (
    <svg className="w-10 h-10 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );

  const OfficeIcon = () => (
    <svg className="w-10 h-10 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  );

  const CargoIcon = () => (
    <svg className="w-10 h-10 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  );

  const modalContent: Record<string, ModalData> = {
    residenciais: {
      title: 'Mudanças Residenciais',
      icon: <HomeIcon />,
      intro: 'O nosso processo chave-na-mão garante a máxima tranquilidade para si e para a sua família durante a mudança de casa.',
      steps: [
        { title: '1. Avaliação e Planeamento', desc: 'Levantamento das volumetrias, acessos (escadas/elevadores) e definição do plano logístico.' },
        { title: '2. Desmontagem e Embalamento', desc: 'Proteção de móveis com plástico bolha e mantas térmicas. Embalamento etiquetado de louças e objetos frágeis.' },
        { title: '3. Carregamento e Elevação Exterior', desc: 'Acomodação segura na frota e utilização de elevador exterior quando necessário.' },
        { title: '4. Transporte e Montagem no Destino', desc: 'Transporte com rastreio, descarregamento e montagem integral do mobiliário no local final.' }
      ]
    },
    escritorio: {
      title: 'Mudanças de Escritório & Empresas',
      icon: <OfficeIcon />,
      intro: 'Planificação rigorosa orientada para minimizar o tempo de inatividade da sua empresa e proteger o seu ativo.',
      steps: [
        { title: '1. Inventário e Identificação', desc: 'Mapeamento de postos de trabalho, documentação, ficheiros confidenciais e equipamentos de informática.' },
        { title: '2. Embalamento Técnico de TI', desc: 'Acondicionamento especializado de computadores, servidores e monitores com proteção antiestática.' },
        { title: '3. Desmontagem de Mobiliário de Escritório', desc: 'Desmontagem técnica de bancadas, secretárias compostas e estantes industriais.' },
        { title: '4. Reinstalação Rápida', desc: 'Transporte prioritário e posicionamento do mobiliário no novo espaço conforme o layout pré-definido.' }
      ]
    },
    grupagens: {
      title: 'Grupagens de Carga & LTL',
      icon: <CargoIcon />,
      intro: 'A solução ideal para enviar mercadorias sem necessidade de contratar um camião completo, reduzindo custos.',
      steps: [
        { title: '1. Consolidação da Carga', desc: 'Recolha da sua mercadoria ou palete e agrupamento num centro logístico estratégico.' },
        { title: '2. Triagem e Trâmites Alfandegários', desc: 'Gestão da documentação de transporte, CMR e desalfandegamento em rotas internacionais.' },
        { title: '3. Otimização de Rota', desc: 'Integração em frotas regulares que percorrem Portugal e a Europa de forma eficiente.' },
        { title: '4. Entrega Agendada', desc: 'Descarga controlada na morada do destinatário com confirmação e comprovativo de entrega.' }
      ]
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative w-full h-[520px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${slide.url})` }}
          />
        ))}

        <div className="absolute inset-0 bg-slate-900/40 z-20" />

        <div className="relative z-30 h-full flex items-center justify-center px-5">
          <div className="max-w-3xl w-full bg-white/25 backdrop-blur-md border border-white/30 rounded-2xl p-8 md:p-10 text-center shadow-2xl text-white">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-md leading-tight">
              {slides[currentIndex].title}
            </h1>
            <p className="text-base md:text-lg mb-7 text-slate-100 drop-shadow max-w-xl mx-auto">
              {slides[currentIndex].subtitle}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#agendamento" className="bg-blue-900 hover:bg-blue-800 text-white px-7 py-3.5 rounded-lg font-bold shadow-lg transition-colors">
                Pedir Orçamento Grátis
              </a>
              <a href="#servicos" className="bg-white/90 hover:bg-white text-slate-900 px-7 py-3.5 rounded-lg font-semibold shadow transition-colors">
                Ver Serviços
              </a>
            </div>
          </div>
        </div>

        <button onClick={prevSlide} className="absolute left-5 top-1/2 -translate-y-1/2 z-40 bg-black/40 hover:bg-black/60 text-white rounded-full w-11 h-11 flex items-center justify-center backdrop-blur transition-all">❮</button>
        <button onClick={nextSlide} className="absolute right-5 top-1/2 -translate-y-1/2 z-40 bg-black/40 hover:bg-black/60 text-white rounded-full w-11 h-11 flex items-center justify-center backdrop-blur transition-all">❯</button>

        <div className="absolute bottom-5 w-full flex justify-center gap-2 z-40">
          {slides.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`h-2.5 rounded-full transition-all ${index === currentIndex ? 'w-7 bg-white' : 'w-2.5 bg-white/50'}`} />
          ))}
        </div>
      </section>

      {/* Secção de Serviços com Cartões Animados e Ícones */}
      <section id="servicos" className="py-20 px-5 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-3 text-slate-900">
            Soluções & Especialidades
          </h2>
          <p className="text-center text-slate-500 mb-12 text-base">
            Apoio completo para habitações, empresas e logística de mercadorias.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Cartão 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-200 transition-all duration-300">
                  <HomeIcon />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Mudanças Residenciais</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  Serviço completo para a sua nova casa com embalamento profissional, desmontagem, transporte seguro e montagem no destino.
                </p>
              </div>
              <button
                onClick={() => setActiveModal(modalContent.residenciais)}
                className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3.5 px-5 rounded-lg w-full text-sm transition-colors shadow-sm"
              >
                Saber Mais
              </button>
            </div>

            {/* Cartão 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-200 transition-all duration-300">
                  <OfficeIcon />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Mudanças de Escritório</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  Relocalização rápida de empresas, escritórios e estabelecimentos comerciais com garantia de mínima interrupção do negócio.
                </p>
              </div>
              <button
                onClick={() => setActiveModal(modalContent.escritorio)}
                className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3.5 px-5 rounded-lg w-full text-sm transition-colors shadow-sm"
              >
                Saber Mais
              </button>
            </div>

            {/* Cartão 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-200 transition-all duration-300">
                  <CargoIcon />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Grupagens de Carga</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  Transporte otimizado de volumes e paletes em regime partilhado, reduzindo custos para envios nacionais e internacionais.
                </p>
              </div>
              <button
                onClick={() => setActiveModal(modalContent.grupagens)}
                className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3.5 px-5 rounded-lg w-full text-sm transition-colors shadow-sm"
              >
                Saber Mais
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Pop-up Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-5"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                {activeModal.icon}
              </div>
              <h2 className="text-2xl font-extrabold text-blue-900">
                {activeModal.title}
              </h2>
            </div>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              {activeModal.intro}
            </p>

            <div className="flex flex-col gap-4 mb-7">
              {activeModal.steps.map((step, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="text-base font-bold text-blue-900 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-lg w-full text-sm transition-colors"
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}

      {/* Form de Agendamento */}
      <section id="agendamento" className="py-16 px-5 bg-slate-50 border-b border-slate-200">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-center mb-2">
            Pedir Orçamento / Agendamento
          </h2>
          <p className="text-center text-slate-500 mb-6 text-sm">
            Preencha o formulário abaixo e receba a nossa estimativa detalhada sem compromisso.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Nome</label>
                <input type="text" name="nome" required value={formData.nome} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Telefone</label>
                <input type="tel" name="telefone" required value={formData.telefone} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">E-mail</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Localidade de Origem</label>
                <input type="text" name="origem" required value={formData.origem} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Localidade de Destino</label>
                <input type="text" name="destino" required value={formData.destino} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Tipo de Serviço</label>
              <select name="tipoServico" value={formData.tipoServico} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm">
                <option value="mudanca_residencial">Mudança Residencial</option>
                <option value="mudanca_empresarial">Mudança Empresarial</option>
                <option value="grupagem_carga">Grupagem de Carga</option>
                <option value="outro">Outro Serviço</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Detalhes Adicionais</label>
              <textarea name="mensagem" rows={4} value={formData.mensagem} onChange={handleChange} placeholder="Descreva os objetos a transportar, pisos, acesso a elevador, etc." className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none text-sm" />
            </div>

            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-lg font-bold text-base transition-colors mt-2 shadow">
              Enviar Pedido de Orçamento
            </button>
          </form>
        </div>
      </section>

      {/* Secção Contacto */}
      <section id="contacto" className="py-16 px-5 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Contacte-nos</h2>
          <p className="text-slate-600 mb-6 text-sm">Estamos disponíveis para responder a todas as suas questões.</p>
          
          <div className="flex justify-center gap-8 flex-wrap text-base">
            <div>
              <strong>Telefone / Orçamentos:</strong> <a href="tel:965531009" className="text-blue-900 hover:underline">965 531 009</a>
            </div>
            <div>
              <strong>E-mail:</strong> <a href="mailto:Geral@nortecargo.pt" className="text-emerald-600 hover:underline">Geral@nortecargo.pt</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-5 text-center text-xs">
        <div className="max-w-6xl mx-auto">
          <p>© {new Date().getFullYear()} NORTECARGO - Transportes e Mudanças. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}