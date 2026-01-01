import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Store, CheckCircle, XCircle, FileText, BarChart3, Settings, HelpCircle, LogOut, Menu, X, Plus, List, Trophy, Swords, GraduationCap, Eye, TrendingUp, History, Award, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import AuditarSellerModal from '../modals/AuditarSellerModal';
import ValidarProdutoModal from '../modals/ValidarProdutoModal';
import ItensBloqueadosModal from '../modals/ItensBloqueadosModal';
import HistoricoModal from '../modals/HistoricoModal';
import RelatoriosModal from '../modals/RelatoriosModal';
import IntegracoesModal from '../modals/IntegracoesModal';
import ConfiguracoesModal from '../modals/ConfiguracoesModal';
import GamificacaoModal from '../modals/GamificacaoModal';
import SimulacaoAtaqueModal from '../modals/SimulacaoAtaqueModal';
import TreinamentoIAModal from '../modals/TreinamentoIAModal';
import ModoAuditoriaModal from '../modals/ModoAuditoriaModal';
import SLAPerformanceModal from '../modals/SLAPerformanceModal';
import HelpModal from '../modals/HelpModal';
import ProfileDropdown from '../ProfileDropdown';
import logoVeriGuard from 'figma:asset/387a34705e6205bda5fa823ffc7932e787e39b67.png';

interface MarketplacesDashboardProps {
  userEmail: string;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const dadosBarras = [
  { semana: 'Sem 1', validados: 125 },
  { semana: 'Sem 2', validados: 142 },
  { semana: 'Sem 3', validados: 158 },
  { semana: 'Sem 4', validados: 167 }
];

const dadosPizza = [
  { name: 'Confiáveis', value: 87, color: '#39843e' },
  { name: 'Bloqueados', value: 13, color: '#dc2626' }
];

const produtos = [
  { id: 'PR-001', produto: 'Curso React Avançado', vendedor: 'João Silva', status: 'validado' },
  { id: 'PR-002', produto: 'Template WordPress', vendedor: 'Maria Santos', status: 'validado' },
  { id: 'PR-003', produto: 'Plugin SEO Pro', vendedor: 'Carlos Souza', status: 'bloqueado' },
  { id: 'PR-004', produto: 'eBook Marketing', vendedor: 'Ana Costa', status: 'pendente' }
];

export default function MarketplacesDashboard({ userEmail, onLogout, darkMode, onToggleDarkMode }: MarketplacesDashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const menuItems = [
    { id: 'validar', label: 'Validar produto', icon: Plus, action: () => setActiveModal('validar') },
    { id: 'lista', label: 'Itens Bloqueados', icon: List, action: () => setActiveModal('bloqueados') },
    { id: 'historico', label: 'Histórico', icon: History, action: () => setActiveModal('historico') },
    { id: 'simulacao', label: 'Simulação de Ataques', icon: Swords, action: () => setActiveModal('simulacao') },
    { id: 'treinamento', label: 'Treinamento IA', icon: GraduationCap, action: () => setActiveModal('treinamento') },
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
              Marketplace
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
        <div className={`mb-4 p-4 rounded-xl border ${
          darkMode ? 'bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-900'}`}>
                Marketplace Verificado
              </div>
              <div className={`text-xs ${darkMode ? 'text-green-500' : 'text-green-700'}`}>
                Trust Score: 96/100
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('gamificacao')}
            className={`text-xs ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-700 hover:text-green-800'}`}
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
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Confiança Digital para seu marketplace</p>
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
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => setActiveModal('auditar_seller')}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white p-6 rounded-xl transition-all flex items-center gap-3 shadow-lg"
            >
              <Building2 className="w-6 h-6" />
              <span>Auditar Seller (KYC)</span>
            </button>
            <button
              onClick={() => setActiveModal('validar')}
              className="bg-gradient-to-r from-[#39843e] to-[#416b44] hover:from-[#416b44] hover:to-[#39843e] text-white p-6 rounded-xl transition-all flex items-center gap-3 shadow-lg"
            >
              <CheckCircle className="w-6 h-6" />
              <span>Validar Produto</span>
            </button>
            <button
              onClick={() => setActiveModal('simulacao')}
              className={`p-6 rounded-xl transition-all flex items-center gap-3 border ${
                darkMode 
                  ? 'bg-red-900/20 border-red-700 text-red-400 hover:bg-red-900/30' 
                  : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
              }`}
            >
              <Swords className="w-6 h-6" />
              <span>Simular Ataque</span>
            </button>
            <button
              onClick={() => setActiveModal('auditoria')}
              className={`p-6 rounded-xl transition-all flex items-center gap-3 border ${
                darkMode 
                  ? 'bg-blue-900/20 border-blue-700 text-blue-400 hover:bg-blue-900/30' 
                  : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Eye className="w-6 h-6" />
              <span>Modo Auditoria</span>
            </button>
          </div>

          {/* Cards principais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-10 h-10 text-[#39843e]" />
                <span className={`text-3xl ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>487</span>
              </div>
              <h3 className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Vendedores Ativos Validados</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <Store className="w-10 h-10 text-[#39843e]" />
                <span className={`text-3xl ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>3,241</span>
              </div>
              <h3 className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Produtos Autenticados</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <XCircle className="w-10 h-10 text-red-500" />
                <span className={`text-3xl ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>28</span>
              </div>
              <h3 className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Itens Bloqueados</h3>
            </motion.div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Produtos Validados por Semana</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dadosBarras}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semana" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="validados" fill="#39843e" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Vendedores Confiáveis vs Bloqueados</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={dadosPizza}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dadosPizza.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Tabela de produtos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`rounded-xl p-6 border mb-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Produtos e Vendedores Recentes</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID</th>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Produto</th>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vendedor</th>
                    <th className={`text-left py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
                    <th className={`text-right py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map(item => (
                    <tr key={item.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.id}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.produto}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.vendedor}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                          item.status === 'validado' 
                            ? 'bg-green-100 text-green-700' 
                            : item.status === 'bloqueado'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-[#39843e] hover:underline text-sm mr-3">
                          Detalhes
                        </button>
                        {item.status !== 'bloqueado' && (
                          <button className="text-red-500 hover:underline text-sm">
                            Bloquear
                          </button>
                        )}
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
              <p className="text-[#416b44]">✓ Proteja reputação</p>
            </div>
            <div className="bg-[#39843e]/10 border border-[#39843e]/20 rounded-lg p-4 text-center">
              <p className="text-[#416b44]">✓ Reduza riscos comerciais</p>
            </div>
            <div className="bg-[#39843e]/10 border border-[#39843e]/20 rounded-lg p-4 text-center">
              <p className="text-[#416b44]">✓ Aumente confiança</p>
            </div>
          </div>
        </main>
      </div>

      {/* Modais */}
      {activeModal === 'auditar_seller' && (
        <AuditarSellerModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'validar' && (
        <ValidarProdutoModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'bloqueados' && (
        <ItensBloqueadosModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'historico' && (
        <HistoricoModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'gamificacao' && (
        <GamificacaoModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'simulacao' && (
        <SimulacaoAtaqueModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'treinamento' && (
        <TreinamentoIAModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'auditoria' && (
        <ModoAuditoriaModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'sla' && (
        <SLAPerformanceModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'relatorios' && (
        <RelatoriosModal onClose={() => setActiveModal(null)} perfil="marketplaces" />
      )}
      {activeModal === 'integracoes' && (
        <IntegracoesModal onClose={() => setActiveModal(null)} perfil="marketplaces" />
      )}
      {activeModal === 'help' && (
        <HelpModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'configuracoes' && (
        <ConfiguracoesModal onClose={() => setActiveModal(null)} />
      )}
      
    </div>
  );
}