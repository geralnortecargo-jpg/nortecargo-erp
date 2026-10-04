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
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'sans-serif' }}>
      {/* Navegação integrada diretamente na Homepage */}
      <Navbar />

      {/* Hero Section / Banner Inicial */}
      <section id="home" style={{ backgroundColor: '#ffffff', padding: '80px 20px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#0f172a', marginBottom: '16px', lineHeight: '1.2' }}>
            Transportes e Mudanças com Rigor
          </h1>
          <p style={{ fontSize: '18px', color: '#475569', marginBottom: '32px', maxWidth: '650px', margin: '0 auto 32px auto' }}>
            Soluções completas de mudanças residenciais, empresariais e transporte de mercadorias em todo o país.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#agendamento" style={{ backgroundColor: '#1e3a8a', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Pedir Orçamento Grátis
            </a>
            <a href="#servicos" style={{ backgroundColor: '#f1f5f9', color: '#0f172a', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', border: '1px solid #cbd5e1' }}>
              Ver Serviços
            </a>
          </div>
        </div>
      </section>

      {/* Secção Empresas */}
      <section id="empresas" style={{ padding: '60px 20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '12px' }}>
            Soluções para Empresas
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>
            Apoio logístico, mudança de instalações e transporte dedicado para o seu negócio.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '8px' }}>Relocalização de Escritórios</h3>
              <p style={{ color: '#475569', fontSize: '15px' }}>Mudanças rápidas e eficientes com o mínimo de impacto na operação da sua empresa.</p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '8px' }}>Logística & Transporte</h3>
              <p style={{ color: '#475569', fontSize: '15px' }}>Entregas e distribuição regular de carga e mercadorias a nível nacional e internacional.</p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '8px' }}>Gestão de Frota Dedicada</h3>
              <p style={{ color: '#475569', fontSize: '15px' }}>Viaturas e motoristas qualificados à disposição das suas necessidades logísticas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Secção Serviços */}
      <section id="servicos" style={{ padding: '60px 20px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '12px' }}>
            Os Nossos Serviços
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>
            Serviços chave-na-mão adaptados a cada necessidade.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Mudanças Residenciais</h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Embalamento, desmontagem, transporte e montagem de mobiliário em novas habitações.</p>
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Elevador Exterior</h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Operação de elevador de fachada para manuseamento seguro em pisos elevados.</p>
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Embalamento Especializado</h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Proteção reforçada para itens frágeis, objetos de valor e equipamento eletrónico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Secção Agendamento e Formulário de Orçamento */}
      <section id="agendamento" style={{ padding: '60px 20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
            Pedir Orçamento / Agendamento
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>
            Preencha o formulário abaixo e receba a nossa estimativa detalhada sem compromisso.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Nome</label>
                <input type="text" name="nome" required value={formData.nome} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Telefone</label>
                <input type="tel" name="telefone" required value={formData.telefone} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>E-mail</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Localidade de Origem</label>
                <input type="text" name="origem" required value={formData.origem} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Localidade de Destino</label>
                <input type="text" name="destino" required value={formData.destino} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Tipo de Serviço</label>
              <select name="tipoServico" value={formData.tipoServico} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                <option value="mudanca_residencial">Mudança Residencial</option>
                <option value="mudanca_empresarial">Mudança Empresarial</option>
                <option value="transporte_carga">Transporte de Carga</option>
                <option value="outro">Outro Serviço</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Detalhes Adicionais</label>
              <textarea name="mensagem" rows={4} value={formData.mensagem} onChange={handleChange} placeholder="Descreva os objetos a transportar, pisos, acesso a elevador, etc." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>

            <button type="submit" style={{ backgroundColor: '#16a34a', color: '#ffffff', padding: '14px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '8px' }}>
              Enviar Pedido de Orçamento
            </button>
          </form>
        </div>
      </section>

      {/* Secção Contacto */}
      <section id="contacto" style={{ padding: '60px 20px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>Contacte-nos</h2>
          <p style={{ color: '#475569', marginBottom: '24px' }}>Estamos disponíveis para responder a todas as suas questões.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', fontSize: '16px' }}>
            <div>
              <strong>Telefone / Orçamentos:</strong> <a href="tel:965531009" style={{ color: '#1e3a8a', textDecoration: 'none' }}>965 531 009</a>
            </div>
            <div>
              <strong>E-mail:</strong> <a href="mailto:Geral@nortecargo.pt" style={{ color: '#16a34a', textDecoration: 'none' }}>Geral@nortecargo.pt</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '30px 20px', textAlign: 'center', fontSize: '14px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p>© {new Date().getFullYear()} NORTECARGO - Transportes e Mudanças. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}