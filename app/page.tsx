'use client';

import React, { useState } from 'react';

const SLIDES = [
  {
    title: 'Bem-vindo',
    description: 'Soluções profissionais à sua medida.',
  },
  {
    title: 'Qualidade e Confiança',
    description: 'Trabalho garantido e dedicação total.',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* NAVBAR NO TOPO */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white relative shadow-md">
        <div className="text-xl font-bold">MeuSite</div>

        {/* Links para Desktop (escondidos no mobile com 'hidden md:flex') */}
        <div className="hidden md:flex gap-6 items-center">
          <a href="#home" className="hover:text-green-400 transition">Início</a>
          <a href="#services" className="hover:text-green-400 transition">Serviços</a>
          <a href="#contact" className="hover:text-green-400 transition">Contacto</a>
        </div>

        {/* Botão de Hambúrguer (visível apenas no mobile com 'md:hidden') */}
        <button 
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Menu Dropdown Mobile (abre/fecha consoante o estado) */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-900 flex flex-col p-6 gap-4 shadow-lg md:hidden z-50 border-t border-gray-800">
            <a 
              href="#home" 
              className="hover:text-green-400 transition" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </a>
            <a 
              href="#services" 
              className="hover:text-green-400 transition" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Serviços
            </a>
            <a 
              href="#contact" 
              className="hover:text-green-400 transition" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </a>
          </div>
        )}
      </nav>

      {/* SECÇÃO DO SLIDER */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto rounded-lg shadow-lg bg-gray-900 text-white p-8 relative">
          <h1 className="text-2xl md:text-3xl font-bold">{SLIDES[currentSlide].title}</h1>
          <p className="mt-4 text-lg text-gray-300">
            {SLIDES[currentSlide].description}
          </p>

          <div className="flex justify-center gap-2 mt-6">
            {SLIDES.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                  index === currentSlide ? 'bg-green-500' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}