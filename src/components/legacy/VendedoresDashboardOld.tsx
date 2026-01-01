import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, ShoppingBag, CheckCircle, AlertTriangle, FileText, BarChart3, Settings, HelpCircle, LogOut, Menu, X, Plus, History, FileCheck, List, Trophy, Swords, GraduationCap, Eye, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CadastrarProdutoModal from '../modals/CadastrarProdutoModal';
import ProdutosCadastradosModal from '../modals/ProdutosCadastradosModal';
import HistoricoModal from '../modals/HistoricoModal';
import DefesaTecnicaModal from '../modals/DefesaTecnicaModal';
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
import ChatBot from '../ChatBot';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'produtos', label: 'Produtos Cadastrados', icon: List },
    { id: 'historico', label: 'Histórico', icon: History },
    { id: 'gamificacao', label: 'Gamificação', icon: Trophy },
    { id: 'simulacao', label: 'Simulação de Ataques', icon: Swords },
    { id: 'treinamento', label: 'Treinamento IA', icon: GraduationCap },
    { id: 'auditoria', label: 'Modo Auditoria', icon: Eye },
    { id: 'sla', label: 'SLA & Performance', icon: TrendingUp },
    { id: 'relatorios', label: 'Relatórios', icon: FileText },
    { id: 'integracoes', label: 'Integrações', icon: Settings },
    { id: 'ajuda', label: 'Suporte', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen bg-[#f7ede1] flex">
      {/* Menu lateral */}
      <aside className="hidden lg:block w-64 bg-[#416b44] h-screen p-6 overflow-y-auto fixed left-0 top-0 z-50">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-[#39843e]" />
          <span className="text-white">VeriGuard AI</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'produtos') setActiveModal('produtos');
                if (item.id === 'historico') setActiveModal('historico');
                if (item.id === 'gamificacao') setActiveModal('gamificacao');
                if (item.id === 'simulacao') setActiveModal('simulacao');
                if (item.id === 'treinamento') setActiveModal('treinamento');
                if (item.id === 'auditoria') setActiveModal('auditoria');
                if (item.id === 'sla') setActiveModal('sla');
                if (item.id === 'relatorios') setActiveModal('relatorios');
                if (item.id === 'integracoes') setActiveModal('integracoes');
                if (item.id === 'ajuda') setActiveModal('help');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-[#39843e] rounded-lg transition-all"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-red-500/20 rounded-lg transition-all mt-8"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </aside>

      {/* Menu lateral mobile */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: menuOpen ? 0 : -300 }}
        className="lg:hidden fixed w-64 bg-[#416b44] h-screen p-6 z-50 overflow-y-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-[#39843e]" />
          <span className="text-white">VeriGuard AI</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'produtos') setActiveModal('produtos');
                if (item.id === 'historico') setActiveModal('historico');
                if (item.id === 'gamificacao') setActiveModal('gamificacao');
                if (item.id === 'simulacao') setActiveModal('simulacao');
                if (item.id === 'treinamento') setActiveModal('treinamento');
                if (item.id === 'auditoria') setActiveModal('auditoria');
                if (item.id === 'sla') setActiveModal('sla');
                if (item.id === 'relatorios') setActiveModal('relatorios');
                if (item.id === 'integracoes') setActiveModal('integracoes');
                if (item.id === 'ajuda') setActiveModal('help');
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-[#39843e] rounded-lg transition-all"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-red-500/20 rounded-lg transition-all mt-8"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </motion.aside>

      {/* Overlay mobile */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Conteúdo principal */}
      <div className="flex-1 lg:ml-64 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 lg:p-6 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {menuOpen ? <X /> : <Menu />}
              </button>
              <div>
                <h1 className="text-[#416b44]">Dashboard</h1>
                <p className="text-gray-600 text-sm">Confiança Digital para suas vendas</p>
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
          {/* Cards principais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <ShoppingBag className="w-10 h-10 text-[#39843e]" />
                <span className="text-3xl text-[#416b44]">236</span>
              </div>
              <h3 className="text-gray-600">Produtos Autenticados</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-10 h-10 text-[#39843e]" />
                <span className="text-3xl text-[#416b44]">1,847</span>
              </div>
              <h3 className="text-gray-600">Transações Validadas</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-10 h-10 text-[#39843e]" />
                <span className="text-3xl text-[#416b44]">12</span>
              </div>
              <h3 className="text-gray-600">Disputas Evitadas</h3>
            </motion.div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <h3 className="text-[#416b44] mb-4">Produtos Autenticados por Semana</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dadosBarras}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semana" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="produtos" fill="#39843e" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <h3 className="text-[#416b44] mb-4">Evolução da Confiança</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dadosLinha}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semana" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="confianca" stroke="#39843e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Evidence Packs recentes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-6 border border-gray-200 mb-8"
          >
            <h3 className="text-[#416b44] mb-4">Evidence Packs Recentes</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 text-gray-600">Produto</th>
                    <th className="text-left py-3 px-4 text-gray-600">Data</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {evidencePacks.map(pack => (
                    <tr key={pack.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{pack.id}</td>
                      <td className="py-3 px-4">{pack.produto}</td>
                      <td className="py-3 px-4">{pack.data}</td>
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

          {/* Rodapé com benefícios */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#39843e]/10 border border-[#39843e]/20 rounded-lg p-4 text-center">
              <p className="text-[#416b44]">✓ Reduza disputas</p>
            </div>
            <div className="bg-[#39843e]/10 border border-[#39843e]/20 rounded-lg p-4 text-center">
              <p className="text-[#416b44]">✓ Aumente confiança</p>
            </div>
            <div className="bg-[#39843e]/10 border border-[#39843e]/20 rounded-lg p-4 text-center">
              <p className="text-[#416b44]">✓ Proteja reputação</p>
            </div>
          </div>
        </main>
      </div>

      {/* Modais */}
      {activeModal === 'cadastrar' && (
        <CadastrarProdutoModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'produtos' && (
        <ProdutosCadastradosModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'historico' && (
        <HistoricoModal onClose={() => setActiveModal(null)} perfil="vendedores" />
      )}
      {activeModal === 'defesa' && (
        <DefesaTecnicaModal onClose={() => setActiveModal(null)} />
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
        <RelatoriosModal onClose={() => setActiveModal(null)} perfil="vendedores" />
      )}
      {activeModal === 'integracoes' && (
        <IntegracoesModal onClose={() => setActiveModal(null)} perfil="vendedores" />
      )}
      {activeModal === 'help' && (
        <HelpModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'configuracoes' && (
        <ConfiguracoesModal onClose={() => setActiveModal(null)} />
      )}
      
      {/* ChatBot flutuante */}
      <ChatBot darkMode={darkMode} />
    </div>
  );
}
