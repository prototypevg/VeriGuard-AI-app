import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Users, AlertTriangle, Eye, Globe, TrendingDown, Shield, ExternalLink } from 'lucide-react';

interface MonitorConcorrenteModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const concorrentesSuspeitos = [
  { 
    id: 'CONC-001', 
    nome: 'Curso Fake Marketing',
    plataforma: 'Hotmart',
    preco: 'R$ 47',
    seuPreco: 'R$ 297',
    desconto: '84%',
    vendas: '1.2K',
    risco: 95,
    tipo: 'Clone direto',
    alertas: ['Mesmo conteúdo', 'Preço muito baixo', 'Sem suporte']
  },
  { 
    id: 'CONC-002', 
    nome: 'Marketing Digital Completo',
    plataforma: 'Eduzz',
    preco: 'R$ 67',
    seuPreco: 'R$ 297',
    desconto: '77%',
    vendas: '856',
    risco: 78,
    tipo: 'Conteúdo similar',
    alertas: ['Estrutura copiada', 'Depoimentos falsos']
  },
  { 
    id: 'CONC-003', 
    nome: 'Método Growth Hacker',
    plataforma: 'Monetizze',
    preco: 'R$ 97',
    seuPreco: 'R$ 297',
    desconto: '67%',
    vendas: '423',
    risco: 65,
    tipo: 'Inspiração suspeita',
    alertas: ['Copy similar', 'Imagens parecidas']
  },
];

const alertasRecentes = [
  { tipo: 'Novo clone detectado', tempo: '2 min atrás', urgencia: 'alta' },
  { tipo: 'Preço muito baixo detectado', tempo: '15 min atrás', urgencia: 'media' },
  { tipo: 'Depoimento copiado', tempo: '1h atrás', urgencia: 'baixa' },
];

export default function MonitorConcorrenteModal({ onClose, darkMode = false }: MonitorConcorrenteModalProps) {
  const [monitorando, setMonitorando] = useState(true);

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
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Monitor de Concorrentes</h2>
                <p className="text-violet-200 text-sm">Detecte fraudes e cópias dos seus produtos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${monitorando ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm">{monitorando ? 'Monitorando' : 'Pausado'}</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Alertas Recentes */}
          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className={`font-semibold ${darkMode ? 'text-red-400' : 'text-red-800'}`}>Alertas Recentes</h3>
            </div>
            <div className="space-y-2">
              {alertasRecentes.map((alerta, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      alerta.urgencia === 'alta' ? 'bg-red-500' :
                      alerta.urgencia === 'media' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{alerta.tipo}</span>
                  </div>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{alerta.tempo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>23</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Monitorados</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
              <div className={`text-2xl font-bold text-red-500`}>3</div>
              <div className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Suspeitos</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
              <div className={`text-2xl font-bold text-yellow-500`}>R$ 89K</div>
              <div className={`text-xs ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Prejuízo Est.</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <div className={`text-2xl font-bold text-green-500`}>12</div>
              <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Removidos</div>
            </div>
          </div>

          {/* Lista de Concorrentes Suspeitos */}
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Concorrentes Suspeitos
          </h3>
          
          <div className="space-y-4">
            {concorrentesSuspeitos.map(conc => (
              <motion.div
                key={conc.id}
                className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} shadow-sm`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        conc.risco >= 80 ? 'bg-red-600 text-white' :
                        conc.risco >= 60 ? 'bg-yellow-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        {conc.tipo}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {conc.plataforma}
                      </span>
                    </div>

                    <div className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {conc.nome}
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <div>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Preço dele:</span>
                        <span className={`ml-1 font-bold text-red-500`}>{conc.preco}</span>
                      </div>
                      <div>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Seu preço:</span>
                        <span className={`ml-1 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{conc.seuPreco}</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-500">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-sm font-medium">{conc.desconto} menor</span>
                      </div>
                    </div>

                    {/* Alertas */}
                    <div className="flex flex-wrap gap-2">
                      {conc.alertas.map((alerta, i) => (
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
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Risco</div>
                      <div className={`text-3xl font-bold ${
                        conc.risco >= 80 ? 'text-red-500' : conc.risco >= 60 ? 'text-yellow-500' : 'text-blue-500'
                      }`}>
                        {conc.risco}%
                      </div>
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {conc.vendas} vendas
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 text-sm">
                      <Shield className="w-4 h-4" />
                      Tomar Ação
                    </button>
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
