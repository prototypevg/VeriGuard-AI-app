import { useState } from 'react';
import { motion } from 'motion/react';
import { X, CreditCard, AlertTriangle, Globe, MapPin, Shield, Ban, CheckCircle } from 'lucide-react';

interface FraudeCartoesModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const transacoesCartao = [
  { id: 'CC-4521', cartao: '**** 8734', valor: 'R$ 12.340', local: 'Moscou, Rússia', tipo: 'Online', risco: 98, status: 'bloqueado', motivo: 'País de alto risco + valor atípico' },
  { id: 'CC-4520', cartao: '**** 2156', valor: 'R$ 3.200', local: 'São Paulo, BR', tipo: 'Físico', risco: 25, status: 'aprovado', motivo: 'Padrão normal' },
  { id: 'CC-4519', cartao: '**** 9087', valor: 'R$ 8.900', local: 'Lagos, Nigéria', tipo: 'Online', risco: 95, status: 'bloqueado', motivo: 'Primeira compra internacional' },
  { id: 'CC-4518', cartao: '**** 3421', valor: 'R$ 1.500', local: 'Miami, EUA', tipo: 'Online', risco: 45, status: 'revisao', motivo: 'Novo merchant' },
  { id: 'CC-4517', cartao: '**** 6543', valor: 'R$ 25.000', local: 'Dubai, UAE', tipo: 'Físico', risco: 72, status: 'revisao', motivo: 'Cartão usado em outro país há 2h' },
];

const estatisticas = [
  { label: 'Transações Hoje', valor: '45.892', icone: CreditCard },
  { label: 'Bloqueadas', valor: '234', icone: Ban },
  { label: 'Valor Protegido', valor: 'R$ 1.2M', icone: Shield },
  { label: 'Taxa Precisão', valor: '99.1%', icone: CheckCircle },
];

export default function FraudeCartoesModal({ onClose, darkMode = false }: FraudeCartoesModalProps) {
  const [transacoes, setTransacoes] = useState(transacoesCartao);

  const aprovarTransacao = (id: string) => {
    setTransacoes(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'aprovado' } : t
    ));
  };

  const bloquearTransacao = (id: string) => {
    setTransacoes(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'bloqueado' } : t
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-5xl rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Detecção de Fraude em Cartões</h2>
                <p className="text-blue-200 text-sm">Monitoramento de transações suspeitas</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Estatísticas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {estatisticas.map((stat, i) => (
              <div key={i} className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                    <stat.icone className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                    <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.valor}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lista de Transações */}
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Transações em Análise
          </h3>
          
          <div className="space-y-3">
            {transacoes.map(tx => (
              <motion.div
                key={tx.id}
                layout
                className={`p-4 rounded-xl border ${
                  tx.status === 'bloqueado' 
                    ? darkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
                    : tx.status === 'revisao'
                    ? darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
                    : darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx.id}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        tx.tipo === 'Online' 
                          ? darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
                          : darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                        <Globe className="w-3 h-3 inline mr-1" />
                        {tx.tipo}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tx.valor}</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Cartão {tx.cartao}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx.local}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Risco</div>
                      <div className={`text-2xl font-bold ${
                        tx.risco >= 80 ? 'text-red-500' : tx.risco >= 50 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {tx.risco}%
                      </div>
                    </div>

                    {tx.status === 'revisao' && (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => aprovarTransacao(tx.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          Aprovar
                        </button>
                        <button
                          onClick={() => bloquearTransacao(tx.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Bloquear
                        </button>
                      </div>
                    )}

                    {tx.status !== 'revisao' && (
                      <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        tx.status === 'bloqueado' 
                          ? 'bg-red-600 text-white'
                          : 'bg-green-600 text-white'
                      }`}>
                        {tx.status === 'bloqueado' ? 'Bloqueado' : 'Aprovado'}
                      </div>
                    )}
                  </div>
                </div>

                <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center gap-2`}>
                  <AlertTriangle className={`w-4 h-4 ${tx.risco >= 80 ? 'text-red-500' : 'text-yellow-500'}`} />
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx.motivo}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
