import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Store, CheckCircle, XCircle, FileText, Settings, HelpCircle, Menu, X, List, Swords, GraduationCap, Eye, TrendingUp, History, Award, UserCheck, ShieldAlert, Users, Ban, AlertOctagon, Fingerprint } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
import logoVeriGuard from '../../assets/logo.png';

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
  { name: 'Sob Análise', value: 8, color: '#f59e0b' },
  { name: 'Bloqueados', value: 5, color: '#dc2626' }
];

const vendedoresRecentes = [
  { id: 'VD-001', nome: 'João Silva Digital', cnpj: '12.345.678/0001-90', status: 'verificado', score: 98 },
  { id: 'VD-002', nome: 'Maria Cursos Online', cnpj: '98.765.432/0001-12', status: 'verificado', score: 95 },
  { id: 'VD-003', nome: 'Tech Solutions BR', cnpj: '45.678.901/0001-34', status: 'pendente', score: 72 },
  { id: 'VD-004', nome: 'Conta Suspeita X', cnpj: '00.000.000/0001-00', status: 'bloqueado', score: 15 }
];

const fraudesDetectadas = [
  { tipo: 'Vendedor Golpista', quantidade: 12, acao: 'Bloqueado' },
  { tipo: 'Documentos Falsos', quantidade: 8, acao: 'KYC Rejeitado' },
  { tipo: 'Lavagem de Dinheiro', quantidade: 3, acao: 'Reportado' },
  { tipo: 'Produtos Clonados', quantidade: 45, acao: 'Removido' },
  { tipo: 'Reviews Falsos', quantidade: 156, acao: 'Deletado' },
  { tipo: 'Multi-Contas', quantidade: 23, acao: 'Banido' }
];

export default function MarketplacesDashboard({ userEmail, onLogout, darkMode, onToggleDarkMode }: MarketplacesDashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const menuItems = [
    { id: 'auditar', label: 'Auditar Seller (KYC)', icon: UserCheck, action: () => setActiveModal('auditar_seller') },
    { id: 'validar', label: 'Validar Produto (IA)', icon: CheckCircle, action: () => setActiveModal('validar') },
    { id: 'bloqueados', label: 'Itens Bloqueados', icon: List, action: () => setActiveModal('bloqueados') },
    { id: 'simulacao', label: 'Simulação de Ataques', icon: Swords, action: () => setActiveModal('simulacao') },
    { id: 'sla', label: 'SLA & Performance', icon: TrendingUp, action: () => setActiveModal('sla') },
    { id: 'auditoria', label: 'Modo Auditoria', icon: Eye, action: () => setActiveModal('auditoria') },
    { id: 'historico', label: 'Histórico', icon: History, action: () => setActiveModal('historico') },
    { id: 'relatorios', label: 'Relatórios', icon: FileText, action: () => setActiveModal('relatorios') },
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
              Marketplaces
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

      <div className="flex-shrink-0 p-4 border-t border-gray-200/10">
        <div className={`mb-4 p-4 rounded-xl border ${
          darkMode ? 'bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-900'}`}>
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
                <h1 className={`font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Dashboard Marketplace</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Confiança Digital para seu ecossistema</p>
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
              onClick={() => setActiveModal('auditar_seller')}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 shadow-lg"
            >
              <UserCheck className="w-6 h-6" />
              <span className="text-sm text-center">Auditar Seller (KYC)</span>
            </button>
            <button
              onClick={() => setActiveModal('validar')}
              className="bg-gradient-to-r from-[#39843e] to-[#416b44] hover:from-[#416b44] hover:to-[#39843e] text-white p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 shadow-lg"
            >
              <CheckCircle className="w-6 h-6" />
              <span className="text-sm text-center">Validar Produto (IA)</span>
            </button>
            <button
              onClick={() => setActiveModal('bloqueados')}
              className={`p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 border ${
                darkMode 
                  ? 'bg-red-900/20 border-red-700 text-red-400 hover:bg-red-900/30' 
                  : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
              }`}
            >
              <Ban className="w-6 h-6" />
              <span className="text-sm text-center">Itens Bloqueados</span>
            </button>
            <button
              onClick={() => setActiveModal('treinamento')}
              className={`p-4 lg:p-6 rounded-xl transition-all flex flex-col items-center gap-2 border ${
                darkMode 
                  ? 'bg-blue-900/20 border-blue-700 text-blue-400 hover:bg-blue-900/30' 
                  : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <GraduationCap className="w-6 h-6" />
              <span className="text-sm text-center">Treinamento IA</span>
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
                <Users className="w-8 h-8 text-[#39843e]" />
                <span className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>487</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sellers Verificados</h3>
              <div className="mt-2 text-xs text-green-600">KYC Aprovado</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-xl p-4 lg:p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <Store className="w-8 h-8 text-[#39843e]" />
                <span className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>3,241</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Produtos Validados</h3>
              <div className="mt-2 text-xs text-green-600">+18% este mês</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-xl p-4 lg:p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <XCircle className="w-8 h-8 text-red-500" />
                <span className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>28</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sellers Bloqueados</h3>
              <div className="mt-2 text-xs text-red-500">Fraude detectada</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-xl p-4 lg:p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <ShieldAlert className="w-8 h-8 text-orange-500" />
                <span className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>247</span>
              </div>
              <h3 className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fraudes Evitadas</h3>
              <div className="mt-2 text-xs text-green-600">IA VeriGuard ativa</div>
            </motion.div>
          </div>

          {/* Fraudes Detectadas pela IA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border mb-8`}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertOctagon className="w-5 h-5 text-red-500" />
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Fraudes Detectadas pela VeriGuard AI</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {fraudesDetectadas.map((fraude, index) => (
                <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{fraude.tipo}</div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>{fraude.quantidade}</div>
                  <div className="text-xs text-red-500">{fraude.acao}</div>
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
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Produtos Validados por Semana</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dadosBarras}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="semana" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, borderRadius: '8px' }} />
                  <Bar dataKey="validados" fill="#39843e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`rounded-xl p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Status dos Sellers</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={dadosPizza}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
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

          {/* Tabela de Sellers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`rounded-xl p-6 border mb-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>Sellers - Validação KYC</h3>
              <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                <Fingerprint className="w-3 h-3 inline mr-1" />
                Know Your Customer
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID</th>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nome/Razão Social</th>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>CNPJ</th>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Score</th>
                    <th className={`text-left py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
                    <th className={`text-right py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {vendedoresRecentes.map(seller => (
                    <tr key={seller.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}>
                      <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{seller.id}</td>
                      <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{seller.nome}</td>
                      <td className={`py-3 px-4 text-sm font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{seller.cnpj}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-16 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div 
                              className={`h-2 rounded-full ${seller.score >= 80 ? 'bg-green-500' : seller.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${seller.score}%` }}
                            />
                          </div>
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{seller.score}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                          seller.status === 'verificado' 
                            ? 'bg-green-100 text-green-700' 
                            : seller.status === 'bloqueado'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {seller.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-[#39843e] hover:underline text-sm mr-3">Detalhes</button>
                        {seller.status !== 'bloqueado' && (
                          <button className="text-red-500 hover:underline text-sm">Bloquear</button>
                        )}
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
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>✓ Filtre vendedores golpistas</p>
            </div>
            <div className={`${darkMode ? 'bg-[#39843e]/20 border-[#39843e]/30' : 'bg-[#39843e]/10 border-[#39843e]/20'} border rounded-lg p-4 text-center`}>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>✓ KYC automatizado por IA</p>
            </div>
            <div className={`${darkMode ? 'bg-[#39843e]/20 border-[#39843e]/30' : 'bg-[#39843e]/10 border-[#39843e]/20'} border rounded-lg p-4 text-center`}>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#416b44]'}`}>✓ Combate à lavagem de dinheiro</p>
            </div>
          </div>
        </main>
      </div>

      {/* Modais */}
      {activeModal === 'auditar_seller' && <AuditarSellerModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'validar' && <ValidarProdutoModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'bloqueados' && <ItensBloqueadosModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'historico' && <HistoricoModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'gamificacao' && <GamificacaoModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'simulacao' && <SimulacaoAtaqueModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'treinamento' && <TreinamentoIAModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'auditoria' && <ModoAuditoriaModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'sla' && <SLAPerformanceModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'relatorios' && <RelatoriosModal onClose={() => setActiveModal(null)} perfil="marketplaces" />}
      {activeModal === 'integracoes' && <IntegracoesModal onClose={() => setActiveModal(null)} perfil="marketplaces" />}
      {activeModal === 'help' && <HelpModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'configuracoes' && <ConfiguracoesModal onClose={() => setActiveModal(null)} />}
    </div>
  );
}
