import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  LogOut,
  Package,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Clock,
  Download,
  Share2,
  Plus,
  History,
  FileText,
  Settings,
  HelpCircle,
  Link as LinkIcon,
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../DashboardLayout';
import CadastrarProdutoModal from '../modals/CadastrarProdutoModal';
import HistoricoModal from '../modals/HistoricoModal';
import DefesaTecnicaModal from '../modals/DefesaTecnicaModal';
import RelatoriosModal from '../modals/RelatoriosModal';
import IntegracoesModal from '../modals/IntegracoesModal';

interface VendedoresDigitaisProps {
  onLogout: () => void;
}

export default function VendedoresDigitais({ onLogout }: VendedoresDigitaisProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'autenticar', label: 'Autenticar', icon: Plus },
    { id: 'historico', label: 'Histórico', icon: History },
    { id: 'relatorios', label: 'Relatórios', icon: FileText },
    { id: 'integracoes', label: 'Integrações', icon: LinkIcon },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
    { id: 'suporte', label: 'Suporte', icon: HelpCircle },
  ];

  const stats = [
    {
      label: 'Produtos autenticados',
      value: '1,247',
      icon: Package,
      color: 'bg-green-500',
      change: '+12.5%',
    },
    {
      label: 'Transações validadas',
      value: '3,891',
      icon: CheckCircle,
      color: 'bg-blue-500',
      change: '+8.3%',
    },
    {
      label: 'Disputas evitadas',
      value: '156',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      change: '-23.7%',
    },
  ];

  const weeklyData = [
    { name: 'Seg', produtos: 45 },
    { name: 'Ter', produtos: 52 },
    { name: 'Qua', produtos: 48 },
    { name: 'Qui', produtos: 61 },
    { name: 'Sex', produtos: 55 },
    { name: 'Sáb', produtos: 38 },
    { name: 'Dom', produtos: 42 },
  ];

  const confiancaData = [
    { mes: 'Jan', score: 78 },
    { mes: 'Fev', score: 82 },
    { mes: 'Mar', score: 85 },
    { mes: 'Abr', score: 88 },
    { mes: 'Mai', score: 91 },
    { mes: 'Jun', score: 94 },
  ];

  const recentPacks = [
    {
      id: 'EP-2025-001247',
      produto: 'Curso de Marketing Digital',
      data: '08/12/2025 14:32',
      status: 'validado',
    },
    {
      id: 'EP-2025-001246',
      produto: 'E-book de Python Avançado',
      data: '08/12/2025 12:18',
      status: 'validado',
    },
    {
      id: 'EP-2025-001245',
      produto: 'Template de Website',
      data: '07/12/2025 18:45',
      status: 'pendente',
    },
    {
      id: 'EP-2025-001244',
      produto: 'Plugin WordPress Premium',
      data: '07/12/2025 16:22',
      status: 'validado',
    },
  ];

  const actionButtons = [
    {
      id: 'cadastrar',
      label: 'Cadastrar Produto/Transação',
      icon: Plus,
      description: 'Autentique novos produtos e gere Evidence Pack',
    },
    {
      id: 'historico',
      label: 'Histórico Completo',
      icon: History,
      description: 'Visualize todos os Evidence Packs criados',
    },
    {
      id: 'defesa',
      label: 'Defesa Técnica',
      icon: Shield,
      description: 'Acesse provas para disputas e chargebacks',
    },
    {
      id: 'relatorios',
      label: 'Relatórios Avançados',
      icon: FileText,
      description: 'Exporte relatórios detalhados em PDF/Excel',
    },
    {
      id: 'integracoes',
      label: 'Integrações',
      icon: LinkIcon,
      description: 'Conecte com marketplaces e gateways',
    },
  ];

  return (
    <DashboardLayout
      title="VeriGuard AI"
      subtitle="Confiança Digital para suas vendas"
      menuItems={menuItems}
      onLogout={onLogout}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 text-sm">{stat.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
              <p className="text-3xl text-gray-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-gray-900 text-lg mb-4">Produtos autenticados por semana</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Bar dataKey="produtos" fill="#39843e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-gray-900 text-lg mb-4">Evolução da confiança</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={confiancaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#39843e" strokeWidth={3} dot={{ fill: '#39843e', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Evidence Packs Recentes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8"
      >
        <h3 className="text-gray-900 text-lg mb-4">Evidence Packs recentes</h3>
        <div className="space-y-3">
          {recentPacks.map((pack) => (
            <div
              key={pack.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-gray-900">{pack.produto}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      pack.status === 'validado'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {pack.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {pack.data}
                  </span>
                  <span>{pack.id}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Botões de Ação */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {actionButtons.map((button, index) => {
          const Icon = button.icon;
          return (
            <motion.button
              key={button.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setActiveModal(button.id)}
              className="bg-[#39843e] hover:bg-[#416b44] text-white p-6 rounded-xl transition-all duration-300 text-left group"
            >
              <Icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg mb-2">{button.label}</h4>
              <p className="text-white/80 text-sm">{button.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Rodapé com dicas */}
      <div className="bg-gradient-to-r from-[#39843e] to-[#416b44] rounded-xl p-6 text-white">
        <h4 className="text-lg mb-4">Benefícios da VeriGuard AI</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">Reduza disputas e chargebacks com provas técnicas irrefutáveis</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">Aumente a confiança dos clientes com autenticação digital</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">Proteja sua reputação e marca contra fraudes</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'cadastrar' && (
        <CadastrarProdutoModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'historico' && (
        <HistoricoModal onClose={() => setActiveModal(null)} type="vendedor" />
      )}
      {activeModal === 'defesa' && (
        <DefesaTecnicaModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'relatorios' && (
        <RelatoriosModal onClose={() => setActiveModal(null)} type="vendedor" />
      )}
      {activeModal === 'integracoes' && (
        <IntegracoesModal onClose={() => setActiveModal(null)} type="vendedor" />
      )}
    </DashboardLayout>
  );
}
