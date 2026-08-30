'use client';

import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#0f172a] border-b border-[#334155] sticky top-0 z-50">
      {/* Barra superior de contactos (opcional, limpa no telemóvel) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <div className="text-white font-bold text-xl tracking-wide">
            NorteCargo
          </div>

          {/* Links para Computador */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-slate-300 hover:text-white transition">Início</a>
            <a href="#services" className="text-slate-300 hover:text-white transition">Serviços</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition">Contacto</a>
          </nav>

          {/* Botão Hambúrguer para Telemóvel */}
          <button
            className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span className="text-2xl">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Menu Dropdown do Telemóvel (Isolado e com fundo escuro correto) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f172a] border-t border-[#334155] px-4 pt-3 pb-6 space-y-2 flex flex-col shadow-2xl">
          <a 
            href="#home" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-slate-200 hover:text-white hover:bg-slate-800 block px-3 py-3 rounded-md text-base font-medium transition"
          >
            Início
          </a>
          <a 
            href="#services" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-slate-200 hover:text-white hover:bg-slate-800 block px-3 py-3 rounded-md text-base font-medium transition"
          >
            Serviços
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-slate-200 hover:text-white hover:bg-slate-800 block px-3 py-3 rounded-md text-base font-medium transition"
          >
            Contacto
          </a>
        </div>
      )}
    </header>
  );
}