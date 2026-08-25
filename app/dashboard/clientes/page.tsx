'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Cliente {
  id: string;
  nome: string;
  telemovel?: string;
  email?: string;
  morada?: string;
  created_at?: string;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    telemovel: '',
    email: '',
    morada: '',
  });

  const carregarClientes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('nome', { ascending: true });

    if (error) {
      console.error('Erro ao carregar clientes:', error.message);
    } else {
      setClientes(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleGuardarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoCliente.nome) return;

    const { data, error } = await supabase
      .from('clientes')
      .insert([
        {
          nome: novoCliente.nome,
          telemovel: novoCliente.telemovel,
          email: novoCliente.email,
          morada: novoCliente.morada,
        },
      ])
      .select();

    if (error) {
      alert('Erro ao guardar cliente: ' + error.message);
    } else if (data) {
      setClientes([...clientes, data[0]]);
      setModalAberto(false);
      setNovoCliente({ nome: '', telemovel: '', email: '', morada: '' });
    }
  };

  const handleEliminarCliente = async (id: string) => {
    if (!confirm('Tem a certeza de que deseja eliminar este cliente?')) return;

    const { error } = await supabase.from('clientes').delete().eq('id', id);

    if (error) {
      alert('Erro ao eliminar: ' + error.message);
    } else {
      setClientes(clientes.filter((c) => c.id !== id));
    }
  };

  return (
    <main style={{ padding: '32px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>Gestão de Clientes</h1>
          <p style={{ fontSize: '16px', color: '#94a3b8', margin: '6px 0 0 0' }}>
            {loading ? 'A carregar clientes...' : `${clientes.length} clientes registados`}
          </p>
        </div>

        <button
          onClick={() => setModalAberto(true)}
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '14px 22px',
            fontSize: '16px',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          + Novo Cliente
        </button>
      </header>

      <div style={{ backgroundColor: '#1e293b', borderRadius: '14px', border: '1px solid #334155', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Telemóvel</th>
              <th style={thStyle}>Email</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Serviços / Histórico</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                  A carregar clientes do Supabase...
                </td>
              </tr>
            ) : clientes.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
                  Nenhum cliente registado.
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <tr key={cliente.id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ ...tdStyle, fontWeight: 700, color: '#ffffff' }}>{cliente.nome}</td>
                  <td style={tdStyle}>{cliente.telemovel || 'N/A'}</td>
                  <td style={tdStyle}>{cliente.email || 'N/A'}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <Link
                      href={`/dashboard/clientes/${cliente.id}`}
                      style={{
                        backgroundColor: '#0284c7',
                        color: '#fff',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: 'bold',
                      }}
                    >
                      Ver Serviços ➔
                    </Link>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button
                      onClick={() => handleEliminarCliente(cliente.id)}
                      style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalAberto && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
          }}
          onClick={() => setModalAberto(false)}
        >
          <div
            style={{ backgroundColor: '#1e293b', border: '2px solid #334155', borderRadius: '16px', padding: '32px', maxWidth: '500px', width: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0, color: '#ffffff' }}>Novo Cliente</h2>
            <form onSubmit={handleGuardarCliente} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Nome Completo / Empresa</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Transportes Lda"
                  value={novoCliente.nome}
                  onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Telemóvel</label>
                  <input
                    type="text"
                    placeholder="912345678"
                    value={novoCliente.telemovel}
                    onChange={(e) => setNovoCliente({ ...novoCliente, telemovel: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    placeholder="exemplo@email.com"
                    value={novoCliente.email}
                    onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Morada</label>
                <input
                  type="text"
                  placeholder="Rua Principal, Porto"
                  value={novoCliente.morada}
                  onChange={(e) => setNovoCliente({ ...novoCliente, morada: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setModalAberto(false)} style={{ flex: 1, padding: '12px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

const thStyle: React.CSSProperties = { padding: '16px', fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '16px', fontSize: '15px' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' };
const inputStyle: React.CSSProperties = { width: '100%', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', padding: '10px', borderRadius: '8px', outline: 'none' };