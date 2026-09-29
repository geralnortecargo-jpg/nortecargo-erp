'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      {/* BARRA SUPERIOR DE CONTACTOS (Visível em todos, oculta frase secundária no mobile) */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap">
          <span>
            Orçamentos: <strong className="text-white">965 531 009</strong> | Geral@nortecargo.pt
          </span>
          <span className="hidden md:inline">
            Transportes Nacionais e Internacionais
          </span>
        </div>
      </div>

      {/* BARRA DE NAVEGAÇÃO PRINCIPAL */}
      <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* LOGÓTIPO */}
        <Link href="/" onClick={closeMobileMenu} className="text-2xl font-black text-slate-900 tracking-tight no-underline">
          NORTE<span className="text-blue-700">CARGO</span>
        </Link>

        {/* MENU DESKTOP (Aparece apenas em ecrãs médios/grandes: md:flex) */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          <li><Link href="/" className="text-slate-700 font-semibold text-sm hover:text-blue-700 transition-colors no-underline">Início</Link></li>
          <li><Link href="/servicos" className="text-slate-700 font-semibold text-sm hover:text-blue-700 transition-colors no-underline">Serviços</Link></li>
          <li><Link href="/agendamento" className="text-slate-700 font-semibold text-sm hover:text-blue-700 transition-colors no-underline">Orçamento</Link></li>
          <li><Link href="/grupagem" className="text-slate-700 font-semibold text-sm hover:text-blue-700 transition-colors no-underline">Grupagem</Link></li>
          <li><Link href="/historia" className="text-slate-700 font-semibold text-sm hover:text-blue-700 transition-colors no-underline">História</Link></li>
          <li><Link href="/contactos" className="text-slate-700 font-semibold text-sm hover:text-blue-700 transition-colors no-underline">Contacto</Link></li>
        </ul>

        {/* BOTÃO HAMBÚRGUER MOBILE (Aparece apenas em telemóveis: md:hidden) */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg border border-slate-300 text-slate-900 text-xl leading-none focus:outline-none"
          aria-label="Alternar menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* MENU DESPLEGÁVEL MOBILE (Apenas quando aberto no telemóvel) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3">
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            <li>
              <Link href="/" onClick={closeMobileMenu} className="block text-slate-900 font-semibold text-base py-1 no-underline">
                Início
              </Link>
            </li>
            <li>
              <Link href="/servicos" onClick={closeMobileMenu} className="block text-slate-900 font-semibold text-base py-1 no-underline">
                Serviços
              </Link>
            </li>
            <li>
              <Link href="/agendamento" onClick={closeMobileMenu} className="block text-slate-900 font-semibold text-base py-1 no-underline">
                Orçamento
              </Link>
            </li>
            <li>
              <Link href="/grupagem" onClick={closeMobileMenu} className="block text-slate-900 font-semibold text-base py-1 no-underline">
                Grupagem
              </Link>
            </li>
            <li>
              <Link href="/historia" onClick={closeMobileMenu} className="block text-slate-900 font-semibold text-base py-1 no-underline">
                História
              </Link>
            </li>
            <li>
              <Link href="/contactos" onClick={closeMobileMenu} className="block text-slate-900 font-semibold text-base py-1 no-underline">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}