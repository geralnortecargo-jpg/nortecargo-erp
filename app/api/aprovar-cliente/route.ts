import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pedidoId = searchParams.get('id');

  if (!pedidoId) {
    return new NextResponse('ID de pedido inválido.', { status: 400 });
  }

  // 1. Buscar os dados do pedido pendente
  const { data: pedido, error: erroPedido } = await supabase
    .from('pedidos_pendentes')
    .select('*')
    .eq('id', pedidoId)
    .single();

  if (erroPedido || !pedido) {
    return new NextResponse('Pedido não encontrado ou já processado.', { status: 404 });
  }

  // 2. Verificar se o cliente já existe pelo e-mail
  let clienteId = null;
  const { data: clienteExistente } = await supabase
    .from('clientes')
    .select('id')
    .eq('email', pedido.email || '')
    .maybeSingle();

  if (clienteExistente) {
    clienteId = clienteExistente.id;
  } else {
    // Criar o cliente automaticamente
    const { data: novoCliente, error: erroCliente } = await supabase
      .from('clientes')
      .insert([
        {
          nome: pedido.nome_cliente,
          telemovel: pedido.telemovel,
          email: pedido.email,
          morada: pedido.morada_cliente,
        },
      ])
      .select('id')
      .single();

    if (erroCliente) {
      return new NextResponse('Erro ao criar o cliente automaticamente: ' + erroCliente.message, { status: 500 });
    }
    clienteId = novoCliente.id;
  }

  // 3. Criar o serviço completo na base de dados (alimenta automaticamente a agenda e a ficha)
  const { error: erroServico } = await supabase.from('servicos').insert([
    {
      cliente_id: clienteId,
      descricao: pedido.descricao_servico,
      morada_carga: pedido.morada_carga,
      morada_descarga: pedido.morada_descarga,
      horas_trabalhadas: pedido.horas_trabalhadas || 0,
      material_usado: pedido.material_usado,
      valor_sem_iva: pedido.valor_sem_iva || 0,
      valor_com_iva: pedido.valor_com_iva || 0,
      estado_faturacao: 'Por facturar',
      estado: 'Confirmado',
      data_servico: pedido.data_servico || new Date().toISOString(),
    },
  ]);

  if (erroServico) {
    return new NextResponse('Erro ao registar o serviço: ' + erroServico.message, { status: 500 });
  }

  // 4. Atualizar o estado do pedido pendente para 'Aprovado'
  await supabase
    .from('pedidos_pendentes')
    .update({ estado_pedido: 'Aprovado' })
    .eq('id', pedidoId);

  // 5. Redirecionar o cliente para uma página de sucesso bonita no vosso site
  return new NextResponse(`
    <!DOCTYPE html>
    <html lang="pt">
      <head>
        <meta charset="UTF-8">
        <title>Orçamento Aprovado - NorteCargo</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #0f172a; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
          .card { background: #1e293b; padding: 40px; border-radius: 12px; border: 1px solid #334155; text-align: center; max-width: 400px; }
          h1 { color: #10b981; font-size: 24px; margin-bottom: 10px; }
          p { color: #94a3b8; font-size: 14px; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Orçamento Aprovado!</h1>
          <p>Obrigado pela sua confirmação. O seu serviço foi agendado com sucesso na <strong>NorteCargo</strong> e a nossa equipa foi notificada.</p>
        </div>
      </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}