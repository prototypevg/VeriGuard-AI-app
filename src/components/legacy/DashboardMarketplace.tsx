import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Package, Ban, FileText, History, Settings, HelpCircle, BarChart3, Plus, Eye, XCircle } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import DashboardLayout from '../DashboardLayout';
import ModalValidarProduto from '../modals/ValidarProdutoModal';

interface DashboardMarketplaceProps {
  onLogout: () => void;
}

const mockDataSemanal = [
  { semana: 'Sem 1', produtos: 324 },
  { semana: 'Sem 2', produtos: 412 },
  { semana: 'Sem 3', produtos: 389 },
  { semana: 'Sem 4', produtos: 456 },
];

const mockDataVendedores = [
  { name: 'Confiáveis', value: 847, color: '#39843e' },
  { name: 'Bloqueados', value: 23, color: '#dc2626' },
  { name: 'Em análise', value: 56, color: '#eab308' },
];

const mockProdutos = [
  { id: 'P-001', produto: 'Curso de Programação', vendedor: 'Tech Academy', status: 'validado' },
  { id: 'P-002', produto: 'E-book Marketing', vendedor: 'Digital Masters', status: 'validado' },
  { id: 'P-003', produto: 'Template Design', vendedor: 'Creative Hub', status: 'pendente' },
  { id: 'P-004', produto: 'Plugin WordPress', vendedor: 'Dev Solutions', status: 'bloqueado' },
  { id: 'P-005', produto: 'Planilha Excel', vendedor: 'Office Pro', status: 'validado' },
];

export default function DashboardMarketplace({ onLogout }: DashboardMarketplaceProps) {
  const [modalValidar, setModalValidar] = useState(false);

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', active: true },
    { icon: Plus, label: 'Validar produto', action: () => setModalValidar(true) },
    { icon: Package, label: 'Lista' },
    { icon: FileText, label: 'Relatórios' },
    { icon: Shield, label: 'Integrações' },
    { icon: Settings, label: 'Configurações' },
    { icon: HelpCircle, label: 'Suporte' },
  ];

  return (
    <>
      <DashboardLayout
        title="VeriGuard AI"
        subtitle="Confiança Digital para seu marketplace"
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
              <Users className="w-10 h-10 text-[#39843e]" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="text-3xl text-[#416b44]"
              >
                847
              </motion.span>
            </div>
            <h3 className="text-gray-600">Vendedores Ativos Validados</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <Package className="w-10 h-10 text-[#39843e]" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="text-3xl text-[#416b44]"
              >
                1,581
              </motion.span>
            </div>
            <h3 className="text-gray-600">Produtos Autenticados</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <Ban className="w-10 h-10 text-red-600" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="text-3xl text-red-600"
              >
                23
              </motion.span>
            </div>
            <h3 className="text-gray-600">Itens Bloqueados</h3>
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
            <h3 className="mb-4 text-[#416b44]">Produtos Validados por Semana</h3>
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
            <h3 className="mb-4 text-[#416b44]">Status dos Vendedores</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={mockDataVendedores}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockDataVendedores.map((entry, index) => (
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
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8"
        >
          <h3 className="mb-4 text-[#416b44]">Produtos e Vendedores</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600">ID</th>
                  <th className="text-left py-3 px-4 text-gray-600">Produto</th>
                  <th className="text-left py-3 px-4 text-gray-600">Vendedor</th>
                  <th className="text-left py-3 px-4 text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockProdutos.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-gray-500">{item.id}</td>
                    <td className="py-3 px-4">{item.produto}</td>
                    <td className="py-3 px-4 text-gray-600">{item.vendedor}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        item.status === 'validado' ? 'bg-green-100 text-green-700' :
                        item.status === 'bloqueado' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-end">
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Detalhes">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        {item.status !== 'bloqueado' && (
                          <button className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Bloquear">
                            <XCircle className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
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
            onClick={() => setModalValidar(true)}
            className="bg-[#39843e] hover:bg-[#416b44] text-white p-6 rounded-xl transition-colors flex items-center gap-3 justify-center"
          >
            <Plus className="w-6 h-6" />
            Validar Entrada de Produto
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white hover:bg-gray-50 text-[#416b44] p-6 rounded-xl border-2 border-[#39843e] transition-colors flex items-center gap-3 justify-center"
          >
            <Ban className="w-6 h-6" />
            Itens Bloqueados
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white hover:bg-gray-50 text-[#416b44] p-6 rounded-xl border-2 border-[#39843e] transition-colors flex items-center gap-3 justify-center"
          >
            <FileText className="w-6 h-6" />
            Relatórios de Reputação
          </motion.button>
        </div>

        {/* Rodapé com benefícios */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-[#f7ede1] rounded-xl p-6 border border-[#39843e]/20"
        >
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <Shield className="w-8 h-8 text-[#39843e] mx-auto mb-2" />
              <p className="text-[#416b44]">Proteja a reputação do marketplace</p>
            </div>
            <div>
              <Ban className="w-8 h-8 text-[#39843e] mx-auto mb-2" />
              <p className="text-[#416b44]">Reduza riscos comerciais</p>
            </div>
            <div>
              <Users className="w-8 h-8 text-[#39843e] mx-auto mb-2" />
              <p className="text-[#416b44]">Aumente confiança dos compradores</p>
            </div>
          </div>
        </motion.div>
      </DashboardLayout>

      <ModalValidarProduto isOpen={modalValidar} onClose={() => setModalValidar(false)} />
    </>
  );
}
