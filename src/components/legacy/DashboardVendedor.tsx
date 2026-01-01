import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Package, CheckCircle, AlertTriangle, FileText, History, Settings, HelpCircle, LogOut, Download, Share2, BarChart3, TrendingUp, Plus } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../DashboardLayout';
import ModalCadastrarProduto from '../modals/ModalCadastrarProduto';
import ModalHistorico from '../modals/ModalHistorico';
import ModalDefesaTecnica from '../modals/ModalDefesaTecnica';

interface DashboardVendedorProps {
  onLogout: () => void;
}

const mockDataSemanal = [
  { semana: 'Sem 1', produtos: 45 },
  { semana: 'Sem 2', produtos: 62 },
  { semana: 'Sem 3', produtos: 58 },
  { semana: 'Sem 4', produtos: 73 },
];

const mockDataConfianca = [
  { dia: 'Seg', confianca: 85 },
  { dia: 'Ter', confianca: 87 },
  { dia: 'Qua', confianca: 89 },
  { dia: 'Qui', confianca: 91 },
  { dia: 'Sex', confianca: 93 },
  { dia: 'Sáb', confianca: 95 },
  { dia: 'Dom', confianca: 96 },
];

const mockEvidencePacks = [
  { id: 'EP-001', produto: 'Curso de Marketing Digital', data: '2025-12-07', status: 'validado' },
  { id: 'EP-002', produto: 'E-book de SEO Avançado', data: '2025-12-06', status: 'validado' },
  { id: 'EP-003', produto: 'Template de Landing Page', data: '2025-12-05', status: 'pendente' },
  { id: 'EP-004', produto: 'Plugin WordPress Premium', data: '2025-12-04', status: 'validado' },
];

export default function DashboardVendedor({ onLogout }: DashboardVendedorProps) {
  const [modalCadastrar, setModalCadastrar] = useState(false);
  const [modalHistorico, setModalHistorico] = useState(false);
  const [modalDefesa, setModalDefesa] = useState(false);

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', active: true },
    { icon: Plus, label: 'Autenticar', action: () => setModalCadastrar(true) },
    { icon: History, label: 'Histórico', action: () => setModalHistorico(true) },
    { icon: FileText, label: 'Relatórios' },
    { icon: Shield, label: 'Integrações' },
    { icon: Settings, label: 'Configurações' },
    { icon: HelpCircle, label: 'Suporte' },
  ];

  return (
    <>
      <DashboardLayout
        title="VeriGuard AI"
        subtitle="Confiança Digital para suas vendas"
        menuItems={menuItems}
        onLogout={onLogout}
      >
        {/* Cards principais */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <Package className="w-10 h-10 text-[#39843e]" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="text-3xl text-[#416b44]"
              >
                238
              </motion.span>
            </div>
            <h3 className="text-gray-600">Produtos Autenticados</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-10 h-10 text-[#39843e]" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="text-3xl text-[#416b44]"
              >
                1,847
              </motion.span>
            </div>
            <h3 className="text-gray-600">Transações Validadas</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-10 h-10 text-[#39843e]" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="text-3xl text-[#416b44]"
              >
                12
              </motion.span>
            </div>
            <h3 className="text-gray-600">Disputas Evitadas</h3>
          </motion.div>
        </div>

        {/* Gráficos */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="mb-4 text-[#416b44]">Produtos Autenticados por Semana</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockDataSemanal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="semana" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="produtos" fill="#39843e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="mb-4 text-[#416b44]">Evolução da Confiança</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockDataConfianca}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="dia" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="confianca" stroke="#39843e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Lista de Evidence Packs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8"
        >
          <h3 className="mb-4 text-[#416b44]">Evidence Packs Recentes</h3>
          <div className="space-y-3">
            {mockEvidencePacks.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#39843e] transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{pack.id}</span>
                    <span className="text-gray-800">{pack.produto}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-500">{pack.data}</span>
                    <span className={`text-sm px-2 py-1 rounded ${pack.status === 'validado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {pack.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Exportar">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Compartilhar">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Botões de ação */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setModalCadastrar(true)}
            className="bg-[#39843e] hover:bg-[#416b44] text-white p-6 rounded-xl transition-colors flex items-center gap-3 justify-center"
          >
            <Plus className="w-6 h-6" />
            Cadastrar Produto/Transação
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setModalHistorico(true)}
            className="bg-white hover:bg-gray-50 text-[#416b44] p-6 rounded-xl border-2 border-[#39843e] transition-colors flex items-center gap-3 justify-center"
          >
            <History className="w-6 h-6" />
            Histórico Completo
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setModalDefesa(true)}
            className="bg-white hover:bg-gray-50 text-[#416b44] p-6 rounded-xl border-2 border-[#39843e] transition-colors flex items-center gap-3 justify-center"
          >
            <Shield className="w-6 h-6" />
            Defesa Técnica
          </motion.button>
        </div>

        {/* Rodapé com dicas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-[#f7ede1] rounded-xl p-6 border border-[#39843e]/20"
        >
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <TrendingUp className="w-8 h-8 text-[#39843e] mx-auto mb-2" />
              <p className="text-[#416b44]">Reduza disputas em até 87%</p>
            </div>
            <div>
              <CheckCircle className="w-8 h-8 text-[#39843e] mx-auto mb-2" />
              <p className="text-[#416b44]">Aumente confiança do cliente</p>
            </div>
            <div>
              <Shield className="w-8 h-8 text-[#39843e] mx-auto mb-2" />
              <p className="text-[#416b44]">Proteja sua reputação digital</p>
            </div>
          </div>
        </motion.div>
      </DashboardLayout>

      <ModalCadastrarProduto isOpen={modalCadastrar} onClose={() => setModalCadastrar(false)} />
      <ModalHistorico isOpen={modalHistorico} onClose={() => setModalHistorico(false)} />
      <ModalDefesaTecnica isOpen={modalDefesa} onClose={() => setModalDefesa(false)} />
    </>
  );
}
