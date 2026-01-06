import { useState } from 'react';
import { motion } from 'motion/react';
import { X, UserX, AlertTriangle, Shield, Ban, Eye, TrendingDown, FileText, Clock } from 'lucide-react';

interface VendedorGolpistaModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const vendedoresSuspeitos = [
  { 
    id: 'VG-001', 
    nome: 'Loja Milagrosa',
    cnpj: '**.***.***/**-01',
    cadastro: '15/12/2024',
    produtos: 45,
    vendas: 234,
    reclamacoes: 89,
    chargebacks: 23,
    score: 12,
    status: 'alto_risco',
    alertas: ['CNPJ irregular', 'Endereço fictício', 'Alto índice de reclamações', 'Preços muito baixos']
  },
  { 
    id: 'VG-002', 
    nome: 'Super Ofertas BR',
    cnpj: '**.***.***/**-02',
    cadastro: '20/12/2024',
    produtos: 128,
    vendas: 567,
    reclamacoes: 45,
    chargebacks: 12,
    score: 35,
    status: 'suspeito',
    alertas: ['Conta nova com muitos produtos', 'Fotos de banco de imagens']
  },
  { 
    id: 'VG-003', 
    nome: 'Tech Import Express',
    cnpj: '**.***.***/**-03',
    cadastro: '01/12/2024',
    produtos: 89,
    vendas: 1234,
    reclamacoes: 23,
    chargebacks: 5,
    score: 68,
    status: 'monitorando',
    alertas: ['Prazo de entrega longo', 'Sem nota fiscal']
  },
];

const estatisticas = {
  bloqueadosHoje: 5,
  investigando: 12,
  prejuizoEvitado: 'R$ 234.500',
  taxaDeteccao: '94.2%'
};

export default function VendedorGolpistaModal({ onClose, darkMode = false }: VendedorGolpistaModalProps) {
  const [vendedores, setVendedores] = useState(vendedoresSuspeitos);
  const [filtro, setFiltro] = useState('todos');

  const bloquearVendedor = (id: string) => {
    setVendedores(prev => prev.map(v => 
      v.id === id ? { ...v, status: 'bloqueado' } : v
    ));
  };

  const filtrados = vendedores.filter(v => 
    filtro === 'todos' || v.status === filtro
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
                <h2 className="text-xl font-bold">Detecção de Vendedores Golpistas</h2>
                <p className="text-red-200 text-sm">IA identifica padrões de fraude em tempo real</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Estatísticas */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
              <div className="text-2xl font-bold text-red-500">{estatisticas.bloqueadosHoje}</div>
              <div className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Bloqueados Hoje</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
              <div className="text-2xl font-bold text-yellow-500">{estatisticas.investigando}</div>
              <div className={`text-xs ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Investigando</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <div className="text-2xl font-bold text-green-500">{estatisticas.prejuizoEvitado}</div>
              <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Prejuízo Evitado</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <div className="text-2xl font-bold text-blue-500">{estatisticas.taxaDeteccao}</div>
              <div className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Taxa de Detecção</div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 mb-6">
            {['todos', 'alto_risco', 'suspeito', 'monitorando', 'bloqueado'].map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filtro === f 
                    ? 'bg-red-600 text-white' 
                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f === 'alto_risco' ? 'Alto Risco' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Lista de Vendedores */}
          <div className="space-y-4">
            {filtrados.map(vendedor => (
              <motion.div
                key={vendedor.id}
                layout
                className={`p-4 rounded-xl border ${
                  vendedor.status === 'alto_risco' || vendedor.status === 'bloqueado'
                    ? darkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
                    : vendedor.status === 'suspeito'
                    ? darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
                    : darkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-mono text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{vendedor.id}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        vendedor.status === 'alto_risco' ? 'bg-red-600 text-white' :
                        vendedor.status === 'bloqueado' ? 'bg-gray-600 text-white' :
                        vendedor.status === 'suspeito' ? 'bg-yellow-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        {vendedor.status === 'alto_risco' ? 'ALTO RISCO' : vendedor.status.toUpperCase()}
                      </span>
                    </div>

                    <div className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {vendedor.nome}
                    </div>
                    
                    <div className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      CNPJ: {vendedor.cnpj} • Cadastro: {vendedor.cadastro}
                    </div>

                    {/* Métricas do Vendedor */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className={`p-2 rounded text-center ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{vendedor.produtos}</div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Produtos</div>
                      </div>
                      <div className={`p-2 rounded text-center ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{vendedor.vendas}</div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vendas</div>
                      </div>
                      <div className={`p-2 rounded text-center ${darkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
                        <div className="text-lg font-bold text-red-500">{vendedor.reclamacoes}</div>
                        <div className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Reclamações</div>
                      </div>
                      <div className={`p-2 rounded text-center ${darkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
                        <div className="text-lg font-bold text-red-500">{vendedor.chargebacks}</div>
                        <div className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Chargebacks</div>
                      </div>
                    </div>

                    {/* Alertas */}
                    <div className="flex flex-wrap gap-2">
                      {vendedor.alertas.map((alerta, i) => (
                        <span key={i} className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                          darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                        }`}>
                          <AlertTriangle className="w-3 h-3" />
                          {alerta}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-center">
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score</div>
                      <div className={`text-3xl font-bold ${
                        vendedor.score <= 30 ? 'text-red-500' : vendedor.score <= 60 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {vendedor.score}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>/100</div>
                    </div>

                    {vendedor.status !== 'bloqueado' && (
                      <div className="flex gap-2 mt-2">
                        <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${
                          darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}>
                          <Eye className="w-4 h-4" />
                          Investigar
                        </button>
                        <button
                          onClick={() => bloquearVendedor(vendedor.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                        >
                          <Ban className="w-4 h-4" />
                          Bloquear
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
