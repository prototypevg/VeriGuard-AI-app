import { motion } from 'motion/react';
import { X, Brain, TrendingDown, Target, Zap, Activity, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TreinamentoIAModalProps {
  onClose: () => void;
  darkMode: boolean;
}

const dadosFalsosPositivos = [
  { mes: 'Jan', taxa: 8.5 },
  { mes: 'Fev', taxa: 7.2 },
  { mes: 'Mar', taxa: 6.1 },
  { mes: 'Abr', taxa: 4.8 },
  { mes: 'Mai', taxa: 3.9 },
  { mes: 'Jun', taxa: 3.2 },
];

const dadosScore = [
  { mes: 'Jan', score: 82 },
  { mes: 'Fev', score: 85 },
  { mes: 'Mar', score: 88 },
  { mes: 'Abr', score: 91 },
  { mes: 'Mai', score: 93 },
  { mes: 'Jun', score: 96 },
];

const dadosTreinamento = [
  { tipo: 'Transações', quantidade: 184250 },
  { tipo: 'Fraudes', quantidade: 2841 },
  { tipo: 'Validações', quantidade: 45892 },
  { tipo: 'Revisões', quantidade: 8924 },
];

export default function TreinamentoIAModal({ onClose, darkMode }: TreinamentoIAModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8" />
            <div>
              <h2>Área de Treinamento da IA</h2>
              <p className="text-white/80 text-sm">Evolução e aprendizado contínuo do sistema</p>
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
          {/* Status do Modelo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Versão do Modelo
                </span>
              </div>
              <div className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                v4.8.2
              </div>
              <div className="text-xs text-purple-600 mt-1">
                Produção
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Precisão
                </span>
              </div>
              <div className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                96.8%
              </div>
              <div className="text-xs text-green-600 mt-1">
                +2.3% este mês
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tempo de Resposta
                </span>
              </div>
              <div className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                &lt;180ms
              </div>
              <div className="text-xs text-blue-600 mt-1">
                Latência média
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-yellow-600" />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Falsos Positivos
                </span>
              </div>
              <div className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                3.2%
              </div>
              <div className="text-xs text-yellow-600 mt-1">
                -62% vs. inicial
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <h3 className={`mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <TrendingDown className="w-5 h-5 text-yellow-600" />
                Redução de Falsos Positivos
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dadosFalsosPositivos}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="mes" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="taxa" stroke="#eab308" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className={`p-6 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <h3 className={`mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Activity className="w-5 h-5 text-green-600" />
                Evolução do Score de Precisão
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dadosScore}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="mes" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dados de Treinamento */}
          <div className={`p-6 rounded-xl border ${
            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <h3 className={`mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Dados Utilizados no Treinamento
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dadosTreinamento}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="tipo" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="quantidade" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Modos de Aprendizado */}
          <div>
            <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Modos de Aprendizado Ativos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  titulo: 'Autoaprendizado Contínuo',
                  descricao: 'Adaptação em tempo real a novos padrões',
                  status: 'Ativo',
                  cor: 'green'
                },
                {
                  titulo: 'Aprendizado Supervisionado',
                  descricao: 'Treino com datasets rotulados',
                  status: 'Agendado',
                  cor: 'blue'
                },
                {
                  titulo: 'Aprendizado por Reforço',
                  descricao: 'Otimização de políticas de resposta',
                  status: 'Ativo',
                  cor: 'green'
                }
              ].map((modo, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {modo.titulo}
                  </div>
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {modo.descricao}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                    modo.cor === 'green'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {modo.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Próximos Treinos */}
          <div className={`p-6 rounded-xl border ${
            darkMode ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'
          }`}>
            <h4 className={`mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-900'}`}>
              Próximo Treinamento Agendado
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className={`text-sm mb-1 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                  Data
                </div>
                <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  15/12/2025 02:00
                </div>
              </div>
              <div>
                <div className={`text-sm mb-1 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                  Tipo
                </div>
                <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Supervisionado + Validação
                </div>
              </div>
              <div>
                <div className={`text-sm mb-1 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                  Dataset
                </div>
                <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  245.892 registros
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}