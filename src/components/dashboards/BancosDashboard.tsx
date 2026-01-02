import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, AlertTriangle, CheckCircle, FileText, HelpCircle, Menu, X, Search, List, Swords, Eye, TrendingUp, ShieldCheck, Banknote, AlertOctagon, Landmark, Smartphone, Globe, Users, Lock, Fingerprint, Scale, Activity, Brain, ShieldAlert, UserX, Wallet, Timer, BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnalisarTransacaoModal from '../modals/AnalisarTransacaoModal';
import HistoricoAlertasModal from '../modals/HistoricoAlertasModal';
import RelatoriosModal from '../modals/RelatoriosModal';
import ConfiguracoesModal from '../modals/ConfiguracoesModal';
import GamificacaoModal from '../modals/GamificacaoModal';
import SimulacaoAtaqueModal from '../modals/SimulacaoAtaqueModal';
import ModoAuditoriaModal from '../modals/ModoAuditoriaModal';
import TreinamentoIAModal from '../modals/TreinamentoIAModal';
import SLAPerformanceModal from '../modals/SLAPerformanceModal';
import HelpModal from '../modals/HelpModal';
import ProfileDropdown from '../ProfileDropdown';
import logoVeriGuard from '../../assets/logo.png';

interface BancosDashboardProps {
  userEmail: string;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const dadosBarrasFraudes = [
  { semana: 'Sem 1', fraudes: 18 },
  { semana: 'Sem 2', fraudes: 12 },
  { semana: 'Sem 3', fraudes: 9 },
  { semana: 'Sem 4', fraudes: 7 }
];

const dadosLinhaRisco = [
  { semana: 'Sem 1', risco: 65 },
  { semana: 'Sem 2', risco: 58 },
  { semana: 'Sem 3', risco: 45 },
  { semana: 'Sem 4', risco: 32 }
];

const dadosPizzaFraudes = [
  { name: 'Lavagem (AML)', value: 35, color: '#dc2626' },
  { name: 'Cartão Clonado', value: 25, color: '#ea580c' },
  { name: 'PIX Fraudulento', value: 22, color: '#f59e0b' },
  { name: 'Account Takeover', value: 18, color: '#8b5cf6' }
];

const alertasRecentes = [
  { id: 'TX-8821', tipo: 'PIX', descricao: 'Transferência suspeita - valor atípico', valor: 'R$ 45.000', risco: 'crítico', origem: 'São Paulo', destino: 'Conta Laranja #2341' },
  { id: 'TX-8820', tipo: 'Cartão', descricao: 'Compra internacional - padrão incomum', valor: 'R$ 12.300', risco: 'alto', origem: 'Brasil', destino: 'Rússia' },
  { id: 'TX-8819', tipo: 'TED', descricao: 'Smurfing detectado - múltiplas transferências', valor: 'R$ 9.999', risco: 'médio', origem: 'Conta #4521', destino: 'Múltiplas' },
  { id: 'TX-8818', tipo: 'PIX', descricao: 'Horário atípico + novo dispositivo', valor: 'R$ 3.000', risco: 'médio', origem: 'Mobile', destino: 'Conta Nova' }
];

const fraudesAML = [
  { tipo: 'Lavagem de Dinheiro', quantidade: 12, valor: 'R$ 2.3M', status: 'Reportado ao COAF' },
  { tipo: 'Smurfing', quantidade: 34, valor: 'R$ 890K', status: 'Bloqueado' },
  { tipo: 'Contas Laranja', quantidade: 18, valor: 'R$ 1.1M', status: 'Em investigação' },
  { tipo: 'Layering', quantidade: 8, valor: 'R$ 4.5M', status: 'Reportado' }
];

export default function BancosDashboard({ userEmail, onLogout, darkMode, onToggleDarkMode }: BancosDashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const menuItems = [
    { id: 'simulacao', label: 'Simulação de Ataques', icon: Swords, action: () => setActiveModal('simulacao') },
    { id: 'auditoria', label: 'Modo Auditoria', icon: Eye, action: () => setActiveModal('auditoria') },
    { id: 'sla', label: 'SLA & Performance', icon: TrendingUp, action: () => setActiveModal('sla') },
    { id: 'treinamento', label: 'Treinamento IA', icon: Brain, action: () => setActiveModal('treinamento') },
    { id: 'aml', label: 'Central AML', icon: Landmark, action: () => setActiveModal('gamificacao') },
    { id: 'pix', label: 'Monitor PIX', icon: Smartphone, action: () => setActiveModal('gamificacao') },
    { id: 'cartoes', label: 'Fraude de Cartões', icon: CreditCard, action: () => setActiveModal('gamificacao') },
    { id: 'contas', label: 'Contas Suspeitas', icon: UserX, action: () => setActiveModal('gamificacao') },
    { id: 'kyc', label: 'KYC Bancário', icon: Fingerprint, action: () => setActiveModal('gamificacao') },
    { id: 'ajuda', label: 'Central de Ajuda', icon: HelpCircle, action: () => setActiveModal('help') }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={`p-6 border-b flex-shrink-0 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
            <img src={logoVeriGuard} alt="VeriGuard AI" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className={`font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>VeriGuard AI</h2>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Bancos & Fintechs
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1 min-h-0">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              item.action();
              setMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-700 hover:bg-[#39843e]/10 hover:text-[#39843e]'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Compliance Card */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200/10">
        <div className={`p-4 rounded-xl border ${
          darkMode ? 'bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
                Compliance Nível A
              </div>
              <div className={`text-xs ${darkMode ? 'text-blue-500' : 'text-blue-700'}`}>
                BACEN • COAF • LGPD
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Score Regulatório</span>
            <span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>98.5%</span>
          </div>
          <div className={`w-full h-2 rounded-full mt-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-green-400" style={{ width: '98.5%' }} />
          </div>
          <button
            onClick={() => setActiveModal('gamificacao')}
            className={`text-xs mt-3 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-700 hover:text-blue-800'}`}
          >
            Ver relatório completo →
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-gray-900' : 'bg-[#f7ede1]'}`}>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block w-72 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r fixed h-[100dvh] z-50`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: menuOpen ? 0 : -300 }}
        className={`lg:hidden fixed w-72 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r h-[100dvh] z-50 shadow-2xl`}
      >
        <SidebarContent />
      </motion.aside>

      {/* Overlay mobile */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Conteúdo principal */}
      <div className="flex-1 lg:ml-72 overflow-auto">
        {/* Header */}
        <header className={`border-b p-4 lg:p-6 sticky top-0 z-30 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`lg:hidden p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {menuOpen ? <X className={darkMode ? 'text-white' : ''} /> : <Menu className={darkMode ? 'text-white' : ''} />}
              </button>
              <div>
                <h1 className={`font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Dashboard Financeiro</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monitoramento AML & Antifraude em tempo real</p>
              </div>
            </div>
            <ProfileDropdown 
              userEmail={userEmail} 
              onLogout={onLogout}
              darkMode={darkMode}
              onToggleDarkMode={onToggleDarkMode}
              onOpenSettings={() => setActiveModal('configuracoes')}
            />
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => setActiveModal('analisar')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 shadow-lg"
            >
              <Search className="w-6 h-6" />
              <span className="text-sm text-center">Analisar Transação</span>
            </button>
            <button
              onClick={() => setActiveModal('historico')}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 shadow-lg"
            >
              <AlertTriangle className="w-6 h-6" />
              <span className="text-sm text-center">Histórico de Alertas</span>
            </button>
            <button
              onClick={() => setActiveModal('relatorios')}
              className={`p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 border ${
                darkMode 
                  ? 'bg-purple-900/20 border-purple-700 text-purple-400 hover:bg-purple-900/30' 
                  : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
              }`}
            >
              <FileText className="w-6 h-6" />
              <span className="text-sm text-center">Relatórios BACEN</span>
            </button>
            <button
              onClick={() => setActiveModal('integracoes')}
              className={`p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 border ${
                darkMode 
                  ? 'bg-green-900/20 border-green-700 text-green-400 hover:bg-green-900/30' 
                  : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
              }`}
            >
              <Settings className="w-6 h-6" />
              <span className="text-sm text-center">Integrações API</span>
            </button>
          </div>

          {/* Cards principais */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`rounded-xl p-4 lg:p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <Banknote className="w-8 h-8 text-[#39843e]" />
                <span className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>18.7K</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Transações Monitoradas</h3>
              <div className="mt-2 text-xs text-green-600">Últimas 24h</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-xl p-4 lg:p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <AlertOctagon className="w-8 h-8 text-red-500" />
                <span className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>46</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Alertas de Fraude</h3>
              <div className="mt-2 text-xs text-red-500">12 críticos</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-xl p-4 lg:p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <Landmark className="w-8 h-8 text-purple-500" />
                <span className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>R$ 8.8M</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>AML Bloqueado</h3>
              <div className="mt-2 text-xs text-green-600">Lavagem evitada</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-xl p-4 lg:p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <ShieldCheck className="w-8 h-8 text-[#39843e]" />
                <span className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>2,384</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Contas Protegidas</h3>
              <div className="mt-2 text-xs text-green-600">IA VeriGuard ativa</div>
            </motion.div>
          </div>

          {/* AML - Anti Money Laundering */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border mb-8`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Landmark className="w-5 h-5 text-purple-500" />
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>AML - Anti-Lavagem de Dinheiro</h3>
              <span className={`ml-auto text-xs px-2 py-1 rounded ${darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                COAF Compliance
              </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {fraudesAML.map((fraude, index) => (
                <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{fraude.tipo}</div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>{fraude.quantidade}</div>
                  <div className={`text-sm font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{fraude.valor}</div>
                  <div className={`text-xs mt-1 ${fraude.status.includes('Reportado') ? 'text-blue-500' : fraude.status.includes('Bloqueado') ? 'text-green-500' : 'text-yellow-500'}`}>
                    {fraude.status}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Fraudes Bloqueadas</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dadosBarrasFraudes}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="semana" stroke={darkMode ? "#9ca3af" : "#4b5563"} />
                  <YAxis stroke={darkMode ? "#9ca3af" : "#4b5563"} />
                  <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, borderRadius: '8px' }} />
                  <Bar dataKey="fraudes" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Índice de Risco</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dadosLinhaRisco}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="semana" stroke={darkMode ? "#9ca3af" : "#4b5563"} />
                  <YAxis stroke={darkMode ? "#9ca3af" : "#4b5563"} />
                  <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="risco" stroke="#39843e" strokeWidth={2} dot={{ fill: '#39843e' }} />
                </LineChart>
              </ResponsiveContainer>
              <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>↓ Risco reduzido com VeriGuard AI</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Tipos de Fraude</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={dadosPizzaFraudes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {dadosPizzaFraudes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-2">
                {dadosPizzaFraudes.map((item, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{item.name}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Alertas em tempo real */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className={`rounded-xl p-6 border mb-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Alertas em Tempo Real</h3>
              </div>
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Atualizado há 2 min</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID</th>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tipo</th>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Descrição</th>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Valor</th>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Risco</th>
                    <th className={`text-right py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alertasRecentes.map(alerta => (
                    <tr key={alerta.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}>
                      <td className={`py-3 px-4 text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{alerta.id}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                          alerta.tipo === 'PIX' ? 'bg-green-100 text-green-700' : 
                          alerta.tipo === 'Cartão' ? 'bg-blue-100 text-blue-700' : 
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {alerta.tipo === 'PIX' && <Smartphone className="w-3 h-3" />}
                          {alerta.tipo === 'Cartão' && <CreditCard className="w-3 h-3" />}
                          {alerta.tipo === 'TED' && <Banknote className="w-3 h-3" />}
                          {alerta.tipo}
                        </span>
                      </td>
                      <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{alerta.descricao}</td>
                      <td className={`py-3 px-4 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{alerta.valor}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          alerta.risco === 'crítico' ? 'bg-red-100 text-red-700' : 
                          alerta.risco === 'alto' ? 'bg-orange-100 text-orange-700' : 
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {alerta.risco}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-blue-600 hover:underline text-sm mr-3">Investigar</button>
                        <button className="text-[#39843e] hover:underline text-sm">Exportar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`${darkMode ? 'bg-[#39843e]/20 border-[#39843e]/30' : 'bg-[#39843e]/10 border-[#39843e]/20'} border rounded-lg p-4 text-center`}>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>✓ Compliance BACEN & COAF</p>
            </div>
            <div className={`${darkMode ? 'bg-[#39843e]/20 border-[#39843e]/30' : 'bg-[#39843e]/10 border-[#39843e]/20'} border rounded-lg p-4 text-center`}>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>✓ Detecção AML em tempo real</p>
            </div>
            <div className={`${darkMode ? 'bg-[#39843e]/20 border-[#39843e]/30' : 'bg-[#39843e]/10 border-[#39843e]/20'} border rounded-lg p-4 text-center`}>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>✓ Relatórios regulatórios automáticos</p>
            </div>
          </div>
        </main>
      </div>

      {/* Modais */}
      {activeModal === 'analisar' && <AnalisarTransacaoModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'historico' && <HistoricoAlertasModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'relatorios' && <RelatoriosModal onClose={() => setActiveModal(null)} perfil="bancos" />}
      {activeModal === 'integracoes' && <IntegracoesModal onClose={() => setActiveModal(null)} perfil="bancos" />}
      {activeModal === 'help' && <HelpModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'configuracoes' && <ConfiguracoesModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'gamificacao' && <GamificacaoModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'simulacao' && <SimulacaoAtaqueModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'auditoria' && <ModoAuditoriaModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'sla' && <SLAPerformanceModal onClose={() => setActiveModal(null)} />}
    </div>
  );
}
