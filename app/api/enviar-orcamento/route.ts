import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      pedidoId,
      emailCliente,
      nomeCliente,
      descricao,
      precoHora,
      minimoHoras,
      totalSemIva,
      totalComIva,
      dataServico,
    } = body;

    if (!emailCliente) {
      return NextResponse.json({ error: 'E-mail do cliente em falta.' }, { status: 400 });
    }

    // 1. Enviar o e-mail para o cliente (exemplo com o Resend)
    const dataEmail = await resend.emails.send({
      from: 'Nortecargo <onboarding@resend.dev>', // Substitui pelo teu domínio verificado no Resend se já tiveres
      to: [emailCliente],
      subject: 'Proposta de Orçamento - Nortecargo',
      html: `
        <div style="font-family: Arial, sans-serif; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f2b5c;">Olá, ${nomeCliente}!</h2>
          <p>Agradecemos o seu contacto com a <strong>Nortecargo</strong>. Abaixo encontra os detalhes da proposta para o seu serviço de mudanças:</p>
          
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin: 16px 0;">
            <p style="margin: 4px 0;"><strong>Detalhes do Inventário / Serviço:</strong></p>
            <p style="white-space: pre-line; color: #475569; font-size: 14px;">${descricao}</p>
            <p style="margin: 8px 0 4px 0;"><strong>Data Pretendida:</strong> ${dataServico ? new Date(dataServico).toLocaleDateString('pt-PT') : 'A combinar'}</p>
          </div>

          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 6px; margin: 16px 0;">
            <p style="margin: 4px 0; color: #166534;"><strong>Condições Aplicadas:</strong></p>
            <ul style="color: #14532d; padding-left: 20px; margin: 4px 0;">
              <li>Preço por Hora: <strong>${precoHora} €</strong></li>
              <li>Mínimo de Horas: <strong>${minimoHoras}h</strong></li>
              <li>Total Estimado (Sem IVA): <strong>${totalSemIva} €</strong></li>
              <li><strong>Total Estimado (Com IVA a 23%): ${totalComIva} €</strong></li>
            </ul>
          </div>

          <p>Se pretender avançar com a confirmação, por favor responda a este e-mail ou entre em contacto connosco.</p>
          <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">Nortecargo - Soluções em Mudanças e Transportes</p>
        </div>
      `,
    });

    console.log('E-mail enviado com sucesso:', dataEmail);

    // 2. Atualizar o estado do pedido no Supabase para 'Aprovado' (ou 'Enviado') para sair da lista de pendentes
    const { error: updateError } = await supabase
      .from('pedidos_pendentes')
      .update({ estado_pedido: 'Aprovado' })
      .eq('id', pedidoId);

    if (updateError) {
      console.error('Erro ao atualizar estado no Supabase:', updateError.message);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Erro na API de envio de orçamento:', err);
    return NextResponse.json({ error: err.message || 'Erro interno no servidor' }, { status: 500 });
  }
}