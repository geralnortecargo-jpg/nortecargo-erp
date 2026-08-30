'use client';

import React, { useState } from 'react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      
      {/* 1. BARRA SUPERIOR DE CONTACTOS */}
      <div className="bg-gray-100 border-b border-gray-200 text-xs text-gray-600 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Orçamentos: <strong className="text-gray-900">965 531 009</strong></span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a href="mailto:Geral@nortecargo.pt" className="font-bold text-green-600 hover:underline">
              Geral@nortecargo.pt
            </a>
          </div>
          <div className="hidden sm:block text-gray-500 font-medium">
            Transportes Nacionais e Internacionais
          </div>
        </div>
      </div>

      {/* 2. NAVBAR PRINCIPAL */}
      <nav className="bg-white border-b border-gray-200 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-20">
          
          {/* LOGO NORTECARGO */}
          <a href="#home" className="flex items-center space-x-2">
            <span className="font-black text-2xl md:text-3xl tracking-tight text-gray-900 uppercase">
              NORTE<span className="text-blue-900">CARGO</span>
            </span>
          </a>

          {/* LINKS DE DESKTOP (Só aparecem a partir do ecrã médio 'md') */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
            <a href="#home" className="hover:text-blue-900 transition-colors">Início</a>
            <a href="#empresas" className="hover:text-blue-900 transition-colors">Empresas</a>
            <a href="#servicos" className="hover:text-blue-900 transition-colors">Serviços</a>
            <a href="#agendamento" className="hover:text-blue-900 transition-colors">Agendamento</a>
            <a href="#contacto" className="hover:text-blue-900 transition-colors">Contacto</a>
          </div>

          {/* BOTÃO HAMBÚRGUER (Escondido em PC, visível apenas no telemóvel 'md:hidden') */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-2xl text-gray-700 focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* MENU DROPDOWN MOBILE (Só abre no telemóvel ao clicar) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 shadow-lg px-6 py-4 flex flex-col space-y-3 absolute w-full left-0 top-full">
            <a 
              href="#home" 
              className="text-gray-800 text-lg font-medium py-1 hover:text-blue-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </a>
            <a 
              href="#empresas" 
              className="text-gray-800 text-lg font-medium py-1 hover:text-blue-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Empresas
            </a>
            <a 
              href="#servicos" 
              className="text-gray-800 text-lg font-medium py-1 hover:text-blue-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Serviços
            </a>
            <a 
              href="#agendamento" 
              className="text-gray-800 text-lg font-medium py-1 hover:text-blue-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Agendamento
            </a>
            <a 
              href="#contacto" 
              className="text-gray-800 text-lg font-medium py-1 hover:text-blue-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </a>
          </div>
        )}
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <section id="home" className="py-16 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Transportes e Mudanças com Rigor
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Soluções completas de mudanças em todo o país.
        </p>
      </section>

    </div>
  );
}