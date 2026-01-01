import { useState } from 'react';
import { motion } from 'motion/react';
import { X, AlertTriangle, CheckCircle, TrendingUp, MapPin, Smartphone, CreditCard, Brain } from 'lucide-react';
import { analisarTransacaoIA } from '../../utils/aiLogic';

interface AnalisarTransacaoModalProps {
  onClose: () => void;
}

export default function AnalisarTransacaoModal({ onClose }: AnalisarTransacaoModalProps) {
  const [formData, setFormData] = useState({
    idTransacao: '',
    valor: '',
    origem: '',
    destino: '',
    horario: '14:30' // Horário padrão, poderia ser um input
  });

  const [analise, setAnalise] = useState<any>(null);
  const [decisao, setDecisao] = useState<'fraude' | 'liberar' | null>(null);
  const [notaRevisao, setNotaRevisao] = useState('');
  const [confiancaHumana, setConfiancaHumana] = useState(50);
  const [loading, setLoading] = useState(false);

  const handleAnalisar = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulando tempo de processamento da IA (Delay dramático)
    setTimeout(() => {
      // Remover "R$" e converter para número
      const valorNumerico = parseFloat(formData.valor.replace(/[^0-9.-]+/g,""));
      
      const resultado = analisarTransacaoIA(
        isNaN(valorNumerico) ? 0 : valorNumerico,
        'PIX', // Assumindo PIX por padrão ou poderia vir de um select
        formData.origem,
        formData.horario
      );

      setAnalise(resultado);
      setLoading(false);
    }, 1500);
  };

  const handleDecisao = (tipo: 'fraude' | 'liberar') => {
    setDecisao(tipo);
    
    const msg = tipo === 'fraude'
      ? 'Fraude confirmada!\n\nEvidence Pack gerado com:\n- Score de risco\n- Fatores de decisão\n- Nota de revisão humana\n- Classificação de confiança\n\nTransação bloqueada e conta protegida.'
      : 'Transação liberada!\n\nEvidence Pack gerado documentando a decisão.\nO feedback será usado para re-treinar os modelos de IA.';
    
    alert(msg);
    onClose();
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
            <Brain className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Analisar Transação Suspeita</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleAnalisar} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">ID da Transação *</label>
              <input
                type="text"
                value={formData.idTransacao}
                onChange={(e) => setFormData({...formData, idTransacao: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39843e] focus:ring-1 focus:ring-[#39843e]"
                placeholder="Ex: TX-8822"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Valor (R$) *</label>
              <input
                type="text"
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39843e] focus:ring-1 focus:ring-[#39843e]"
                placeholder="Ex: 50000"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Dica: Valores acima de 50k aumentam o risco.</p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Origem *</label>
              <input
                type="text"
                value={formData.origem}
                onChange={(e) => setFormData({...formData, origem: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39843e] focus:ring-1 focus:ring-[#39843e]"
                placeholder="Ex: VPN, Tor, Desconhecido"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Dica: Tente digitar 'VPN' ou 'Tor'.</p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Destino *</label>
              <input
                type="text"
                value={formData.destino}
                onChange={(e) => setFormData({...formData, destino: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39843e] focus:ring-1 focus:ring-[#39843e]"
                placeholder="Conta/CPF destino"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Horário</label>
              <input
                type="time"
                value={formData.horario}
                onChange={(e) => setFormData({...formData, horario: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39843e] focus:ring-1 focus:ring-[#39843e]"
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
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processando Redes Neurais...
                </div>
              ) : (
                'Calcular Score de Risco (IA)'
              )}
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Score */}
              <div className={`border-2 rounded-xl p-6 ${
                analise.score >= 85 ? 'bg-red-50 border-red-300' :
                analise.score >= 60 ? 'bg-orange-50 border-orange-300' :
                analise.score >= 30 ? 'bg-yellow-50 border-yellow-300' :
                'bg-green-50 border-green-300'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-gray-900 font-bold text-xl mb-1">Score de Risco</h3>
                    <p className="text-sm text-gray-600 font-medium">Nível: {analise.nivelRisco}</p>
                  </div>
                  <div className={`text-6xl font-black ${
                    analise.score >= 60 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {analise.score}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${analise.score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-4 rounded-full ${
                      analise.score >= 85 ? 'bg-red-600' :
                      analise.score >= 60 ? 'bg-orange-500' :
                      analise.score >= 30 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                  />
                </div>
              </div>

              {/* Explicabilidade */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-blue-700" />
                  <h4 className="text-blue-900 font-bold">Recomendação da IA</h4>
                </div>
                <p className="text-blue-800 font-medium">{analise.recomendacao}</p>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-gray-900 font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Fatores de Risco Identificados
                </h4>
                <div className="space-y-3">
                  {analise.fatoresRisco.map((fator: string, index: number) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{fator}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revisão Humana */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-gray-900 font-bold mb-3">Revisão Humana</h4>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Nota de Revisão</label>
                  <textarea
                    value={notaRevisao}
                    onChange={(e) => setNotaRevisao(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e] h-24"
                    placeholder="Adicione observações sobre esta análise para auditoria..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleDecisao('fraude')}
                    className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 font-bold shadow-lg shadow-red-500/20"
                  >
                    <AlertTriangle className="w-5 h-5" />
                    Confirmar Fraude
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDecisao('liberar')}
                    className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 font-bold shadow-lg shadow-green-500/20"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Liberar Transação
                  </button>
                </div>
                
                <button 
                  type="button"
                  onClick={() => setAnalise(null)}
                  className="w-full mt-4 text-gray-500 text-sm hover:underline"
                >
                  Realizar nova análise
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}