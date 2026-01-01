import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Filter, Download, Search } from 'lucide-react';

interface HistoricoModalProps {
  onClose: () => void;
  perfil: 'vendedores' | 'marketplaces';
}

const evidencePacksMock = [
  { id: 'EP-001', item: 'Curso Marketing Digital', data: '2025-12-08', status: 'validado', tipo: 'produto' },
  { id: 'EP-002', item: 'eBook Growth Hacking', data: '2025-12-07', status: 'validado', tipo: 'produto' },
  { id: 'EP-003', item: 'Template Design', data: '2025-12-06', status: 'pendente', tipo: 'produto' },
  { id: 'FR-001', item: 'Plugin Crack Ilegal', data: '2025-12-05', status: 'fraude detectada', tipo: 'fraude', motivo: 'Software pirata' },
  { id: 'EP-004', item: 'Plugin WordPress SEO', data: '2025-12-05', status: 'validado', tipo: 'produto' },
  { id: 'SUS-001', item: 'Curso Hacking Black Hat', data: '2025-12-04', status: 'suspeito', tipo: 'suspeito', motivo: 'Conteúdo ilegal suspeito' },
  { id: 'EP-005', item: 'Vídeo Aula React', data: '2025-12-04', status: 'validado', tipo: 'produto' },
  { id: 'FR-002', item: 'eBook Duplicado', data: '2025-12-03', status: 'fraude detectada', tipo: 'fraude', motivo: 'Violação de copyright' },
  { id: 'EP-006', item: 'Planilha Financeira', data: '2025-12-03', status: 'bloqueado', tipo: 'produto' },
  { id: 'SUS-002', item: 'Template Premium Grátis', data: '2025-12-02', status: 'suspeito', tipo: 'suspeito', motivo: 'Preço inconsistente' },
  { id: 'EP-007', item: 'Curso Python', data: '2025-12-02', status: 'validado', tipo: 'produto' },
  { id: 'FR-003', item: 'Chave Netflix Compartilhada', data: '2025-12-01', status: 'fraude detectada', tipo: 'fraude', motivo: 'Revenda não autorizada' },
  { id: 'EP-008', item: 'Template Landing Page', data: '2025-12-01', status: 'validado', tipo: 'produto' }
];

export default function HistoricoModal({ onClose, perfil }: HistoricoModalProps) {
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [busca, setBusca] = useState('');

  const evidenceFiltrado = evidencePacksMock.filter(item => {
    const matchStatus = filtroStatus === 'todos' || item.status === filtroStatus;
    const matchBusca = item.item.toLowerCase().includes(busca.toLowerCase()) || 
                       item.id.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  const handleExportarLote = () => {
    alert('Exportando Evidence Packs em lote...\n\nFormato: PDF + JSON\nTotal: ' + evidenceFiltrado.length + ' itens\n\nDownload iniciado!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="sticky top-0 bg-[#416b44] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <h2>Histórico Completo de Evidence Packs</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por produto ou ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#39843e]"
              />
            </div>

            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
            >
              <option value="todos">Todos os status</option>
              <option value="validado">Validado</option>
              <option value="pendente">Pendente</option>
              <option value="bloqueado">Bloqueado</option>
              <option value="fraude detectada">Fraude detectada</option>
              <option value="suspeito">Suspeito</option>
            </select>

            <button
              onClick={handleExportarLote}
              className="bg-[#39843e] hover:bg-[#416b44] text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Exportar Lote
            </button>
          </div>

          {/* Resultados */}
          <div className="text-sm text-gray-600 mb-2">
            Mostrando {evidenceFiltrado.length} de {evidencePacksMock.length} registros
          </div>
        </div>

        {/* Tabela com scroll */}
        <div className="flex-1 overflow-auto px-6 pb-6">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">ID</th>
                <th className="text-left py-3 px-4 text-gray-600">Item</th>
                <th className="text-left py-3 px-4 text-gray-600">Data</th>
                <th className="text-left py-3 px-4 text-gray-600">Status</th>
                <th className="text-right py-3 px-4 text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {evidenceFiltrado.map(item => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">{item.item}</td>
                  <td className="py-3 px-4">{item.data}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      item.status === 'validado' 
                        ? 'bg-green-100 text-green-700' 
                        : item.status === 'bloqueado'
                        ? 'bg-red-100 text-red-700'
                        : item.status === 'fraude detectada'
                        ? 'bg-red-100 text-red-700'
                        : item.status === 'suspeito'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-[#39843e] hover:underline text-sm mr-3">
                      Ver Detalhes
                    </button>
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
    </div>
  );
}