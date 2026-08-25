'use client';

import React from 'react';

export default function ContactosPage() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Navbar Direta na Página para Teste */}
      <header style={{ width: '100%', backgroundColor: '#ffffff', borderBottom: '1px solid #cbd5e1' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <a href="/" style={{ textDecoration: 'none', fontSize: '28px', fontWeight: '900', color: '#0f2b5c' }}>
            NORTE<span style={{ color: '#16a34a' }}>CARGO</span>
          </a>

          <nav style={{ display: 'flex', gap: '30px' }}>
            <a href="/" style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold' }}>Início</a>
            <a href="/servicos" style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold' }}>Serviços</a>
            <a href="/agendamento" style={{ color: '#334155', textDecoration: 'none', fontWeight: 'bold' }}>Agendamento</a>
            <a href="/contactos" style={{ color: '#16a34a', textDecoration: 'none', fontWeight: 'bold' }}>Contacto</a>
          </nav>

        </div>
      </header>

      {/* Conteúdo simples */}
      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#0f2b5c', fontSize: '32px' }}>Página de Contactos</h1>
        <p style={{ color: '#334155', fontSize: '18px' }}>Se esta página carregar bem, o erro anterior vinha da importação do componente externo.</p>
      </main>

    </div>
  );
}