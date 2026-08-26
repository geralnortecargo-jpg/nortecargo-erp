import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nome_cliente,
      telemovel,
      email,
      morada_cliente,
      morada_carga,
      morada_descarga,
      descricao_servico,
      horas_trabalhadas,
      material_usado,
      valor_sem_iva,
      valor_com_iva,
      data_servico,
    } = body;

    // 1. Guardar o pedido pendente na base de dados
    const { data: pedido, error: erroPedido } = await supabase
      .from('pedidos_pendentes')
      .insert([
        {
          nome_cliente,
          telemovel,
          email,
          morada_cliente,
          morada_carga,
          morada_descarga,
          descricao_servico,
          horas_trabalhadas,
          material_usado,
          valor_sem_iva,
          valor_com_iva,
          data_servico,
          estado_pedido: 'Pendente',
        },
      ])
      .select('id')
      .single();

    if (erroPedido || !pedido) {
      return NextResponse.json({ error: 'Erro ao guardar o orçamento pendente: ' + (erroPedido?.message || 'Desconhecido') }, { status: 500 });
    }

    const pedidoId = pedido.id;

    // Link de aprovação que o cliente vai receber por e-mail
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nortecargo.com';
    const linkAprovacao = `${baseUrl}/api/aprovar-orcamento?id=${pedidoId}`;

    // 2. Enviar o e-mail ao cliente através do Resend
    if (email) {
      await resend.emails.send({
        from: 'NorteCargo <geral@nortecargo.com>',
        to: [email],
        subject: 'Orçamento e Proposta de Serviço - NorteCargo',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 8px;">
            <h2 style="color: #38bdf8;">Olá ${nome_cliente},</h2>
            <p>Obrigado por solicitar os nossos serviços na <strong>NorteCargo</strong>. Segue-se o resumo do orçamento:</p>
            
            <div style="background: #1e293b; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #334155;">
              <p><strong>Descrição:</strong> ${descricao_servico}</p>
              <p><strong>Carga:</strong> ${morada_carga}</p>
              <p><strong>Descarga:</strong> ${morada_descarga}</p>
              <p><strong>Valor Total (c/ IVA):</strong> ${valor_com_iva} €</p>
            </div>

            <p>Para confirmar e aprovar este orçamento, clique no botão abaixo:</p>
            
            <a href="${linkAprovacao}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; margin-top: 15px;">Aprovar Orçamento</a>

            <p style="margin-top: 30px; font-size: 12px; color: #94a3b8;">Se não reconhece este pedido, por favor ignore este e-mail.</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, message: 'Orçamento enviado com sucesso!' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro interno: ' + error.message }, { status: 500 });
  }
}