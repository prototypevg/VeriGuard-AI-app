import { motion } from 'motion/react';
import { X, ShoppingBag, CheckCircle, AlertTriangle, ExternalLink, Download } from 'lucide-react';

interface ProdutosCadastradosModalProps {
  onClose: () => void;
}

const produtosCadastrados = [
  { 
    id: 'PROD-001', 
    nome: 'Curso Marketing Digital Completo', 
    categoria: 'Curso Online',
    preco: 'R$ 497,00',
    status: 'ativo',
    vendas: 142,
    score: 98,
    dataCadastro: '2025-11-15'
  },
  { 
    id: 'PROD-002', 
    nome: 'eBook Growth Hacking Avançado', 
    categoria: 'eBook',
    preco: 'R$ 97,00',
    status: 'ativo',
    vendas: 87,
    score: 95,
    dataCadastro: '2025-11-20'
  },
  { 
    id: 'PROD-003', 
    nome: 'Template Design Profissional', 
    categoria: 'Template',
    preco: 'R$ 147,00',
    status: 'ativo',
    vendas: 63,
    score: 97,
    dataCadastro: '2025-11-28'
  },
  { 
    id: 'PROD-004', 
    nome: 'Mentoria Vendas Online', 
    categoria: 'Mentoria',
    preco: 'R$ 1.997,00',
    status: 'pausado',
    vendas: 24,
    score: 92,
    dataCadastro: '2025-12-01'
  },
  { 
    id: 'PROD-005', 
    nome: 'Plugin WordPress SEO Pro', 
    categoria: 'Software',
    preco: 'R$ 247,00',
    status: 'ativo',
    vendas: 156,
    score: 99,
    dataCadastro: '2025-10-05'
  },
  { 
    id: 'PROD-006', 
    nome: 'Planilha Gestão Financeira', 
    categoria: 'Planilha',
    preco: 'R$ 67,00',
    status: 'ativo',
    vendas: 203,
    score: 96,
    dataCadastro: '2025-09-18'
  }
];

export default function ProdutosCadastradosModal({ onClose }: ProdutosCadastradosModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#39843e] to-[#416b44] text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl">Produtos Cadastrados</h2>
                <p className="text-white/80 text-sm">Gerenciamento completo dos seus produtos digitais</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-b border-gray-200">
          <div className="text-center">
            <div className="text-3xl text-[#39843e] mb-1">6</div>
            <div className="text-sm text-gray-600">Total de Produtos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl text-[#39843e] mb-1">5</div>
            <div className="text-sm text-gray-600">Produtos Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl text-[#39843e] mb-1">675</div>
            <div className="text-sm text-gray-600">Vendas Totais</div>
          </div>
          <div className="text-center">
            <div className="text-3xl text-[#39843e] mb-1">96.5</div>
            <div className="text-sm text-gray-600">Score Médio</div>
          </div>
        </div>

        {/* Lista de produtos */}
        <div className="overflow-y-auto max-h-[calc(90vh-280px)] p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 text-gray-700">Produto</th>
                  <th className="text-left py-3 px-4 text-gray-700">Categoria</th>
                  <th className="text-left py-3 px-4 text-gray-700">Preço</th>
                  <th className="text-left py-3 px-4 text-gray-700">Vendas</th>
                  <th className="text-left py-3 px-4 text-gray-700">Score</th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosCadastrados.map((produto) => (
                  <tr key={produto.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-600">{produto.id}</td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{produto.nome}</div>
                      <div className="text-xs text-gray-500">Cadastrado em {produto.dataCadastro}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{produto.categoria}</td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{produto.preco}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{produto.vendas}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          produto.score >= 95 
                            ? 'bg-green-100 text-green-700' 
                            : produto.score >= 90
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {produto.score}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                        produto.status === 'ativo'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {produto.status === 'ativo' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <AlertTriangle className="w-3 h-3" />
                        )}
                        {produto.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group" title="Ver detalhes">
                          <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-[#39843e]" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group" title="Baixar Evidence Pack">
                          <Download className="w-4 h-4 text-gray-600 group-hover:text-[#39843e]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Todos os produtos estão protegidos por Evidence Pack e monitoramento de fraude 24/7
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#39843e] hover:bg-[#416b44] text-white rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
