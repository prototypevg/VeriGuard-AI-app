import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Users, AlertTriangle, Network, Ban, Eye, Fingerprint, Smartphone, Globe, MapPin } from 'lucide-react';

interface MultiContasModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const clustersDetectados = [
  { 
    id: 'CLT-001', 
    contaPrincipal: 'usuario_original',
    contasVinculadas: ['user_fake1', 'user_fake2', 'comprador123'],
    totalContas: 4,
    indicadores: ['Mesmo IP', 'Device fingerprint', 'Email similar'],
    risco: 98,
    status: 'confirmado',
    fraudes: 12,
    valor: 'R$ 45.600'
  },
  { 
    id: 'CLT-002', 
    contaPrincipal: 'vendedor_top',
    contasVinculadas: ['avaliador1', 'avaliador2'],
    totalContas: 3,
    indicadores: ['Reviews cruzados', 'Mesmo telefone'],
    risco: 85,
    status: 'investigando',
    fraudes: 0,
    valor: 'R$ 0'
  },
  { 
    id: 'CLT-003', 
    contaPrincipal: 'loja_oficial',
    contasVinculadas: ['cliente_feliz', 'comprei_amei', 'melhor_loja'],
    totalContas: 4,
    indicadores: ['Padrão de comportamento', 'Horários coincidentes'],
    risco: 72,
    status: 'suspeito',
    fraudes: 0,
    valor: 'R$ 0'
  },
];

export default function MultiContasModal({ onClose, darkMode = false }: MultiContasModalProps) {
  const [clusters, setClusters] = useState(clustersDetectados);

  const banirCluster = (id: string) => {
    setClusters(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'banido' } : c
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
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Network className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Detecção de Multi-Contas</h2>
                <p className="text-cyan-200 text-sm">Identifique usuários com múltiplas contas fraudulentas</p>
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
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {clusters.length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Clusters Detectados</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
              <div className="text-2xl font-bold text-red-500">
                {clusters.reduce((acc, c) => acc + c.totalContas, 0)}
              </div>
              <div className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Contas Vinculadas</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
              <div className="text-2xl font-bold text-orange-500">
                {clusters.reduce((acc, c) => acc + c.fraudes, 0)}
              </div>
              <div className={`text-xs ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>Fraudes Detectadas</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
              <div className="text-2xl font-bold text-purple-500">
                R$ 45.6K
              </div>
              <div className={`text-xs ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>Prejuízo Evitado</div>
            </div>
          </div>

          {/* Lista de Clusters */}
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Clusters de Multi-Contas
          </h3>

          <div className="space-y-4">
            {clusters.map(cluster => (
              <motion.div
                key={cluster.id}
                layout
                className={`p-4 rounded-xl border ${
                  cluster.status === 'confirmado' || cluster.status === 'banido'
                    ? darkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
                    : cluster.status === 'investigando'
                    ? darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
                    : darkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`font-mono text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{cluster.id}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        cluster.status === 'confirmado' ? 'bg-red-600 text-white' :
                        cluster.status === 'banido' ? 'bg-gray-600 text-white' :
                        cluster.status === 'investigando' ? 'bg-yellow-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        {cluster.status}
                      </span>
                    </div>

                    {/* Visualização do Cluster */}
                    <div className={`p-3 rounded-lg mb-3 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-red-900/30' : 'bg-red-100'}`}>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Principal</div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>@{cluster.contaPrincipal}</div>
                        </div>
                        <div className={`text-2xl ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>→</div>
                        {cluster.contasVinculadas.map((conta, i) => (
                          <div key={i} className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>@{conta}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Indicadores */}
                    <div className="flex flex-wrap gap-2">
                      {cluster.indicadores.map((ind, i) => (
                        <span key={i} className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                          darkMode ? 'bg-cyan-900/30 text-cyan-300' : 'bg-cyan-100 text-cyan-700'
                        }`}>
                          {ind.includes('IP') && <Globe className="w-3 h-3" />}
                          {ind.includes('fingerprint') && <Fingerprint className="w-3 h-3" />}
                          {ind.includes('telefone') && <Smartphone className="w-3 h-3" />}
                          {!ind.includes('IP') && !ind.includes('fingerprint') && !ind.includes('telefone') && <AlertTriangle className="w-3 h-3" />}
                          {ind}
                        </span>
                      ))}
                    </div>

                    {cluster.fraudes > 0 && (
                      <div className={`mt-3 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                        ⚠️ {cluster.fraudes} fraudes confirmadas • Prejuízo: {cluster.valor}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-center">
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Risco</div>
                      <div className={`text-2xl font-bold ${
                        cluster.risco >= 80 ? 'text-red-500' : cluster.risco >= 60 ? 'text-yellow-500' : 'text-blue-500'
                      }`}>
                        {cluster.risco}%
                      </div>
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {cluster.totalContas} contas
                    </div>

                    {cluster.status !== 'banido' && (
                      <div className="flex gap-2 mt-2">
                        <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${
                          darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}>
                          <Eye className="w-4 h-4" />
                          Detalhes
                        </button>
                        <button
                          onClick={() => banirCluster(cluster.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                        >
                          <Ban className="w-4 h-4" />
                          Banir Todas
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
