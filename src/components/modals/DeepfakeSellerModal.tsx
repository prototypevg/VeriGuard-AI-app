import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Brain, Shield, AlertTriangle, CheckCircle, User, MessageSquare, Camera, Mic, Fingerprint, Zap, Bot, UserX } from 'lucide-react';

interface DeepfakeSellerModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const etapasDeteccao = [
  { id: 1, titulo: 'Análise de Perfil Iniciada', descricao: 'Coletando dados do vendedor suspeito...', tipo: 'scan', duracao: 1500 },
  { id: 2, titulo: 'Verificação Facial (Anti-Deepfake)', descricao: 'Analisando micro-expressões e artefatos de IA...', tipo: 'facial', duracao: 2500 },
  { id: 3, titulo: 'Análise de Voz (Voice Print)', descricao: 'Detectando síntese de voz por IA...', tipo: 'voz', duracao: 2000 },
  { id: 4, titulo: 'Análise de Linguagem (NLP)', descricao: 'Identificando padrões de chatbot/LLM...', tipo: 'chat', duracao: 1800 },
  { id: 5, titulo: 'Cross-Reference de Identidade', descricao: 'Comparando com base de identidades verificadas...', tipo: 'identity', duracao: 2000 },
  { id: 6, titulo: '⚠️ DEEPFAKE DETECTADO', descricao: 'Persona sintética identificada com 97.3% de certeza', tipo: 'alerta', duracao: 1000 },
  { id: 7, titulo: '🛡️ CONTA BLOQUEADA', descricao: 'Impostor neutralizado e compradores alertados', tipo: 'sucesso', duracao: 1000 },
];

const perfilFake = {
  nome: 'João Silva Digital',
  foto: '🧑‍💼',
  seguidores: '45.2K',
  vendas: '1,234',
  desde: 'Janeiro 2024',
  analise: {
    facial: { score: 97, detalhes: 'Artefatos de GAN detectados nas bordas do rosto' },
    voz: { score: 94, detalhes: 'Frequências inconsistentes típicas de ElevenLabs/VALL-E' },
    chat: { score: 89, detalhes: 'Padrões de resposta idênticos a GPT-4 fine-tuned' },
    identidade: { score: 98, detalhes: 'CPF vinculado a outra pessoa, foto não corresponde' }
  }
};

export default function DeepfakeSellerModal({ onClose, darkMode = false }: DeepfakeSellerModalProps) {
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
      case 'scan': return User;
      case 'facial': return Camera;
      case 'voz': return Mic;
      case 'chat': return MessageSquare;
      case 'identity': return Fingerprint;
      case 'alerta': return AlertTriangle;
      case 'sucesso': return Shield;
      default: return Bot;
    }
  };

  const getCor = (tipo: string) => {
    switch (tipo) {
      case 'scan': return 'text-blue-500';
      case 'facial': return 'text-purple-500';
      case 'voz': return 'text-pink-500';
      case 'chat': return 'text-cyan-500';
      case 'identity': return 'text-orange-500';
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
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <UserX className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Detecção de Deepfake Seller</h2>
                <p className="text-orange-200 text-sm">VeriGuard AI identifica personas sintéticas fraudulentas</p>
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
                <h3 className={`font-semibold ${darkMode ? 'text-red-400' : 'text-red-800'}`}>Ameaça: Persona Sintética de Vendedor (Deepfake Seller)</h3>
                <p className={`text-sm mt-1 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                  Fraudadores usam IA para criar identidade completa — imagem facial por GAN, voz por síntese neural, 
                  e atendimento automatizado por LLM — para se passar pelo vendedor legítimo e desviar vendas.
                </p>
              </div>
            </div>
          </div>

          {/* Perfil Suspeito */}
          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl">
                {perfilFake.foto}
              </div>
              <div>
                <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{perfilFake.nome}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {perfilFake.seguidores} seguidores • {perfilFake.vendas} vendas • Desde {perfilFake.desde}
                </div>
                <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium inline-block ${darkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
                  ⚠️ Perfil sob investigação
                </div>
              </div>
            </div>
          </div>

          {/* Botão Iniciar */}
          {!analisando && !concluido && (
            <div className="text-center mb-8">
              <button
                onClick={iniciarAnalise}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition-all flex items-center gap-3 mx-auto"
              >
                <Zap className="w-5 h-5" />
                Iniciar Verificação Anti-Deepfake
              </button>
            </div>
          )}

          {/* Processo de Análise */}
          {(analisando || concluido) && (
            <div className="space-y-4 mb-8">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                🤖 Sistema Anti-Deepfake em Ação
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
                          ? darkMode ? 'bg-orange-900/30 border-orange-500' : 'bg-orange-50 border-orange-300'
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
                          <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
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
              {/* Análise Detalhada */}
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  🔍 Análise Detalhada de Autenticidade
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(perfilFake.analise).map(([key, value], i) => (
                    <div key={key} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium capitalize ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {key === 'facial' ? '👤 Análise Facial' :
                           key === 'voz' ? '🎤 Análise de Voz' :
                           key === 'chat' ? '💬 Análise de Chat' :
                           '🆔 Identidade'}
                        </span>
                        <span className={`text-lg font-bold ${value.score >= 90 ? 'text-red-500' : 'text-orange-500'}`}>
                          {value.score}% fake
                        </span>
                      </div>
                      <div className="h-2 bg-gray-300 rounded-full overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${value.score}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className="h-full bg-red-500 rounded-full"
                        />
                      </div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{value.detalhes}</p>
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
                  <li>✓ Conta do impostor bloqueada imediatamente</li>
                  <li>✓ 1,234 compradores notificados sobre a fraude</li>
                  <li>✓ Vendedor original alertado e protegido</li>
                  <li>✓ Biometria facial adicionada à blacklist global</li>
                  <li>✓ Evidence Pack gerado para ação judicial</li>
                  <li>✓ Transações pendentes congeladas para análise</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
