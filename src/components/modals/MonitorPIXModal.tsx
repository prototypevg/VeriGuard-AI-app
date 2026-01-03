import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Smartphone, AlertTriangle, Clock, Shield, Ban, CheckCircle, Activity } from 'lucide-react';

interface MonitorPIXModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const transacoesPIX = [
  { id: 'PIX-9821', valor: 'R$ 45.000', origem: 'CPF ***456', destino: 'CNPJ ***789', horario: '03:42', risco: 95, status: 'bloqueado', motivo: 'Valor atípico + horário suspeito' },
  { id: 'PIX-9820', valor: 'R$ 9.999', origem: 'CPF ***123', destino: 'CPF ***321', horario: '03:38', risco: 78, status: 'revisao', motivo: 'Múltiplas transferências' },
  { id: 'PIX-9819', valor: 'R$ 15.600', origem: 'CPF ***789', destino: 'CNPJ ***456', horario: '03:35', risco: 82, status: 'bloqueado', motivo: 'Device não reconhecido' },
  { id: 'PIX-9818', valor: 'R$ 3.200', origem: 'CPF ***654', destino: 'CPF ***987', horario: '03:30', risco: 45, status: 'liberado', motivo: 'Padrão normal' },
  { id: 'PIX-9817', valor: 'R$ 50.000', origem: 'CNPJ ***111', destino: 'CNPJ ***222', horario: '03:28', risco: 88, status: 'revisao', motivo: 'Primeira transação da conta' },
];

export default function MonitorPIXModal({ onClose, darkMode = false }: MonitorPIXModalProps) {
  const [transacoes, setTransacoes] = useState(transacoesPIX);
  const [atualizando, setAtualizando] = useState(false);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setUltimaAtualizacao(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const liberarTransacao = (id: string) => {
    setTransacoes(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'liberado' } : t
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
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Monitor PIX em Tempo Real</h2>
                <p className="text-green-200 text-sm">Detecção de fraudes em transações instantâneas</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Ao vivo</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>3 transações bloqueadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>2 em revisão</span>
              </div>
            </div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Clock className="w-3 h-3 inline mr-1" />
              Última atualização: {ultimaAtualizacao.toLocaleTimeString()}
            </div>
          </div>

          {/* Transações */}
          <div className="space-y-4">
            {transacoes.map(tx => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-xl border ${
                  tx.status === 'bloqueado' 
                    ? darkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
                    : tx.status === 'revisao'
                    ? darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
                    : darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      tx.status === 'bloqueado' ? 'bg-red-500' : tx.status === 'revisao' ? 'bg-yellow-500' : 'bg-green-500'
                    } text-white`}>
                      {tx.status === 'bloqueado' ? <Ban className="w-6 h-6" /> : 
                       tx.status === 'revisao' ? <AlertTriangle className="w-6 h-6" /> : 
                       <CheckCircle className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tx.id}</span>
                        <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tx.valor}</span>
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {tx.origem} → {tx.destino} • {tx.horario}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Score de Risco
                      </div>
                      <div className={`text-2xl font-bold ${
                        tx.risco >= 80 ? 'text-red-500' : tx.risco >= 60 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {tx.risco}%
                      </div>
                    </div>

                    {tx.status === 'revisao' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => liberarTransacao(tx.id)}
                          className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          Liberar
                        </button>
                        <button
                          onClick={() => bloquearTransacao(tx.id)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Bloquear
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${tx.risco >= 80 ? 'text-red-500' : 'text-yellow-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx.motivo}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legenda */}
          <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Critérios de Detecção PIX:</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>• Horário atípico (00h-06h)</div>
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>• Valor acima do padrão</div>
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>• Device não reconhecido</div>
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>• Múltiplas transferências</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
