import { useState } from 'react';
import { motion } from 'motion/react';
import { X, UserX, AlertTriangle, Search, Ban, Eye, Shield, Clock, MapPin } from 'lucide-react';

interface ContasSuspeitasModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const contasSuspeitas = [
  { 
    id: 'ACC-001', 
    titular: 'João S****', 
    cpf: '***.***.***-12', 
    abertura: '15/11/2024',
    saldo: 'R$ 156.000',
    transacoes: 847,
    risco: 95,
    motivos: ['Volume atípico', 'Múltiplos destinatários', 'Horários suspeitos'],
    status: 'investigando'
  },
  { 
    id: 'ACC-002', 
    titular: 'Maria F****', 
    cpf: '***.***.***-34', 
    abertura: '02/12/2024',
    saldo: 'R$ 89.000',
    transacoes: 234,
    risco: 88,
    motivos: ['Conta nova com alto volume', 'CPF vinculado a fraudes'],
    status: 'bloqueada'
  },
  { 
    id: 'ACC-003', 
    titular: 'Empresa X****', 
    cpf: '**.***.***/**-01', 
    abertura: '20/10/2024',
    saldo: 'R$ 2.3M',
    transacoes: 1247,
    risco: 78,
    motivos: ['Faturamento incompatível', 'Saques em espécie'],
    status: 'monitorando'
  },
  { 
    id: 'ACC-004', 
    titular: 'Pedro R****', 
    cpf: '***.***.***-56', 
    abertura: '08/12/2024',
    saldo: 'R$ 45.600',
    transacoes: 156,
    risco: 72,
    motivos: ['Endereço divergente', 'Documentos inconsistentes'],
    status: 'investigando'
  },
];

export default function ContasSuspeitasModal({ onClose, darkMode = false }: ContasSuspeitasModalProps) {
  const [contas, setContas] = useState(contasSuspeitas);
  const [contaSelecionada, setContaSelecionada] = useState<string | null>(null);
  const [busca, setBusca] = useState('');

  const bloquearConta = (id: string) => {
    setContas(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'bloqueada' } : c
    ));
  };

  const liberarConta = (id: string) => {
    setContas(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'liberada' } : c
    ));
  };

  const contasFiltradas = contas.filter(c => 
    c.titular.toLowerCase().includes(busca.toLowerCase()) ||
    c.id.toLowerCase().includes(busca.toLowerCase())
  );

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
        <div className="bg-gradient-to-r from-red-600 to-rose-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <UserX className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Contas Suspeitas</h2>
                <p className="text-red-200 text-sm">Gerenciamento de contas com comportamento anômalo</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Barra de Busca */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <Search className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Buscar por ID ou titular..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className={`flex-1 bg-transparent outline-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
              />
            </div>
            <div className={`px-4 py-3 rounded-xl ${darkMode ? 'bg-red-900/30' : 'bg-red-100'}`}>
              <span className={`font-bold ${darkMode ? 'text-red-400' : 'text-red-700'}`}>{contas.length}</span>
              <span className={`text-sm ml-1 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>contas em análise</span>
            </div>
          </div>

          {/* Lista de Contas */}
          <div className="space-y-4">
            {contasFiltradas.map(conta => (
              <motion.div
                key={conta.id}
                layout
                className={`rounded-xl border overflow-hidden ${
                  conta.status === 'bloqueada'
                    ? darkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
                    : conta.status === 'liberada'
                    ? darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
                    : darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{conta.id}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          conta.status === 'bloqueada' ? 'bg-red-600 text-white' :
                          conta.status === 'liberada' ? 'bg-green-600 text-white' :
                          conta.status === 'investigando' ? 'bg-yellow-500 text-white' :
                          'bg-blue-500 text-white'
                        }`}>
                          {conta.status}
                        </span>
                      </div>
                      
                      <div className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {conta.titular}
                      </div>
                      
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        CPF/CNPJ: {conta.cpf} • Abertura: {conta.abertura}
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Saldo: <span className="font-semibold">{conta.saldo}</span>
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Transações: <span className="font-semibold">{conta.transacoes}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score Risco</div>
                        <div className={`text-3xl font-bold ${
                          conta.risco >= 80 ? 'text-red-500' : conta.risco >= 60 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {conta.risco}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Motivos */}
                  <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Alertas detectados:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {conta.motivos.map((motivo, i) => (
                        <span key={i} className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                        }`}>
                          <AlertTriangle className="w-3 h-3" />
                          {motivo}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ações */}
                  {conta.status !== 'bloqueada' && conta.status !== 'liberada' && (
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setContaSelecionada(conta.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                          darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                        Investigar
                      </button>
                      <button
                        onClick={() => bloquearConta(conta.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        <Ban className="w-4 h-4" />
                        Bloquear
                      </button>
                      <button
                        onClick={() => liberarConta(conta.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        <Shield className="w-4 h-4" />
                        Liberar
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
