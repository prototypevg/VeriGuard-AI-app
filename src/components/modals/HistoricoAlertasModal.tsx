import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Filter, Search } from 'lucide-react';

interface HistoricoAlertasModalProps {
  onClose: () => void;
}

const alertasMock = [
  { id: 'TX-8821', transacao: 'Transferência PIX', valor: 'R$ 45.000', score: 92, status: 'fraude confirmada', data: '2025-12-08' },
  { id: 'TX-8820', transacao: 'Compra internacional', valor: 'R$ 12.300', score: 38, status: 'liberada', data: '2025-12-08' },
  { id: 'TX-8819', transacao: 'Saque ATM', valor: 'R$ 3.000', score: 65, status: 'em análise', data: '2025-12-07' },
  { id: 'TX-8818', transacao: 'TED suspeita', valor: 'R$ 28.000', score: 88, status: 'fraude confirmada', data: '2025-12-07' },
  { id: 'TX-8817', transacao: 'Pagamento cartão', valor: 'R$ 890', score: 25, status: 'liberada', data: '2025-12-06' },
  { id: 'TX-8816', transacao: 'PIX parcelado', valor: 'R$ 15.000', score: 72, status: 'em análise', data: '2025-12-06' },
];

export default function HistoricoAlertasModal({ onClose }: HistoricoAlertasModalProps) {
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroScore, setFiltroScore] = useState('todos');
  const [busca, setBusca] = useState('');

  const alertasFiltrados = alertasMock.filter(item => {
    const matchStatus = filtroStatus === 'todos' || item.status === filtroStatus;
    const matchScore = 
      filtroScore === 'todos' ||
      (filtroScore === 'alto' && item.score >= 70) ||
      (filtroScore === 'medio' && item.score >= 40 && item.score < 70) ||
      (filtroScore === 'baixo' && item.score < 40);
    const matchBusca = item.transacao.toLowerCase().includes(busca.toLowerCase()) || 
                       item.id.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchScore && matchBusca;
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="sticky top-0 bg-[#416b44] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <h2>Histórico Completo de Alertas</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar transação..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#39843e]"
              />
            </div>

            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
            >
              <option value="todos">Todos os status</option>
              <option value="fraude confirmada">Fraude confirmada</option>
              <option value="liberada">Liberada</option>
              <option value="em análise">Em análise</option>
            </select>

            <select
              value={filtroScore}
              onChange={(e) => setFiltroScore(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
            >
              <option value="todos">Todos os scores</option>
              <option value="alto">Alto Risco (70-100)</option>
              <option value="medio">Médio Risco (40-69)</option>
              <option value="baixo">Baixo Risco (0-39)</option>
            </select>

            <button className="bg-[#39843e] hover:bg-[#416b44] text-white px-4 py-2 rounded-lg transition-colors">
              Exportar
            </button>
          </div>

          <div className="text-sm text-gray-600">
            Mostrando {alertasFiltrados.length} de {alertasMock.length} investigações
          </div>
        </div>

        {/* Tabela com scroll */}
        <div className="flex-1 overflow-auto px-6 pb-6">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">ID</th>
                <th className="text-left py-3 px-4 text-gray-600">Transação</th>
                <th className="text-left py-3 px-4 text-gray-600">Valor</th>
                <th className="text-left py-3 px-4 text-gray-600">Score</th>
                <th className="text-left py-3 px-4 text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-gray-600">Data</th>
                <th className="text-right py-3 px-4 text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {alertasFiltrados.map(alerta => (
                <tr key={alerta.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{alerta.id}</td>
                  <td className="py-3 px-4">{alerta.transacao}</td>
                  <td className="py-3 px-4">{alerta.valor}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      alerta.score >= 70 
                        ? 'bg-red-100 text-red-700' 
                        : alerta.score >= 40
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {alerta.score}
                    </span>
                  </td>
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
                  <td className="py-3 px-4">{alerta.data}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-[#39843e] hover:underline text-sm mr-3">
                      Ver Detalhes
                    </button>
                    <button className="text-[#39843e] hover:underline text-sm">
                      Exportar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
