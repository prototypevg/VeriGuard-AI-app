import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Package, AlertTriangle, Camera, Ban, CheckCircle, Search, Eye, Image } from 'lucide-react';

interface ProdutoFalsoModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const produtosSuspeitos = [
  { 
    id: 'PF-001', 
    nome: 'iPhone 15 Pro Max 256GB',
    vendedor: 'Loja_Imports_BR',
    preco: 'R$ 2.499',
    precoReal: 'R$ 8.999',
    desconto: '72%',
    imagem: '📱',
    risco: 98,
    status: 'falso_confirmado',
    alertas: ['Preço muito abaixo', 'Fotos de banco de imagens', 'Vendedor sem histórico', 'Sem nota fiscal']
  },
  { 
    id: 'PF-002', 
    nome: 'Tênis Nike Air Max Original',
    vendedor: 'Super_Ofertas_2024',
    preco: 'R$ 89,90',
    precoReal: 'R$ 799',
    desconto: '89%',
    imagem: '👟',
    risco: 95,
    status: 'falsificado',
    alertas: ['Marca falsificada', 'Preço impossível', 'Sem certificação']
  },
  { 
    id: 'PF-003', 
    nome: 'Bolsa Louis Vuitton Neverfull',
    vendedor: 'Luxo_Acessível',
    preco: 'R$ 450',
    precoReal: 'R$ 12.000',
    desconto: '96%',
    imagem: '👜',
    risco: 99,
    status: 'contrafação',
    alertas: ['Produto de luxo falsificado', 'Violação de marca', 'Risco legal']
  },
  { 
    id: 'PF-004', 
    nome: 'PlayStation 5 + 10 Jogos',
    vendedor: 'Games_BR_Official',
    preco: 'R$ 1.899',
    precoReal: 'R$ 4.500',
    desconto: '58%',
    imagem: '🎮',
    risco: 75,
    status: 'suspeito',
    alertas: ['Preço abaixo do mercado', 'Bundle suspeito']
  },
];

export default function ProdutoFalsoModal({ onClose, darkMode = false }: ProdutoFalsoModalProps) {
  const [produtos, setProdutos] = useState(produtosSuspeitos);
  const [busca, setBusca] = useState('');

  const removerProduto = (id: string) => {
    setProdutos(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'removido' } : p
    ));
  };

  const aprovarProduto = (id: string) => {
    setProdutos(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'aprovado' } : p
    ));
  };

  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.vendedor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-5xl rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Detecção de Produtos Falsos</h2>
                <p className="text-orange-100 text-sm">IA analisa imagens e preços para detectar falsificações</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Estatísticas */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
              <div className="text-2xl font-bold text-red-500">
                {produtos.filter(p => p.status === 'falso_confirmado' || p.status === 'falsificado' || p.status === 'contrafação').length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Falsos Detectados</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
              <div className="text-2xl font-bold text-yellow-500">
                {produtos.filter(p => p.status === 'suspeito').length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Suspeitos</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <div className="text-2xl font-bold text-green-500">847</div>
              <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Removidos Este Mês</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <div className="text-2xl font-bold text-blue-500">99.2%</div>
              <div className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Precisão IA</div>
            </div>
          </div>

          {/* Busca */}
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border mb-6 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
            <Search className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Buscar produtos suspeitos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className={`flex-1 bg-transparent outline-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
            />
          </div>

          {/* Lista de Produtos */}
          <div className="space-y-4">
            {filtrados.map(produto => (
              <motion.div
                key={produto.id}
                layout
                className={`p-4 rounded-xl border ${
                  produto.status === 'removido'
                    ? darkMode ? 'bg-gray-700 border-gray-600 opacity-50' : 'bg-gray-100 border-gray-200 opacity-50'
                    : produto.status === 'aprovado'
                    ? darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
                    : darkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex flex-wrap items-start gap-4">
                  {/* Imagem */}
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-4xl ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                    {produto.imagem}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        produto.status === 'falso_confirmado' ? 'bg-red-600 text-white' :
                        produto.status === 'falsificado' ? 'bg-orange-600 text-white' :
                        produto.status === 'contrafação' ? 'bg-purple-600 text-white' :
                        produto.status === 'removido' ? 'bg-gray-500 text-white' :
                        produto.status === 'aprovado' ? 'bg-green-600 text-white' :
                        'bg-yellow-500 text-white'
                      }`}>
                        {produto.status === 'falso_confirmado' ? 'FALSO' :
                         produto.status === 'falsificado' ? 'FALSIFICADO' :
                         produto.status === 'contrafação' ? 'CONTRAFAÇÃO' :
                         produto.status.toUpperCase()}
                      </span>
                    </div>

                    <div className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {produto.nome}
                    </div>
                    
                    <div className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Vendedor: {produto.vendedor}
                    </div>

                    {/* Comparação de Preço */}
                    <div className="flex items-center gap-4 mb-3">
                      <div>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Preço anunciado:</span>
                        <span className="ml-1 font-bold text-red-500">{produto.preco}</span>
                      </div>
                      <div>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Preço real:</span>
                        <span className={`ml-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{produto.precoReal}</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-500 font-bold">
                        <AlertTriangle className="w-4 h-4" />
                        -{produto.desconto}
                      </div>
                    </div>

                    {/* Alertas */}
                    <div className="flex flex-wrap gap-2">
                      {produto.alertas.map((alerta, i) => (
                        <span key={i} className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                          darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                        }`}>
                          <AlertTriangle className="w-3 h-3" />
                          {alerta}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-center">
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Risco</div>
                      <div className={`text-2xl font-bold ${
                        produto.risco >= 90 ? 'text-red-500' : produto.risco >= 70 ? 'text-orange-500' : 'text-yellow-500'
                      }`}>
                        {produto.risco}%
                      </div>
                    </div>

                    {produto.status !== 'removido' && produto.status !== 'aprovado' && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => aprovarProduto(produto.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removerProduto(produto.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
