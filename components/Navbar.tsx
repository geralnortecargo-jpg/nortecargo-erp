'use client';

import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0f172a] border-b border-[#334155] relative w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <div className="text-white font-bold text-xl tracking-wide">
            NorteCargo
          </div>

          {/* Links para Computador (Escondidos no telemóvel) */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-slate-300 hover:text-white transition">Início</a>
            <a href="#services" className="text-slate-300 hover:text-white transition">Serviços</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition">Contacto</a>
          </div>

          {/* Botão Hambúrguer para Telemóvel (Escondido no computador) */}
          <button
            className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Menu Dropdown do Telemóvel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1e293b] border-t border-[#334155] absolute w-full left-0 top-16 shadow-2xl">
          <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white hover:bg-slate-700 block px-3 py-3 rounded-md text-base font-medium">
              Início
            </a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white hover:bg-slate-700 block px-3 py-3 rounded-md text-base font-medium">
              Serviços
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white hover:bg-slate-700 block px-3 py-3 rounded-md text-base font-medium">
              Contacto
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}