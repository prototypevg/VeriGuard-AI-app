import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, AlertTriangle, CheckCircle, FileText, BarChart3, Settings, HelpCircle, LogOut, Menu, X, Search, List, Trophy, Swords, GraduationCap, Eye, TrendingUp, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import AnalisarTransacaoModal from '../modals/AnalisarTransacaoModal';
import HistoricoAlertasModal from '../modals/HistoricoAlertasModal';
import RelatoriosModal from '../modals/RelatoriosModal';
import IntegracoesModal from '../modals/IntegracoesModal';
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
  { name: 'Lavagem', value: 35, color: '#dc2626' },
  { name: 'Cartão Clonado', value: 45, color: '#ea580c' },
  { name: 'Invasão', value: 20, color: '#f59e0b' }
];

const alertas = [
  { id: 'TX-8821', transacao: 'Transferência PIX', valor: 'R$ 45.000', status: 'fraude confirmada' },
  { id: 'TX-8820', transacao: 'Compra internacional', valor: 'R$ 12.300', status: 'liberada' },
  { id: 'TX-8819', transacao: 'Saque ATM', valor: 'R$ 3.000', status: 'em análise' }
];

export default function BancosDashboard({ userEmail, onLogout, darkMode, onToggleDarkMode }: BancosDashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const menuItems = [
    { id: 'analisar', label: 'Analisar transação', icon: Search, action: () => setActiveModal('analisar') },
    { id: 'historico', label: 'Histórico de Alertas', icon: List, action: () => setActiveModal('historico') },
    { id: 'simulacao', label: 'Simulação de Ataques', icon: Swords, action: () => setActiveModal('simulacao') },
    { id: 'auditoria', label: 'Modo Auditoria', icon: Eye, action: () => setActiveModal('auditoria') },
    { id: 'sla', label: 'SLA & Performance', icon: TrendingUp, action: () => setActiveModal('sla') },
    { id: 'relatorios', label: 'Relatórios', icon: FileText, action: () => setActiveModal('relatorios') },
    { id: 'integracoes', label: 'Integrações', icon: Settings, action: () => setActiveModal('integracoes') },
    { id: 'ajuda', label: 'Suporte', icon: HelpCircle, action: () => setActiveModal('help') }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={`p-6 border-b flex-shrink-0 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#39843e] to-[#416b44] rounded-lg flex items-center justify-center p-2 overflow-hidden">
            <img src={logoVeriGuard} alt="VeriGuard AI" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className={darkMode ? 'text-white' : 'text-[#416b44]'}>VeriGuard AI</h2>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Bancos, Fintechs & Gateways
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

        {/* Separator for mobile readability if needed */}
        <div className="h-4 lg:hidden"></div>
      </nav>

      <div className="flex-shrink-0 p-4 border-t border-gray-200/10">
        {/* Profile/Compliance Card */}
        <div className={`p-4 rounded-xl border ${
          darkMode ? 'bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
                Compliance Nível A
              </div>
              <div className={`text-xs ${darkMode ? 'text-blue-500' : 'text-blue-700'}`}>
                Score: 98.5%
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('gamificacao')}
            className={`text-xs ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-700 hover:text-blue-800'}`}
          >
            Ver detalhes →
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
                <h1 className={darkMode ? 'text-white' : 'text-[#416b44]'}>Dashboard</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Confiança Digital para suas transações financeiras</p>
              </div>
            </div>
            <div className="text-right">
              <ProfileDropdown 
                userEmail={userEmail} 
                onLogout={onLogout}
                darkMode={darkMode}
                onToggleDarkMode={onToggleDarkMode}
                onOpenSettings={() => setActiveModal('configuracoes')}
              />
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Cards principais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <CreditCard className="w-10 h-10 text-[#39843e]" />
                <span className={`text-3xl ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>18.742</span>
              </div>
              <h3 className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Transações Monitoradas</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-10 h-10 text-red-500" />
                <span className={`text-3xl ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>46</span>
              </div>
              <h3 className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Alertas de Fraude Detectados</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-10 h-10 text-[#39843e]" />
                <span className={`text-3xl ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>2.384</span>
              </div>
              <h3 className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Contas Protegidas</h3>
            </motion.div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Fraudes Detectadas por Semana</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dadosBarrasFraudes}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="semana" stroke={darkMode ? "#9ca3af" : "#4b5563"} />
                  <YAxis stroke={darkMode ? "#9ca3af" : "#4b5563"} />
                  <Tooltip contentStyle={darkMode ? { backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` } : undefined} />
                  <Bar dataKey="fraudes" fill="#dc2626" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Evolução do Índice de Risco</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dadosLinhaRisco}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="semana" stroke={darkMode ? "#9ca3af" : "#4b5563"} />
                  <YAxis stroke={darkMode ? "#9ca3af" : "#4b5563"} />
                  <Tooltip contentStyle={darkMode ? { backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` } : undefined} />
                  <Line type="monotone" dataKey="risco" stroke="#dc2626" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Tipos de Fraude</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={dadosPizzaFraudes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dadosPizzaFraudes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={darkMode ? { backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` } : undefined} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Alertas recentes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`rounded-xl p-6 border mb-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Alertas Recentes</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID</th>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Transação</th>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Valor</th>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
                    <th className={`text-right py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alertas.map(alerta => (
                    <tr key={alerta.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{alerta.id}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{alerta.transacao}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{alerta.valor}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                          alerta.status === 'fraude confirmada' 
                            ? 'bg-red-100 text-red-700' 
                            : alerta.status === 'liberada'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {alerta.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-[#39843e] hover:underline text-sm mr-3">
                          Exportar
                        </button>
                        <button className="text-[#39843e] hover:underline text-sm">
                          Compartilhar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Rodapé com benefícios */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#39843e]/10 border border-[#39843e]/20 rounded-lg p-4 text-center">
              <p className={darkMode ? 'text-[#416b44] font-medium' : 'text-[#416b44]'}>✓ Reduza perdas financeiras</p>
            </div>
            <div className="bg-[#39843e]/10 border border-[#39843e]/20 rounded-lg p-4 text-center">
              <p className={darkMode ? 'text-[#416b44] font-medium' : 'text-[#416b44]'}>✓ Comprove conformidade regulatória</p>
            </div>
            <div className="bg-[#39843e]/10 border border-[#39843e]/20 rounded-lg p-4 text-center">
              <p className={darkMode ? 'text-[#416b44] font-medium' : 'text-[#416b44]'}>✓ Acelere investigações</p>
            </div>
          </div>
        </main>
      </div>

      {/* Modais */}
      {activeModal === 'analisar' && (
        <AnalisarTransacaoModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'historico' && (
        <HistoricoAlertasModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'relatorios' && (
        <RelatoriosModal onClose={() => setActiveModal(null)} perfil="bancos" />
      )}
      {activeModal === 'integracoes' && (
        <IntegracoesModal onClose={() => setActiveModal(null)} perfil="bancos" />
      )}
      {activeModal === 'help' && (
        <HelpModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'configuracoes' && (
        <ConfiguracoesModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'gamificacao' && (
        <GamificacaoModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'simulacao' && (
        <SimulacaoAtaqueModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'auditoria' && (
        <ModoAuditoriaModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'sla' && (
        <SLAPerformanceModal onClose={() => setActiveModal(null)} />
      )}
      
    </div>
  );
}