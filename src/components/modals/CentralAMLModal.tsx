import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Landmark, AlertTriangle, TrendingUp, FileText, Search, Filter, Download } from 'lucide-react';

interface CentralAMLModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const casosAML = [
  { id: 'AML-001', tipo: 'Smurfing', valor: 'R$ 890.000', origem: 'Múltiplas contas', status: 'Investigando', risco: 'alto' },
  { id: 'AML-002', tipo: 'Layering', valor: 'R$ 2.3M', origem: 'Offshore', status: 'Reportado COAF', risco: 'crítico' },
  { id: 'AML-003', tipo: 'Conta Laranja', valor: 'R$ 156.000', origem: 'CPF Suspeito', status: 'Bloqueado', risco: 'médio' },
  { id: 'AML-004', tipo: 'Estruturação', valor: 'R$ 49.900', origem: 'Depósitos fracionados', status: 'Monitorando', risco: 'médio' },
  { id: 'AML-005', tipo: 'Trade-Based', valor: 'R$ 5.1M', origem: 'Importação fictícia', status: 'Reportado COAF', risco: 'crítico' },
];

const metricas = [
  { label: 'Casos Ativos', valor: '47', variacao: '+12%', cor: 'red' },
  { label: 'Valor em Risco', valor: 'R$ 23.4M', variacao: '-8%', cor: 'green' },
  { label: 'Taxa Detecção', valor: '94.7%', variacao: '+3%', cor: 'green' },
  { label: 'Reportados COAF', valor: '18', variacao: '+5', cor: 'yellow' },
];

export default function CentralAMLModal({ onClose, darkMode = false }: CentralAMLModalProps) {
  const [filtro, setFiltro] = useState('todos');
  const [buscando, setBuscando] = useState(false);

  const analisarCaso = (id: string) => {
    setBuscando(true);
    setTimeout(() => {
      setBuscando(false);
      alert(`Análise detalhada do caso ${id} aberta em nova aba`);
    }, 1000);
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
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Central AML</h2>
                <p className="text-purple-200 text-sm">Anti-Money Laundering • Compliance COAF</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Métricas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metricas.map((m, i) => (
              <div key={i} className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{m.label}</div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{m.valor}</div>
                <div className={`text-xs ${m.cor === 'green' ? 'text-green-500' : m.cor === 'red' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {m.variacao} vs. mês anterior
                </div>
              </div>
            ))}
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Filter className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Filtrar:</span>
            </div>
            {['todos', 'crítico', 'alto', 'médio'].map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filtro === f 
                    ? 'bg-purple-600 text-white' 
                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Tabela de Casos */}
          <div className={`rounded-xl border overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>ID</th>
                  <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tipo</th>
                  <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Valor</th>
                  <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Origem</th>
                  <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Risco</th>
                  <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                  <th className={`text-right py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {casosAML.filter(c => filtro === 'todos' || c.risco === filtro).map(caso => (
                  <tr key={caso.id} className={`border-t ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                    <td className={`py-3 px-4 text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{caso.id}</td>
                    <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{caso.tipo}</td>
                    <td className={`py-3 px-4 text-sm font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{caso.valor}</td>
                    <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{caso.origem}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        caso.risco === 'crítico' ? 'bg-red-100 text-red-700' :
                        caso.risco === 'alto' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {caso.risco}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{caso.status}</td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => analisarCaso(caso.id)}
                        className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                      >
                        {buscando ? 'Analisando...' : 'Analisar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ações */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <FileText className="w-4 h-4" />
              Gerar Relatório COAF
            </button>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              <Download className="w-4 h-4" />
              Exportar Dados
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
