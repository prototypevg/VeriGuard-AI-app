import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Brain, Shield, AlertTriangle, CheckCircle, Scan, Image, FileText, Video, Fingerprint, Activity, Zap } from 'lucide-react';

interface ClonagemMultimodalModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const etapasDeteccao = [
  { id: 1, titulo: 'Escaneamento Iniciado', descricao: 'Analisando produto suspeito...', tipo: 'scan', duracao: 1500 },
  { id: 2, titulo: 'Análise de Imagem (Vision AI)', descricao: 'Comparando com banco de imagens originais...', tipo: 'imagem', duracao: 2000 },
  { id: 3, titulo: 'Análise de Texto (NLP)', descricao: 'Detectando padrões semânticos de clonagem...', tipo: 'texto', duracao: 1800 },
  { id: 4, titulo: 'Análise de Vídeo (Deep Learning)', descricao: 'Verificando autenticidade de demonstrações...', tipo: 'video', duracao: 2200 },
  { id: 5, titulo: 'Cross-Reference Hash', descricao: 'Comparando fingerprint digital com originais...', tipo: 'hash', duracao: 1500 },
  { id: 6, titulo: '⚠️ CLONE DETECTADO', descricao: 'Similaridade semântica: 94.7% com produto original', tipo: 'alerta', duracao: 1000 },
  { id: 7, titulo: '🛡️ BLOQUEIO AUTOMÁTICO', descricao: 'Produto bloqueado e Evidence Pack gerado', tipo: 'sucesso', duracao: 1000 },
];

const produtoClone = {
  nome: 'Curso Marketing Digital PRO 2025',
  vendedor: 'Digital_Master_Fake',
  preco: 'R$ 47,00',
  original: {
    nome: 'Curso Marketing Digital PRO',
    vendedor: 'João Silva Digital',
    preco: 'R$ 297,00'
  },
  similaridades: [
    { tipo: 'Imagem', score: 89, metodo: 'Gerada por DALL-E/MidJourney' },
    { tipo: 'Descrição', score: 94, metodo: 'Reescrita por GPT-4' },
    { tipo: 'Estrutura', score: 97, metodo: 'Módulos idênticos renomeados' },
    { tipo: 'Vídeo Preview', score: 78, metodo: 'Deepfake de apresentação' },
  ]
};

export default function ClonagemMultimodalModal({ onClose, darkMode = false }: ClonagemMultimodalModalProps) {
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
      case 'scan': return Scan;
      case 'imagem': return Image;
      case 'texto': return FileText;
      case 'video': return Video;
      case 'hash': return Fingerprint;
      case 'alerta': return AlertTriangle;
      case 'sucesso': return Shield;
      default: return Activity;
    }
  };

  const getCor = (tipo: string) => {
    switch (tipo) {
      case 'scan': return 'text-blue-500';
      case 'imagem': return 'text-purple-500';
      case 'texto': return 'text-cyan-500';
      case 'video': return 'text-pink-500';
      case 'hash': return 'text-orange-500';
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
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Detecção de Clonagem Multimodal por IA</h2>
                <p className="text-purple-200 text-sm">VeriGuard AI detecta clones gerados por IA generativa</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Explicação */}
          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-red-400' : 'text-red-800'}`}>Ameaça: Clonagem Multimodal por IA</h3>
                <p className={`text-sm mt-1 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                  Fraudadores usam IA generativa (GPT-4, DALL-E, MidJourney) para criar descrições, imagens e vídeos 
                  semanticamente diferentes, porém funcionalmente idênticos, burlando detecção tradicional de plágio.
                </p>
              </div>
            </div>
          </div>

          {/* Botão Iniciar */}
          {!analisando && !concluido && (
            <div className="text-center mb-8">
              <button
                onClick={iniciarAnalise}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-3 mx-auto"
              >
                <Zap className="w-5 h-5" />
                Iniciar Detecção com IA VeriGuard
              </button>
            </div>
          )}

          {/* Processo de Análise */}
          {(analisando || concluido) && (
            <div className="space-y-4 mb-8">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                🤖 VeriGuard AI em Ação
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
                          ? darkMode ? 'bg-purple-900/30 border-purple-500' : 'bg-purple-50 border-purple-300'
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
                        {ativo && (
                          <CheckCircle className={`w-5 h-5 ${etapa.tipo === 'alerta' ? 'text-red-500' : etapa.tipo === 'sucesso' ? 'text-green-500' : 'text-green-500'}`} />
                        )}
                        {atual && analisando && (
                          <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
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
              {/* Comparação */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border-2 border-red-500 ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                  <div className="text-red-500 text-xs font-bold mb-2">❌ CLONE DETECTADO</div>
                  <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{produtoClone.nome}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Por: {produtoClone.vendedor}</div>
                  <div className="text-red-500 font-bold mt-2">{produtoClone.preco}</div>
                </div>
                
                <div className={`p-4 rounded-xl border-2 border-green-500 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <div className="text-green-500 text-xs font-bold mb-2">✓ PRODUTO ORIGINAL</div>
                  <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{produtoClone.original.nome}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Por: {produtoClone.original.vendedor}</div>
                  <div className="text-green-500 font-bold mt-2">{produtoClone.original.preco}</div>
                </div>
              </div>

              {/* Análise de Similaridade */}
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  📊 Análise de Similaridade por IA
                </h4>
                <div className="space-y-3">
                  {produtoClone.similaridades.map((sim, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-24 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{sim.tipo}</div>
                      <div className="flex-1 h-3 bg-gray-300 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${sim.score}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className={`h-full rounded-full ${
                            sim.score >= 90 ? 'bg-red-500' : sim.score >= 70 ? 'bg-orange-500' : 'bg-yellow-500'
                          }`}
                        />
                      </div>
                      <div className={`w-12 text-right font-bold ${
                        sim.score >= 90 ? 'text-red-500' : sim.score >= 70 ? 'text-orange-500' : 'text-yellow-500'
                      }`}>
                        {sim.score}%
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {sim.metodo}
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
                  <li>✓ Produto clone bloqueado automaticamente</li>
                  <li>✓ Vendedor fraudulento adicionado à blacklist</li>
                  <li>✓ Evidence Pack gerado com hash: <code className="bg-gray-200 px-1 rounded">0x8f7d...4a2c</code></li>
                  <li>✓ Vendedor original notificado</li>
                  <li>✓ Caso registrado para ação legal</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
