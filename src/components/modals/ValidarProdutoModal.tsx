import { useState } from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, AlertTriangle, Package, DollarSign, FileText, Search, Ban } from 'lucide-react';
import { analisarProdutoIA } from '../../utils/aiLogic';

interface ValidarProdutoModalProps {
  onClose: () => void;
}

export default function ValidarProdutoModal({ onClose }: ValidarProdutoModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    categoria: 'Eletrônicos',
    preco: '',
    descricao: ''
  });

  const [analise, setAnalise] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalisar = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const precoNum = parseFloat(formData.preco.replace(/[^0-9.-]+/g,""));
      const resultado = analisarProdutoIA(
        formData.nome,
        isNaN(precoNum) ? 0 : precoNum,
        formData.descricao,
        formData.categoria
      );
      setAnalise(resultado);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-[#39843e] text-white p-6 rounded-t-2xl flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Validar Legitimidade de Produto (IA)</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleAnalisar} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Nome do Produto *</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#39843e] focus:border-[#39843e]"
                placeholder="Ex: iPhone 15 Pro Max 256GB"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Preço (R$) *</label>
              <input
                type="text"
                value={formData.preco}
                onChange={(e) => setFormData({...formData, preco: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#39843e] focus:border-[#39843e]"
                placeholder="Ex: 500.00"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Dica: Preço muito baixo para item de luxo gera alerta.</p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Categoria</label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#39843e] focus:border-[#39843e]"
              >
                <option>Eletrônicos</option>
                <option>Moda & Acessórios</option>
                <option>Casa & Decoração</option>
                <option>Brinquedos</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Descrição *</label>
              <textarea
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#39843e] focus:border-[#39843e] h-24"
                placeholder="Descreva o produto... (Evite termos como 'réplica' ou 'primeira linha')"
                required
              />
            </div>
          </div>

          {!analise ? (
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-4 px-6 rounded-xl transition-all font-bold text-lg shadow-lg ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#39843e] to-[#416b44] hover:from-[#416b44] hover:to-[#39843e]'
              }`}
            >
              {loading ? 'Analisando Base de Propriedade Intelectual...' : 'Verificar Compliance'}
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              <div className={`border-2 rounded-xl p-6 ${
                analise.status === 'APROVADO' ? 'bg-green-50 border-green-300' :
                analise.status === 'SUSPEITO' ? 'bg-yellow-50 border-yellow-300' :
                'bg-red-50 border-red-300'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">Resultado da Análise</h3>
                  <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                    analise.status === 'APROVADO' ? 'bg-green-200 text-green-800' :
                    analise.status === 'SUSPEITO' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {analise.status}
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-gray-800">{analise.scoreLegitimidade}</span>
                  <span className="text-gray-600 mb-1">/ 100 de Score de Legitimidade</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-600" /> Detalhes da Auditoria
                </h4>
                <ul className="space-y-3">
                  {analise.problemasDetectados.map((prob: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      {prob.includes('Nenhuma') ? <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />}
                      {prob}
                    </li>
                  ))}
                </ul>
              </div>

              {analise.status !== 'APROVADO' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-bold text-blue-900 text-sm mb-1">Recomendação de Preço</h4>
                  <p className="text-blue-800 text-sm">{analise.sugestaoPreco}</p>
                </div>
              )}

              <button 
                type="button"
                onClick={() => setAnalise(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-colors font-medium"
              >
                Testar Novo Produto
              </button>

            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
