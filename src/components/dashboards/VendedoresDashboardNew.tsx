import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, ShoppingBag, CheckCircle, AlertTriangle, BarChart3, Plus, History, FileText, Settings, HelpCircle, Link, Award, Play, Eye, Brain, Server, Target, MessageCircle, Menu, X, LogOut } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ProfileDropdown from '../ProfileDropdown';
import ValidarProdutoModal from '../modals/ValidarProdutoModal';
import CadastrarProdutoModal from '../modals/CadastrarProdutoModal';
import HistoricoModal from '../modals/HistoricoModal';
import DefesaTecnicaModal from '../modals/DefesaTecnicaModal';
import RelatoriosModal from '../modals/RelatoriosModal';
import IntegracoesModal from '../modals/IntegracoesModal';
import HelpModal from '../modals/HelpModal';
import ConfiguracoesModal from '../modals/ConfiguracoesModal';
import GamificacaoModal from '../modals/GamificacaoModal';
import SimulacaoAtaqueModal from '../modals/SimulacaoAtaqueModal';
import ModoAuditoriaModal from '../modals/ModoAuditoriaModal';
import TreinamentoIAModal from '../modals/TreinamentoIAModal';
import CentralSegurancaModal from '../modals/CentralSegurancaModal';
import SLAPerformanceModal from '../modals/SLAPerformanceModal';
import logoVeriGuard from 'figma:asset/387a34705e6205bda5fa823ffc7932e787e39b67.png';

interface VendedoresDashboardProps {
  userEmail: string;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const dadosBarras = [
  { semana: 'Sem 1', produtos: 45 },
  { semana: 'Sem 2', produtos: 52 },
  { semana: 'Sem 3', produtos: 68 },
  { semana: 'Sem 4', produtos: 71 }
];

const dadosLinha = [
  { semana: 'Sem 1', confianca: 75 },
  { semana: 'Sem 2', confianca: 82 },
  { semana: 'Sem 3', confianca: 88 },
  { semana: 'Sem 4', confianca: 94 }
];

const evidencePacks = [
  { id: 'EP-001', produto: 'Curso Marketing Digital', data: '2025-12-08', status: 'validado' },
  { id: 'EP-002', produto: 'eBook Growth Hacking', data: '2025-12-07', status: 'validado' },
  { id: 'EP-003', produto: 'Template Design', data: '2025-12-06', status: 'pendente' }
];

export default function VendedoresDashboard({ userEmail, onLogout, darkMode, onToggleDarkMode }: VendedoresDashboardProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { id: 'autenticar', label: 'Cadastrar Produto', icon: Plus, action: () => setActiveModal('cadastrar') },
    { id: 'historico', label: 'Histórico', icon: History, action: () => setActiveModal('historico') },
    { id: 'defesa', label: 'Defesa Técnica', icon: FileText, action: () => setActiveModal('defesa') },
    { id: 'relatorios', label: 'Relatórios', icon: FileText, action: () => setActiveModal('relatorios') },
    { id: 'integracoes', label: 'Integrações', icon: Link, action: () => setActiveModal('integracoes') },
    { id: 'simulacao', label: 'Teste de Segurança', icon: Play, action: () => setActiveModal('simulacao') },
    { id: 'auditoria', label: 'Modo Auditoria', icon: Eye, action: () => setActiveModal('auditoria') },
    { id: 'treinamento', label: 'Treinamento IA', icon: Brain, action: () => setActiveModal('treinamento') },
    { id: 'sla', label: 'SLA & Performance', icon: Server, action: () => setActiveModal('sla') },
    { id: 'ajuda', label: 'Central de Ajuda', icon: HelpCircle, action: () => setActiveModal('help') }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`p-6 border-b flex-shrink-0 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#39843e] to-[#416b44] rounded-lg flex items-center justify-center p-2 overflow-hidden">
            <img src={logoVeriGuard} alt="VeriGuard AI" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className={darkMode ? 'text-white' : 'text-[#416b44]'}>VeriGuard AI</h2>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Vendedores Digitais
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
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

      {/* Selo de Reputação & Logout */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200/10">
        <div className={`mb-4 p-4 rounded-xl border ${
          darkMode ? 'bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-700' : 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-900'}`}>
                Selo Ouro
              </div>
              <div className={`text-xs ${darkMode ? 'text-yellow-500' : 'text-yellow-700'}`}>
                Score: 94/100
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('gamificacao')}
            className={`text-xs ${darkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-700 hover:text-yellow-800'}`}
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

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 overflow-auto">
        {/* Header */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-4 lg:p-6 sticky top-0 z-30`}>
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
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Confiança Digital para suas vendas
                </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => setActiveModal('cadastrar')}
              className="bg-gradient-to-r from-[#39843e] to-[#416b44] hover:from-[#416b44] hover:to-[#39843e] text-white p-6 rounded-xl transition-all flex items-center gap-3 shadow-lg"
            >
              <Plus className="w-6 h-6" />
              <span>Cadastrar Produto</span>
            </button>
            <button
              onClick={() => setActiveModal('validar')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white p-6 rounded-xl transition-all flex items-center gap-3 shadow-lg"
            >
              <CheckCircle className="w-6 h-6" />
              <span>Validar Produto (IA)</span>
            </button>
            <button
              onClick={() => setActiveModal('simulacao')}
              className={`p-6 rounded-xl transition-all flex items-center gap-3 border ${
                darkMode 
                  ? 'bg-red-900/20 border-red-700 text-red-400 hover:bg-red-900/30' 
                  : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
              }`}
            >
              <Play className="w-6 h-6" />
              <span>Teste de Segurança</span>
            </button>
            <button
              onClick={() => setActiveModal('auditoria')}
              className={`p-6 rounded-xl transition-all flex items-center gap-3 border ${
                darkMode 
                  ? 'bg-purple-900/20 border-purple-700 text-purple-400 hover:bg-purple-900/30' 
                  : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
              }`}
            >
              <Eye className="w-6 h-6" />
              <span>Modo Auditoria</span>
            </button>
            <button
              onClick={() => setActiveModal('seguranca')}
              className={`p-6 rounded-xl transition-all flex items-center gap-3 border ${
                darkMode 
                  ? 'bg-blue-900/20 border-blue-700 text-blue-400 hover:bg-blue-900/30' 
                  : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Shield className="w-6 h-6" />
              <span>Proteção de Conta</span>
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}
            >
              <div className="flex items-center justify-between mb-4">
                <ShoppingBag className="w-10 h-10 text-[#39843e]" />
                <span className={`text-3xl ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>236</span>
              </div>
              <h3 className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Produtos Autenticados</h3>
              <div className="mt-2 text-sm text-green-600">+28% este mês</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}
            >
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-10 h-10 text-[#39843e]" />
                <span className={`text-3xl ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>1,847</span>
              </div>
              <h3 className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Transações Validadas</h3>
              <div className="mt-2 text-sm text-green-600">+42% este mês</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}
            >
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-10 h-10 text-[#39843e]" />
                <span className={`text-3xl ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>12</span>
              </div>
              <h3 className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Disputas Evitadas</h3>
              <div className="mt-2 text-sm text-green-600">-45% vs. anterior</div>
            </motion.div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}
            >
              <h3 className={`${darkMode ? 'text-white' : 'text-[#416b44]'} mb-4`}>Produtos Autenticados por Semana</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dadosBarras}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="semana" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      color: darkMode ? '#fff' : '#000'
                    }}
                  />
                  <Bar dataKey="produtos" fill="#39843e" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}
            >
              <h3 className={`${darkMode ? 'text-white' : 'text-[#416b44]'} mb-4`}>Evolução da Confiança</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dadosLinha}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="semana" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      color: darkMode ? '#fff' : '#000'
                    }}
                  />
                  <Line type="monotone" dataKey="confianca" stroke="#39843e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Evidence Packs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border mb-8`}
          >
            <h3 className={`${darkMode ? 'text-white' : 'text-[#416b44]'} mb-4`}>Evidence Packs Recentes</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID</th>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Produto</th>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Data</th>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
                    <th className={`text-right py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {evidencePacks.map(pack => (
                    <tr key={pack.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}>
                      <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pack.id}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pack.produto}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pack.data}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                          pack.status === 'validado' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {pack.status}
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

          {/* Benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`${darkMode ? 'bg-[#39843e]/20 border-[#39843e]/30' : 'bg-[#39843e]/10 border-[#39843e]/20'} border rounded-lg p-4 text-center`}>
              <p className={darkMode ? 'text-white' : 'text-[#416b44]'}>✓ Reduza disputas</p>
            </div>
            <div className={`${darkMode ? 'bg-[#39843e]/20 border-[#39843e]/30' : 'bg-[#39843e]/10 border-[#39843e]/20'} border rounded-lg p-4 text-center`}>
              <p className={darkMode ? 'text-white' : 'text-[#416b44]'}>✓ Aumente confiança</p>
            </div>
            <div className={`${darkMode ? 'bg-[#39843e]/20 border-[#39843e]/30' : 'bg-[#39843e]/10 border-[#39843e]/20'} border rounded-lg p-4 text-center`}>
              <p className={darkMode ? 'text-white' : 'text-[#416b44]'}>✓ Proteja reputação</p>
            </div>
          </div>
        </main>
      </div>

      {/* Modais */}
      {activeModal === 'validar' && <ValidarProdutoModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'cadastrar' && <CadastrarProdutoModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'historico' && <HistoricoModal onClose={() => setActiveModal(null)} perfil="vendedores" />}
      {activeModal === 'defesa' && <DefesaTecnicaModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'relatorios' && <RelatoriosModal onClose={() => setActiveModal(null)} perfil="vendedores" />}
      {activeModal === 'integracoes' && <IntegracoesModal onClose={() => setActiveModal(null)} perfil="vendedores" />}
      {activeModal === 'help' && <HelpModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'configuracoes' && <ConfiguracoesModal onClose={() => setActiveModal(null)} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} userEmail={userEmail} />}
      {activeModal === 'gamificacao' && <GamificacaoModal onClose={() => setActiveModal(null)} darkMode={darkMode} perfil="vendedores" />}
      {activeModal === 'simulacao' && <SimulacaoAtaqueModal onClose={() => setActiveModal(null)} darkMode={darkMode} perfil="vendedores" />}
      {activeModal === 'auditoria' && <ModoAuditoriaModal onClose={() => setActiveModal(null)} darkMode={darkMode} />}
      {activeModal === 'seguranca' && <CentralSegurancaModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'treinamento' && <TreinamentoIAModal onClose={() => setActiveModal(null)} darkMode={darkMode} />}
      {activeModal === 'sla' && <SLAPerformanceModal onClose={() => setActiveModal(null)} darkMode={darkMode} />}
    </div>
  );
}