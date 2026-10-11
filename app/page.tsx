'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pedido de orçamento enviado com sucesso! Entraremos em contacto brevemente.');
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      {/* Hero Section Simplificado e Limpo */}
      <section id="home" className="pt-28 pb-20 px-6 bg-blue-950 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Transportes & Mudanças com Profissionalismo
          </h1>
          <p className="text-lg md:text-xl mb-8 text-slate-300 max-w-2xl mx-auto">
            Apoio completo para habitações, empresas e logística de mercadorias em Portugal e na Europa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#agendamento" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-colors">
              Pedir Orçamento Grátis
            </a>
            <a href="#servicos" className="bg-white hover:bg-slate-100 text-blue-950 px-8 py-4 rounded-xl font-semibold shadow-lg transition-colors">
              Ver Serviços
            </a>
          </div>
        </div>
      </section>

      {/* Secção de Serviços */}
      <section id="servicos" className="py-20 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-4 text-slate-900">
            Soluções & Especialidades
          </h2>
          <p className="text-center text-slate-500 mb-12 text-base">
            Serviços especializados adaptados às tuas necessidades logísticas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-blue-950 mb-3">Mudanças Residenciais</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Serviço chave-na-mão com embalamento profissional, desmontagem, transporte seguro e montagem no destino.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-blue-950 mb-3">Mudanças de Escritório</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Relocalização rápida de empresas e estabelecimentos comerciais com garantia de mínima interrupção do negócio.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-blue-950 mb-3">Grupagens de Carga</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Transporte otimizado de volumes e paletes em regime partilhado para reduzir custos em envios nacionais e internacionais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Secção de Agendamento */}
      <section id="agendamento" className="py-20 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-center mb-2">
            Pedir Orçamento / Agendamento
          </h2>
          <p className="text-center text-slate-500 mb-8 text-sm">
            Preencha o formulário abaixo e receba a nossa estimativa detalhada sem compromisso.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Nome</label>
                <input type="text" name="nome" required value={formData.nome} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Telefone</label>
                <input type="tel" name="telefone" required value={formData.telefone} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">E-mail</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 text-sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Origem</label>
                <input type="text" name="origem" required value={formData.origem} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Destino</label>
                <input type="text" name="destino" required value={formData.destino} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Tipo de Serviço</label>
              <select name="tipoServico" value={formData.tipoServico} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 text-sm">
                <option value="mudanca_residencial">Mudança Residencial</option>
                <option value="mudanca_empresarial">Mudança Empresarial</option>
                <option value="grupagem_carga">Grupagem de Carga</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Detalhes Adicionais</label>
              <textarea name="mensagem" rows={4} value={formData.mensagem} onChange={handleChange} placeholder="Descreva os objetos a transportar..." className="w-full p-3 rounded-lg border border-slate-300 text-sm" />
            </div>

            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl font-bold text-base transition-colors mt-2 shadow">
              Enviar Pedido de Orçamento
            </button>
          </form>
        </div>
      </section>

      {/* Secção de Contacto */}
      <section id="contacto" className="py-20 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Contacte-nos</h2>
          <p className="text-slate-600 mb-6 text-sm">Estamos disponíveis para responder a todas as suas questões.</p>
          <div className="flex justify-center gap-8 flex-wrap text-base">
            <div><strong>Telefone:</strong> <a href="tel:965531009" className="text-blue-900 hover:underline">965 531 009</a></div>
            <div><strong>E-mail:</strong> <a href="mailto:Geral@nortecargo.pt" className="text-emerald-600 hover:underline">Geral@nortecargo.pt</a></div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-center text-xs">
        <p>© {new Date().getFullYear()} NORTECARGO - Transportes e Mudanças. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}