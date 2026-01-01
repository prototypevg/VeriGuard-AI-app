// Simulação de IA para Detecção de Fraudes, Validação de Produtos e Auditoria de Sellers
// Lógica heurística avançada para VeriGuard AI

// --- TIPOS ---

interface AnaliseTransacaoResult {
  score: number; // 0 a 100
  nivelRisco: 'BAIXO' | 'MÉDIO' | 'ALTO' | 'CRÍTICO';
  fatoresRisco: string[];
  recomendacao: string;
}

interface AnaliseProdutoResult {
  scoreLegitimidade: number; // 0 a 100 (100 = Muito Legítimo)
  status: 'APROVADO' | 'SUSPEITO' | 'REJEITADO';
  problemasDetectados: string[];
  sugestaoPreco: string;
}

interface AnaliseSellerResult {
  scoreReputacao: number; // 0 a 100
  classificacao: 'PREMIUM' | 'REGULAR' | 'RISCO' | 'BLOQUEADO';
  flags: string[];
  analiseComportamental: string;
}

// --- LÓGICA DE TRANSAÇÕES (BANCOS/FINTECHS) ---
export const analisarTransacaoIA = (valor: number, tipo: string, origem: string, horario: string): AnaliseTransacaoResult => {
  let score = 0;
  const fatores: string[] = [];

  // Heurística de Valor
  if (valor > 50000) {
    score += 40;
    fatores.push('Valor atípico detectado (> 50k)');
  } else if (valor > 10000) {
    score += 20;
  }
  
  if (valor % 100 !== 0 && valor > 1000) {
    score += 10;
    fatores.push('Padrão de valor fracionado suspeito');
  }

  // Heurística de Tipo
  const tipoL = tipo.toLowerCase();
  if (tipoL.includes('crypto') || tipoL.includes('bitcoin')) {
    score += 35;
    fatores.push('Destino de alta volatilidade (Criptoativos)');
  } else if (tipoL.includes('internacional') || tipoL.includes('swift')) {
    score += 25;
    fatores.push('Remessa transfronteiriça sem histórico');
  }

  // Heurística de Origem
  const origemL = origem.toLowerCase();
  if (origemL.includes('tor') || origemL.includes('vpn') || origemL.includes('proxy')) {
    score += 50;
    fatores.push('Conexão anonimizada detectada (VPN/Tor)');
  } else if (origemL.includes('desconhecido')) {
    score += 20;
    fatores.push('Dispositivo não reconhecido na rede');
  }

  // Heurística de Horário
  const hora = parseInt(horario.split(':')[0]);
  if (hora >= 23 || hora <= 5) {
    score += 30;
    fatores.push('Janela de tempo atípica (Madrugada)');
  }

  score = Math.min(Math.max(score, 1), 99);

  let nivel: 'BAIXO' | 'MÉDIO' | 'ALTO' | 'CRÍTICO' = 'BAIXO';
  let recomendacao = 'Aprovação Automática';

  if (score >= 85) { nivel = 'CRÍTICO'; recomendacao = 'Bloqueio Imediato e Congelamento de Ativos'; }
  else if (score >= 60) { nivel = 'ALTO'; recomendacao = 'Solicitar Autenticação Biométrica'; }
  else if (score >= 30) { nivel = 'MÉDIO'; recomendacao = 'Enviar para fila de análise manual'; }

  return { score, nivelRisco: nivel, fatoresRisco: fatores.length > 0 ? fatores : ['Comportamento padrão verificado'], recomendacao };
};

// --- LÓGICA DE PRODUTOS (VENDEDORES) ---
export const analisarProdutoIA = (nome: string, preco: number, descricao: string, categoria: string): AnaliseProdutoResult => {
  let score = 100; // Começa perfeito, vai perdendo pontos
  const problemas: string[] = [];

  const nomeL = nome.toLowerCase();
  const descL = descricao.toLowerCase();

  // Marcas de luxo com preço baixo (Indício de falsificação)
  const marcasLuxo = ['rolex', 'gucci', 'prada', 'louis vuitton', 'iphone', 'apple', 'nike'];
  const ehMarcaLuxo = marcasLuxo.some(marca => nomeL.includes(marca));

  if (ehMarcaLuxo && preco < 500) {
    score -= 60;
    problemas.push('Preço incompatível com marca de luxo (Possível Falsificação)');
  }

  // Palavras-chave proibidas ou suspeitas
  if (descL.includes('réplica') || descL.includes('primeira linha') || descL.includes('similar') || descL.includes('tipo')) {
    score -= 40;
    problemas.push('Termos indicativos de pirataria detectados na descrição');
  }

  // Descrição muito curta
  if (descricao.length < 20) {
    score -= 15;
    problemas.push('Descrição insuficiente para validação de conformidade');
  }

  // Categoria de alto risco
  if (categoria === 'Eletrônicos' && preco < 50) {
    score -= 20;
    problemas.push('Eletrônico com preço abaixo do custo de produção');
  }

  score = Math.max(0, score);

  let status: 'APROVADO' | 'SUSPEITO' | 'REJEITADO' = 'APROVADO';
  if (score < 40) status = 'REJEITADO';
  else if (score < 80) status = 'SUSPEITO';

  return {
    scoreLegitimidade: score,
    status,
    problemasDetectados: problemas.length > 0 ? problemas : ['Nenhuma inconformidade detectada'],
    sugestaoPreco: ehMarcaLuxo ? `R$ ${(preco * 5).toFixed(2)} - R$ ${(preco * 8).toFixed(2)}` : 'Preço dentro da média de mercado'
  };
};

// --- LÓGICA DE SELLERS (MARKETPLACES) ---
export const analisarSellerIA = (cnpj: string, tempoAtividadeMeses: number, reclamacoes: number, faturamento: number): AnaliseSellerResult => {
  let score = 50; // Base neutra
  const flags: string[] = [];

  // Tempo de atividade (Contas novas movimentando muito dinheiro = Lavagem?)
  if (tempoAtividadeMeses < 3 && faturamento > 100000) {
    score -= 40;
    flags.push('Conta recente com faturamento desproporcional (Possível Lavagem)');
  } else {
    score += Math.min(tempoAtividadeMeses, 30); // Ganha pontos por antiguidade
  }

  // Índice de Reclamações
  if (reclamacoes > 10) {
    score -= (reclamacoes * 2);
    flags.push(`Alto volume de reclamações (${reclamacoes})`);
  } else {
    score += 10;
  }

  // Validação básica de CNPJ (simulado)
  if (cnpj.endsWith('0001-00')) {
    score += 5; // Formato padrão matriz
  }

  score = Math.min(Math.max(score, 0), 100);

  let classificacao: 'PREMIUM' | 'REGULAR' | 'RISCO' | 'BLOQUEADO' = 'REGULAR';
  let analise = 'Comportamento típico de vendedor.';

  if (score >= 80) {
    classificacao = 'PREMIUM';
    analise = 'Vendedor exemplar. Recomendado para programas de destaque.';
  } else if (score < 30) {
    classificacao = 'BLOQUEADO';
    analise = 'Padrão de fraude detectado. Bloqueio preventivo sugerido.';
  } else if (score < 50) {
    classificacao = 'RISCO';
    analise = 'Monitoramento constante recomendado. Alto índice de fricção.';
  }

  return {
    scoreReputacao: score,
    classificacao,
    flags: flags.length > 0 ? flags : ['Histórico limpo'],
    analiseComportamental: analise
  };
};

// --- LÓGICA DE SEGURANÇA DE CONTA (NOVO) ---
export const analisarSegurancaContaIA = (): any => {
  // Simula uma varredura de segurança na conta do usuário
  return {
    scoreSeguranca: 88,
    status: 'PROTEGIDO',
    tentativasBloqueadas: 3, // Simula ataques reais evitados
    dispositivos: [
      { nome: 'MacBook Pro (Este dispositivo)', local: 'São Paulo, BR', status: 'Ativo', ip: '192.168.1.12' },
      { nome: 'iPhone 13', local: 'São Paulo, BR', status: 'Ativo', ip: '172.16.0.5' },
      { nome: 'Windows PC (Tentativa)', local: 'Moscow, RU', status: 'Bloqueado', ip: '45.22.19.112' } // Simula invasão russa
    ],
    analiseLogistica: { // Simula verificação de Dropshipping
      scoreEntrega: 92,
      pedidosSemRastreio: 0,
      status: 'Estoque Validado (Próprio)',
      alerta: 'Nenhum padrão de Dropshipping sem envio detectado.'
    }
  };
};
