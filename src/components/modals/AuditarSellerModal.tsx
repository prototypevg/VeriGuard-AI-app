import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Search, Building2, Calendar, AlertOctagon, CheckCircle2, FileWarning } from 'lucide-react';
import { analisarSellerIA } from '../../utils/aiLogic';

interface AuditarSellerModalProps {
  onClose: () => void;
}

export default function AuditarSellerModal({ onClose }: AuditarSellerModalProps) {
  const [formData, setFormData] = useState({
    cnpj: '',
    nomeFantasia: '',
    tempoMeses: '',
    faturamento: '',
    reclamacoes: ''
  });

  const [analise, setAnalise] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAuditar = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const faturamentoNum = parseFloat(formData.faturamento.replace(/[^0-9.-]+/g,""));
      const mesesNum = parseInt(formData.tempoMeses);
      const recNum = parseInt(formData.reclamacoes);
      
      const resultado = analisarSellerIA(
        formData.cnpj,
        isNaN(mesesNum) ? 0 : mesesNum,
        isNaN(recNum) ? 0 : recNum,
        isNaN(faturamentoNum) ? 0 : faturamentoNum
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
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-[#39843e] text-white p-6 rounded-t-2xl flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Auditoria KYC de Vendedores (IA)</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleAuditar} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">CNPJ *</label>
              <input
                type="text"
                value={formData.cnpj}
                onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#39843e] focus:border-[#39843e]"
                placeholder="00.000.000/0001-00"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Nome Fantasia</label>
              <input
                type="text"
                value={formData.nomeFantasia}
                onChange={(e) => setFormData({...formData, nomeFantasia: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#39843e] focus:border-[#39843e]"
                placeholder="Loja Exemplo LTDA"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Tempo de Atividade (Meses) *</label>
              <input
                type="number"
                value={formData.tempoMeses}
                onChange={(e) => setFormData({...formData, tempoMeses: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#39843e] focus:border-[#39843e]"
                placeholder="Ex: 6"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Contas novas com alto volume são suspeitas.</p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Faturamento Mensal (R$) *</label>
              <input
                type="text"
                value={formData.faturamento}
                onChange={(e) => setFormData({...formData, faturamento: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#39843e] focus:border-[#39843e]"
                placeholder="Ex: 150000"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Total de Reclamações (Últimos 30 dias)</label>
              <input
                type="number"
                value={formData.reclamacoes}
                onChange={(e) => setFormData({...formData, reclamacoes: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#39843e] focus:border-[#39843e]"
                placeholder="Ex: 0"
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
              {loading ? 'Consultando Receita Federal e Histórico de Fraudes...' : 'Executar Auditoria de Seller'}
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`border-2 rounded-xl p-6 flex flex-col justify-center ${
                  analise.classificacao === 'PREMIUM' ? 'bg-green-50 border-green-300' :
                  analise.classificacao === 'BLOQUEADO' ? 'bg-red-50 border-red-300' :
                  'bg-yellow-50 border-yellow-300'
                }`}>
                  <h3 className="text-gray-600 font-medium mb-1">Reputação Calculada</h3>
                  <div className="text-5xl font-black text-gray-800 mb-2">{analise.scoreReputacao}</div>
                  <span className={`px-3 py-1 rounded text-center text-sm font-bold w-fit ${
                    analise.classificacao === 'PREMIUM' ? 'bg-green-200 text-green-800' :
                    analise.classificacao === 'BLOQUEADO' ? 'bg-red-200 text-red-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {analise.classificacao}
                  </span>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-3">Sinais de Risco (Flags)</h4>
                  <ul className="space-y-2">
                    {analise.flags.map((flag: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        {flag.includes('Limpo') ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertOctagon className="w-5 h-5 text-red-500" />}
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <FileWarning className="w-5 h-5" />
                  Análise Comportamental
                </h4>
                <p className="text-blue-800">{analise.analiseComportamental}</p>
              </div>

              <button 
                type="button"
                onClick={() => setAnalise(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-colors font-medium"
              >
                Auditar Outro CNPJ
              </button>

            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
