import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Brain, Shield, AlertTriangle, CheckCircle, Landmark, TrendingUp, GitBranch, Zap, Activity, DollarSign, Globe, Clock } from 'lucide-react';

interface LavagemAdaptativaModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const etapasDeteccao = [
  { id: 1, titulo: 'Monitoramento de Padrões', descricao: 'Analisando fluxo de transações em tempo real...', tipo: 'scan', duracao: 1500 },
  { id: 2, titulo: 'Detecção de Fragmentação', descricao: 'Identificando splitting de valores suspeitos...', tipo: 'split', duracao: 2000 },
  { id: 3, titulo: 'Análise de Rotas', descricao: 'Mapeando rede de contas intermediárias...', tipo: 'route', duracao: 2200 },
  { id: 4, titulo: 'IA Anti-Evasão', descricao: 'Detectando algoritmo que aprende regras AML...', tipo: 'ai', duracao: 2500 },
  { id: 5, titulo: 'Reconstrução de Fluxo', descricao: 'Conectando transações fragmentadas...', tipo: 'reconstruct', duracao: 2000 },
  { id: 6, titulo: '⚠️ LAVAGEM ADAPTATIVA DETECTADA', descricao: 'R$ 2.3M em transações suspeitas identificadas', tipo: 'alerta', duracao: 1000 },
  { id: 7, titulo: '🛡️ BLOQUEIO E REPORTE COAF', descricao: 'Transações bloqueadas e reportadas às autoridades', tipo: 'sucesso', duracao: 1000 },
];

const transacoesDetectadas = [
  { id: 'TX-001', valor: 'R$ 9.999', origem: 'Conta A', destino: 'Conta B', horario: '03:14', tipo: 'Fragmentação' },
  { id: 'TX-002', valor: 'R$ 9.998', origem: 'Conta A', destino: 'Conta C', horario: '03:15', tipo: 'Fragmentação' },
  { id: 'TX-003', valor: 'R$ 9.997', origem: 'Conta A', destino: 'Conta D', horario: '03:16', tipo: 'Fragmentação' },
  { id: 'TX-004', valor: 'R$ 29.994', origem: 'Contas B,C,D', destino: 'Conta E', horario: '03:45', tipo: 'Agregação' },
  { id: 'TX-005', valor: 'R$ 29.994', origem: 'Conta E', destino: 'Exchange Crypto', horario: '04:02', tipo: 'Conversão' },
];

const algoritmoDetectado = {
  nome: 'SmartLaunder v2.1',
  caracteristicas: [
    'Aprende thresholds de alertas do banco',
    'Fragmenta valores abaixo de R$ 10.000',
    'Varia horários para evitar padrões',
    'Usa contas laranjas rotativas',
    'Converte para crypto em exchanges P2P'
  ],
  valorTotal: 'R$ 2.347.892',
  contasEnvolvidas: 47,
  periodoAtividade: '3 meses'
};

export default function LavagemAdaptativaModal({ onClose, darkMode = false }: LavagemAdaptativaModalProps) {
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
      case 'scan': return Activity;
      case 'split': return GitBranch;
      case 'route': return Globe;
      case 'ai': return Brain;
      case 'reconstruct': return TrendingUp;
      case 'alerta': return AlertTriangle;
      case 'sucesso': return Shield;
      default: return DollarSign;
    }
  };

  const getCor = (tipo: string) => {
    switch (tipo) {
      case 'scan': return 'text-blue-500';
      case 'split': return 'text-purple-500';
      case 'route': return 'text-cyan-500';
      case 'ai': return 'text-pink-500';
      case 'reconstruct': return 'text-orange-500';
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
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Detecção de Lavagem Adaptativa por IA</h2>
                <p className="text-purple-200 text-sm">VeriGuard AI combate algoritmos de evasão AML</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Explicação */}
          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-purple-900/20 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>Ameaça: Lavagem de Dinheiro Adaptativa por IA</h3>
                <p className={`text-sm mt-1 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                  Algoritmos criminosos fragmentam e roteiam transações aprendendo as regras AML da instituição em tempo real,
                  minimizando alertas e evitando bloqueios através de técnicas de Machine Learning adversarial.
                </p>
              </div>
            </div>
          </div>

          {/* Botão Iniciar */}
          {!analisando && !concluido && (
            <div className="text-center mb-8">
              <button
                onClick={iniciarAnalise}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center gap-3 mx-auto"
              >
                <Zap className="w-5 h-5" />
                Iniciar Detecção Anti-Lavagem Adaptativa
              </button>
            </div>
          )}

          {/* Processo de Análise */}
          {(analisando || concluido) && (
            <div className="space-y-4 mb-8">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                🤖 Sistema Anti-Lavagem Adaptativa em Ação
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
                        {ativo && !atual && (
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
              {/* Algoritmo Detectado */}
              <div className={`p-4 rounded-xl border-2 border-red-500 ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="w-6 h-6 text-red-500" />
                  <h4 className="font-semibold text-red-600">Algoritmo de Lavagem Detectado: {algoritmoDetectado.nome}</h4>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="text-2xl font-bold text-red-500">{algoritmoDetectado.valorTotal}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Valor Total Lavado</div>
                  </div>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="text-2xl font-bold text-orange-500">{algoritmoDetectado.contasEnvolvidas}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Contas Envolvidas</div>
                  </div>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="text-2xl font-bold text-purple-500">{algoritmoDetectado.periodoAtividade}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Período de Atividade</div>
                  </div>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>Técnicas utilizadas:</strong>
                  <ul className="mt-2 space-y-1">
                    {algoritmoDetectado.caracteristicas.map((c, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-red-500">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Fluxo de Transações */}
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  📊 Fluxo de Transações Reconstruído
                </h4>
                <div className={`rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <table className="w-full">
                    <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-200'}>
                      <tr>
                        <th className="text-left py-2 px-3 text-xs">ID</th>
                        <th className="text-left py-2 px-3 text-xs">Valor</th>
                        <th className="text-left py-2 px-3 text-xs">Origem</th>
                        <th className="text-left py-2 px-3 text-xs">Destino</th>
                        <th className="text-left py-2 px-3 text-xs">Hora</th>
                        <th className="text-left py-2 px-3 text-xs">Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transacoesDetectadas.map((tx) => (
                        <tr key={tx.id} className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                          <td className={`py-2 px-3 text-xs font-mono ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tx.id}</td>
                          <td className="py-2 px-3 text-xs font-bold text-red-500">{tx.valor}</td>
                          <td className={`py-2 px-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx.origem}</td>
                          <td className={`py-2 px-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx.destino}</td>
                          <td className={`py-2 px-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx.horario}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              tx.tipo === 'Fragmentação' ? 'bg-purple-100 text-purple-700' :
                              tx.tipo === 'Agregação' ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {tx.tipo}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ações Tomadas */}
              <div className={`p-4 rounded-xl border-2 border-green-500 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  <h4 className="font-semibold text-green-600">Ações Automáticas da VeriGuard AI</h4>
                </div>
                <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>✓ R$ 2.347.892 em transações bloqueadas</li>
                  <li>✓ 47 contas congeladas para investigação</li>
                  <li>✓ Relatório SAR enviado automaticamente ao COAF</li>
                  <li>✓ Algoritmo de lavagem catalogado e bloqueado</li>
                  <li>✓ Regras AML atualizadas para prevenir variantes</li>
                  <li>✓ Evidence Pack gerado para autoridades policiais</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
