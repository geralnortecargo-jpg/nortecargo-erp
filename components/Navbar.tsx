'use client';

import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logotipo: NORTE em verde, CARGO em azul */}
        <a href="#home" className="text-2xl font-extrabold tracking-tight flex items-center">
          <span className="text-emerald-600">NORTE</span>
          <span className="text-blue-900">CARGO</span>
        </a>

        {/* Links de navegação para Desktop */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-700">
          <a href="#home" className="hover:text-blue-900 transition-colors">Início</a>
          <a href="#quem-somos" className="hover:text-blue-900 transition-colors">Quem Somos</a>
          <a href="#agendamento" className="hover:text-blue-900 transition-colors">Orçamentos</a>
          <a href="#contacto" className="hover:text-blue-900 transition-colors">Contactos</a>
        </div>

        {/* Botão do Menu Mobile (Hambúrguer) */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-slate-700 focus:outline-none"
          aria-label="Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-4 text-slate-700 font-medium">
          <a href="#home" onClick={() => setIsOpen(false)} className="hover:text-blue-900">Início</a>
          <a href="#quem-somos" onClick={() => setIsOpen(false)} className="hover:text-blue-900">Quem Somos</a>
          <a href="#agendamento" onClick={() => setIsOpen(false)} className="hover:text-blue-900">Orçamentos</a>
          <a href="#contacto" onClick={() => setIsOpen(false)} className="hover:text-blue-900">Contactos</a>
        </div>
      )}
    </nav>
  );
}