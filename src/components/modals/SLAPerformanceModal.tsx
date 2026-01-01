import { motion } from 'motion/react';
import { X, Zap, Activity, Server, CheckCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SLAPerformanceModalProps {
  onClose: () => void;
  darkMode: boolean;
}

const dadosUptime = [
  { dia: 'Seg', uptime: 99.99 },
  { dia: 'Ter', uptime: 100 },
  { dia: 'Qua', uptime: 99.98 },
  { dia: 'Qui', uptime: 100 },
  { dia: 'Sex', uptime: 99.99 },
  { dia: 'Sáb', uptime: 100 },
  { dia: 'Dom', uptime: 100 },
];

const dadosTempoResposta = [
  { hora: '00:00', ms: 142 },
  { hora: '04:00', ms: 138 },
  { hora: '08:00', ms: 165 },
  { hora: '12:00', ms: 178 },
  { hora: '16:00', ms: 182 },
  { hora: '20:00', ms: 159 },
  { hora: '24:00', ms: 145 },
];

const dadosFraudesBloqueadas = [
  { hora: '00:00', fraudes: 12 },
  { hora: '04:00', fraudes: 8 },
  { hora: '08:00', fraudes: 24 },
  { hora: '12:00', fraudes: 35 },
  { hora: '16:00', fraudes: 42 },
  { hora: '20:00', fraudes: 28 },
  { hora: '24:00', fraudes: 15 },
];

export default function SLAPerformanceModal({ onClose, darkMode }: SLAPerformanceModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Server className="w-8 h-8" />
            <div>
              <h2>SLA & Performance</h2>
              <p className="text-white/80 text-sm">Monitoramento de disponibilidade e desempenho</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Status Geral */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-6 rounded-xl border ${
              darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Uptime (30 dias)
                </span>
              </div>
              <div className="text-3xl text-green-600 mb-1">
                99.99%
              </div>
              <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                SLA garantido: 99.9%
              </div>
            </div>

            <div className={`p-6 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tempo Médio
                </span>
              </div>
              <div className={`text-3xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                164ms
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Meta: &lt; 200ms
              </div>
            </div>

            <div className={`p-6 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-purple-600" />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Requisições/seg
                </span>
              </div>
              <div className={`text-3xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1,847
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Pico: 3,245
              </div>
            </div>

            <div className={`p-6 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-red-600" />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Fraudes Bloqueadas
                </span>
              </div>
              <div className={`text-3xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                164
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Hoje
              </div>
            </div>
          </div>

          {/* Status Atual */}
          <div className={`p-6 rounded-xl border ${
            darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                  Todos os sistemas operacionais
                </span>
              </div>
              <span className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                Última verificação: agora
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { servico: 'API REST', status: 'Online' },
                { servico: 'IA Antifraude', status: 'Online' },
                { servico: 'Evidence Packs', status: 'Online' },
                { servico: 'Integrações', status: 'Online' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.servico}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <h3 className={`mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <CheckCircle className="w-5 h-5 text-green-600" />
                Uptime Últimos 7 Dias
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={dadosUptime}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="dia" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis domain={[99.9, 100]} stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="uptime" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className={`p-6 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <h3 className={`mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Zap className="w-5 h-5 text-blue-600" />
                Tempo de Resposta (24h)
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dadosTempoResposta}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="hora" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="ms" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fraudes em Tempo Real */}
          <div className={`p-6 rounded-xl border ${
            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <h3 className={`mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Activity className="w-5 h-5 text-red-600" />
              Fraudes Bloqueadas em Tempo Real (24h)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={dadosFraudesBloqueadas}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="hora" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="fraudes" stroke="#dc2626" fill="#dc2626" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* SLA Garantido */}
          <div className={`p-6 rounded-xl border ${
            darkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'
          }`}>
            <h4 className={`mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
              SLA Garantido por Plano
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className={`text-sm mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  Starter
                </div>
                <div className={`text-2xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  99.9%
                </div>
                <div className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  ~43min downtime/mês
                </div>
              </div>
              <div>
                <div className={`text-sm mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  Pro
                </div>
                <div className={`text-2xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  99.95%
                </div>
                <div className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  ~21min downtime/mês
                </div>
              </div>
              <div>
                <div className={`text-sm mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  Enterprise
                </div>
                <div className={`text-2xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  99.99%
                </div>
                <div className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  ~4min downtime/mês
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}