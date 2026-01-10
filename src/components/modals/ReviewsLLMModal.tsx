import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Brain, Shield, AlertTriangle, CheckCircle, MessageSquare, Star, Bot, Zap, TrendingUp, BarChart3, FileText } from 'lucide-react';

interface ReviewsLLMModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const etapasDeteccao = [
  { id: 1, titulo: 'Coletando Reviews Recentes', descricao: 'Analisando 500 avaliações dos últimos 7 dias...', tipo: 'scan', duracao: 1500 },
  { id: 2, titulo: 'Análise Semântica (NLP)', descricao: 'Detectando padrões de linguagem de LLM...', tipo: 'nlp', duracao: 2000 },
  { id: 3, titulo: 'Análise de Sentimento', descricao: 'Verificando variação emocional artificial...', tipo: 'sentiment', duracao: 1800 },
  { id: 4, titulo: 'Detecção de Perplexidade', descricao: 'Medindo entropia textual típica de IA...', tipo: 'perplexity', duracao: 2000 },
  { id: 5, titulo: 'Cross-Reference de Contas', descricao: 'Identificando clusters de contas fake...', tipo: 'accounts', duracao: 1800 },
  { id: 6, titulo: '⚠️ 47 REVIEWS FALSOS DETECTADOS', descricao: 'Reviews gerados por LLM identificados', tipo: 'alerta', duracao: 1000 },
  { id: 7, titulo: '🛡️ REVIEWS REMOVIDOS', descricao: 'Avaliações fake excluídas e contas banidas', tipo: 'sucesso', duracao: 1000 },
];

const reviewsFalsos = [
  { 
    id: 1, 
    texto: 'Produto excepcional! Superou todas as minhas expectativas. A qualidade é impecável e o suporte é fantástico. Recomendo fortemente!',
    autor: 'Usuario_2847',
    data: '02/01/2025',
    score: 98,
    motivos: ['Padrão GPT-4 detectado', 'Sem detalhes específicos', 'Conta criada há 2 dias']
  },
  { 
    id: 2, 
    texto: 'Experiência transformadora! Este curso mudou completamente minha perspectiva sobre marketing digital. O conteúdo é riquíssimo.',
    autor: 'Comprador_9182',
    data: '02/01/2025',
    score: 95,
    motivos: ['Vocabulário típico de LLM', 'Estrutura repetitiva', 'IP compartilhado']
  },
  { 
    id: 3, 
    texto: 'Simplesmente incrível! Cada módulo é uma aula de excelência. O professor domina o assunto como poucos. Vale cada centavo investido!',
    autor: 'Cliente_Feliz_123',
    data: '01/01/2025',
    score: 92,
    motivos: ['Perplexidade baixa', 'Emojis ausentes', 'Timing suspeito']
  },
];

const estatisticas = {
  totalAnalisados: 500,
  falsosDetectados: 47,
  taxaDeteccao: '94.2%',
  contasBanidas: 23,
  impactoNota: '-0.8 estrelas'
};

export default function ReviewsLLMModal({ onClose, darkMode = false }: ReviewsLLMModalProps) {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [analisando, setAnalisando] = useState(false);
  const [concluido, setConcluido] = useState(false);

  const iniciarAnalise = () => {
    setAnalisando(true);
    setConcluido(false);
    setEtapaAtual(0);

    let etapa = 0;
    const executarEtapa = () => {
      if (etapa < etapasDeteccao.length) {
        setEtapaAtual(etapa + 1);
        setTimeout(() => {
          etapa++;
          executarEtapa();
        }, etapasDeteccao[etapa].duracao);
      } else {
        setAnalisando(false);
        setConcluido(true);
      }
    };
    executarEtapa();
  };

  const getIcone = (tipo: string) => {
    switch (tipo) {
      case 'scan': return MessageSquare;
      case 'nlp': return Brain;
      case 'sentiment': return Star;
      case 'perplexity': return BarChart3;
      case 'accounts': return Bot;
      case 'alerta': return AlertTriangle;
      case 'sucesso': return Shield;
      default: return FileText;
    }
  };

  const getCor = (tipo: string) => {
    switch (tipo) {
      case 'scan': return 'text-blue-500';
      case 'nlp': return 'text-purple-500';
      case 'sentiment': return 'text-yellow-500';
      case 'perplexity': return 'text-cyan-500';
      case 'accounts': return 'text-orange-500';
      case 'alerta': return 'text-red-500';
      case 'sucesso': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-5xl rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Detecção de Reviews por LLM</h2>
                <p className="text-yellow-100 text-sm">VeriGuard AI identifica avaliações geradas por IA</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Explicação */}
          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>Ameaça: Reviews Contextuais Gerados por LLM</h3>
                <p className={`text-sm mt-1 ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                  Fraudadores usam GPT-4, Claude e outros LLMs para produzir avaliações falsas altamente específicas, 
                  coerentes e emocionalmente variadas, impossíveis de detectar por filtros tradicionais de spam.
                </p>
              </div>
            </div>
          </div>

          {/* Botão Iniciar */}
          {!analisando && !concluido && (
            <div className="text-center mb-8">
              <button
                onClick={iniciarAnalise}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all flex items-center gap-3 mx-auto"
              >
                <Zap className="w-5 h-5" />
                Iniciar Análise de Reviews
              </button>
            </div>
          )}

          {/* Processo de Análise */}
          {(analisando || concluido) && (
            <div className="space-y-4 mb-8">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                🤖 Detector de Reviews LLM em Ação
              </h3>
              
              <div className="space-y-3">
                {etapasDeteccao.map((etapa, index) => {
                  const Icone = getIcone(etapa.tipo);
                  const ativo = index < etapaAtual;
                  const atual = index === etapaAtual - 1;
                  
                  return (
                    <motion.div
                      key={etapa.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: ativo ? 1 : 0.3, 
                        x: 0,
                        scale: atual ? 1.02 : 1
                      }}
                      className={`p-4 rounded-xl border ${
                        atual 
                          ? darkMode ? 'bg-yellow-900/30 border-yellow-500' : 'bg-yellow-50 border-yellow-300'
                          : ativo
                          ? darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                          : darkMode ? 'bg-gray-800/50 border-gray-800' : 'bg-gray-100/50 border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          ativo ? getCor(etapa.tipo).replace('text-', 'bg-').replace('500', '100') : 'bg-gray-200'
                        }`}>
                          <Icone className={`w-5 h-5 ${ativo ? getCor(etapa.tipo) : 'text-gray-400'}`} />
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${
                            etapa.tipo === 'alerta' ? 'text-red-500' : 
                            etapa.tipo === 'sucesso' ? 'text-green-500' :
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {etapa.titulo}
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {etapa.descricao}
                          </div>
                        </div>
                        {ativo && !atual && (
                          <CheckCircle className={`w-5 h-5 ${etapa.tipo === 'alerta' ? 'text-red-500' : etapa.tipo === 'sucesso' ? 'text-green-500' : 'text-green-500'}`} />
                        )}
                        {atual && analisando && (
                          <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Resultado */}
          {concluido && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Estatísticas */}
              <div className="grid grid-cols-5 gap-4">
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                  <div className="text-2xl font-bold text-blue-500">{estatisticas.totalAnalisados}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Analisados</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
                  <div className="text-2xl font-bold text-red-500">{estatisticas.falsosDetectados}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Falsos</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
                  <div className="text-2xl font-bold text-green-500">{estatisticas.taxaDeteccao}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Precisão</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                  <div className="text-2xl font-bold text-purple-500">{estatisticas.contasBanidas}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Banidas</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-orange-900/30' : 'bg-orange-50'}`}>
                  <div className="text-2xl font-bold text-orange-500">{estatisticas.impactoNota}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Impacto</div>
                </div>
              </div>

              {/* Exemplos de Reviews Falsos */}
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  🔍 Exemplos de Reviews Gerados por LLM
                </h4>
                <div className="space-y-4">
                  {reviewsFalsos.map((review) => (
                    <div key={review.id} className={`p-4 rounded-lg border-l-4 border-red-500 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              por {review.autor} • {review.data}
                            </span>
                          </div>
                          <p className={`text-sm italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            "{review.texto}"
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {review.motivos.map((motivo, i) => (
                              <span key={i} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                                {motivo}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-500">{review.score}%</div>
                          <div className="text-xs text-red-500">IA Score</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ações Tomadas */}
              <div className={`p-4 rounded-xl border-2 border-green-500 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  <h4 className="font-semibold text-green-600">Ações Automáticas da VeriGuard AI</h4>
                </div>
                <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>✓ 47 reviews falsos removidos automaticamente</li>
                  <li>✓ 23 contas de bots banidas permanentemente</li>
                  <li>✓ Nota do produto recalculada (4.8 → 4.0)</li>
                  <li>✓ Vendedor notificado sobre manipulação detectada</li>
                  <li>✓ Padrões de LLM adicionados ao modelo de detecção</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
