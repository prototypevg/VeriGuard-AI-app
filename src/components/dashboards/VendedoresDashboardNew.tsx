import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, ShoppingBag, CheckCircle, AlertTriangle, Plus, History, FileText, HelpCircle, Link, Award, Play, Eye, Brain, Server, Menu, X, CreditCard, Copy, UserX, Ban } from 'lucide-react';
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
import logoVeriGuard from '../../assets/logo.png';

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
  { id: 'EP-001', produto: 'Curso Marketing Digital', data: '2025-12-08', status: 'validado', hash: '0x7a8f...3c21' },
  { id: 'EP-002', produto: 'eBook Growth Hacking', data: '2025-12-07', status: 'validado', hash: '0x9b2e...4d32' },
  { id: 'EP-003', produto: 'Template Design Pro', data: '2025-12-06', status: 'pendente', hash: '0x3c1f...8a54' }
];

const fraudesEvitadas = [
  { tipo: 'Chargeback Fraudulento', quantidade: 23, economia: 'R$ 45.600' },
  { tipo: 'Produto Clonado', quantidade: 8, economia: 'R$ 12.300' },
  { tipo: 'Impostor Detectado', quantidade: 3, economia: 'R$ 8.900' },
  { tipo: 'Account Takeover', quantidade: 5, economia: 'R$ 15.200' }
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
          <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
            <img src={logoVeriGuard} alt="VeriGuard AI" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className={`font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>VeriGuard AI</h2>
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
      </nav>

      {/* Selo de Reputação */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200/10">
        <div className={`mb-4 p-4 rounded-xl border ${
          darkMode ? 'bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-700' : 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-sm font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-900'}`}>
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
                <h1 className={`font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Dashboard</h1>
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
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <button
              onClick={() => setActiveModal('cadastrar')}
              className="bg-gradient-to-r from-[#39843e] to-[#416b44] hover:from-[#416b44] hover:to-[#39843e] text-white p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 shadow-lg"
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm text-center">Cadastrar Produto</span>
            </button>
            <button
              onClick={() => setActiveModal('validar')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 shadow-lg"
            >
              <CheckCircle className="w-6 h-6" />
              <span className="text-sm text-center">Validar Produto (IA)</span>
            </button>
            <button
              onClick={() => setActiveModal('simulacao')}
              className={`p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 border ${
                darkMode 
                  ? 'bg-red-900/20 border-red-700 text-red-400 hover:bg-red-900/30' 
                  : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
              }`}
            >
              <Play className="w-6 h-6" />
              <span className="text-sm text-center">Teste de Segurança</span>
            </button>
            <button
              onClick={() => setActiveModal('auditoria')}
              className={`p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 border ${
                darkMode 
                  ? 'bg-purple-900/20 border-purple-700 text-purple-400 hover:bg-purple-900/30' 
                  : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
              }`}
            >
              <Eye className="w-6 h-6" />
              <span className="text-sm text-center">Modo Auditoria</span>
            </button>
            <button
              onClick={() => setActiveModal('seguranca')}
              className={`p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 border ${
                darkMode 
                  ? 'bg-blue-900/20 border-blue-700 text-blue-400 hover:bg-blue-900/30' 
                  : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Shield className="w-6 h-6" />
              <span className="text-sm text-center">Proteção de Conta</span>
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 lg:p-6 border`}
            >
              <div className="flex items-center justify-between mb-2">
                <ShoppingBag className="w-8 h-8 text-[#39843e]" />
                <span className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>236</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Produtos Autenticados</h3>
              <div className="mt-2 text-xs text-green-600">+28% este mês</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 lg:p-6 border`}
            >
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-[#39843e]" />
                <span className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>1,847</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Transações Validadas</h3>
              <div className="mt-2 text-xs text-green-600">+42% este mês</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 lg:p-6 border`}
            >
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="w-8 h-8 text-red-500" />
                <span className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>12</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Chargebacks Evitados</h3>
              <div className="mt-2 text-xs text-green-600">-45% vs. anterior</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 lg:p-6 border`}
            >
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-8 h-8 text-orange-500" />
                <span className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>39</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fraudes Bloqueadas</h3>
              <div className="mt-2 text-xs text-green-600">IA VeriGuard ativa</div>
            </motion.div>
          </div>

          {/* Fraudes Evitadas pela IA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border mb-8`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#39843e]" />
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Fraudes Evitadas pela VeriGuard AI</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {fraudesEvitadas.map((fraude, index) => (
                <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {fraude.tipo === 'Chargeback Fraudulento' && <CreditCard className="w-4 h-4 text-red-500" />}
                    {fraude.tipo === 'Produto Clonado' && <Copy className="w-4 h-4 text-orange-500" />}
                    {fraude.tipo === 'Impostor Detectado' && <UserX className="w-4 h-4 text-purple-500" />}
                    {fraude.tipo === 'Account Takeover' && <Ban className="w-4 h-4 text-red-600" />}
                    <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{fraude.tipo}</span>
                  </div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>{fraude.quantidade}</div>
                  <div className="text-xs text-green-600">Economia: {fraude.economia}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}
            >
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#416b44]'} mb-4`}>Produtos Autenticados por Semana</h3>
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
                  <Bar dataKey="produtos" fill="#39843e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}
            >
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#416b44]'} mb-4`}>Evolução da Confiança Digital</h3>
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
                  <Line type="monotone" dataKey="confianca" stroke="#39843e" strokeWidth={2} dot={{ fill: '#39843e' }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Evidence Packs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border mb-8`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Evidence Packs - Provas Digitais Imutáveis</h3>
              <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}>
                Blockchain Verified
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID</th>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Produto</th>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Data</th>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hash</th>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
                    <th className={`text-right py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {evidencePacks.map(pack => (
                    <tr key={pack.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}>
                      <td className={`py-3 px-4 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pack.id}</td>
                      <td className={`py-3 px-4 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pack.produto}</td>
                      <td className={`py-3 px-4 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pack.data}</td>
                      <td className={`py-3 px-4 text-sm font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{pack.hash}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                          pack.status === 'validado' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {pack.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-[#39843e] hover:underline text-sm mr-3">
                          Exportar PDF
                        </button>
                        <button className="text-blue-600 hover:underline text-sm">
                          Compartilhar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={`mt-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              * Evidence Packs são provas jurídicas com timestamp e hash imutável, válidos para disputas e processos.
            </p>
          </motion.div>

          {/* Benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`${darkMode ? 'bg-[#39843e]/20 border-[#39843e]/30' : 'bg-[#39843e]/10 border-[#39843e]/20'} border rounded-lg p-4 text-center`}>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>✓ Reduza chargebacks em até 85%</p>
            </div>
            <div className={`${darkMode ? 'bg-[#39843e]/20 border-[#39843e]/30' : 'bg-[#39843e]/10 border-[#39843e]/20'} border rounded-lg p-4 text-center`}>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>✓ Provas digitais jurídicas</p>
            </div>
            <div className={`${darkMode ? 'bg-[#39843e]/20 border-[#39843e]/30' : 'bg-[#39843e]/10 border-[#39843e]/20'} border rounded-lg p-4 text-center`}>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>✓ IA Adaptativa Anti-Clone</p>
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
