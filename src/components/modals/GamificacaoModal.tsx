import { motion } from 'motion/react';
import { X, Award, TrendingUp, Target, Star, Shield, Zap } from 'lucide-react';

interface GamificacaoModalProps {
  onClose: () => void;
  darkMode: boolean;
  perfil: 'vendedores' | 'marketplaces' | 'bancos';
}

export default function GamificacaoModal({ onClose, darkMode, perfil }: GamificacaoModalProps) {
  const scoreReputacao = 94;
  const nivel = 'Ouro';
  const proximoNivel = 'Platina';
  const pontosProximoNivel = 6;

  const conquistas = [
    { id: 1, titulo: '100 Produtos Autenticados', icon: Star, conquistado: true, data: '2025-11-15' },
    { id: 2, titulo: 'Zero Disputas em 30 dias', icon: Shield, conquistado: true, data: '2025-12-01' },
    { id: 3, titulo: 'Evidence Pack Expert', icon: Award, conquistado: true, data: '2025-10-22' },
    { id: 4, titulo: 'Integração Completa', icon: Zap, conquistado: false, data: null },
    { id: 5, titulo: '500 Transações Validadas', icon: TrendingUp, conquistado: false, data: null },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="bg-gradient-to-r from-[#39843e] to-[#416b44] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2>Pontuação de Reputação VeriGuard</h2>
            <p className="text-white/80 text-sm">Sistema de gamificação e reconhecimento</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Score Principal */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-4 shadow-2xl"
            >
              <div className="text-white">
                <div className="text-4xl">{scoreReputacao}</div>
                <div className="text-sm opacity-80">Score</div>
              </div>
            </motion.div>
            
            <div className={`text-2xl mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Selo {nivel} VeriGuard
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Você está entre os {perfil === 'vendedores' ? '10% melhores vendedores' : perfil === 'marketplaces' ? '5% melhores marketplaces' : '3% melhores instituições'}
            </p>

            {/* Barra de progresso */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Nível {nivel}</span>
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Próximo: {proximoNivel}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all"
                  style={{ width: '86%' }}
                />
              </div>
              <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Faltam {pontosProximoNivel} pontos para o nível {proximoNivel}
              </p>
            </div>
          </div>

          {/* Selos e Medalhas */}
          <div>
            <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Suas Medalhas e Conquistas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conquistas.map(conquista => (
                <div
                  key={conquista.id}
                  className={`p-4 rounded-xl border ${
                    conquista.conquistado
                      ? darkMode
                        ? 'bg-green-900/20 border-green-700'
                        : 'bg-green-50 border-green-200'
                      : darkMode
                      ? 'bg-gray-700 border-gray-600 opacity-50'
                      : 'bg-gray-50 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      conquista.conquistado
                        ? 'bg-green-500 text-white'
                        : darkMode
                        ? 'bg-gray-600 text-gray-400'
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      <conquista.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className={`mb-1 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {conquista.titulo}
                      </div>
                      {conquista.conquistado && (
                        <div className="text-xs text-green-600">
                          Conquistado em {conquista.data}
                        </div>
                      )}
                      {!conquista.conquistado && (
                        <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          Bloqueado
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefícios do Selo */}
          <div className={`p-6 rounded-xl border ${
            darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
          }`}>
            <h4 className={`mb-3 flex items-center gap-2 ${
              darkMode ? 'text-yellow-400' : 'text-yellow-900'
            }`}>
              <Award className="w-5 h-5" />
              Benefícios do Selo {nivel}
            </h4>
            <ul className={`space-y-2 text-sm ${
              darkMode ? 'text-yellow-300' : 'text-yellow-800'
            }`}>
              <li>✓ Aparece no Painel de Reputação Pública</li>
              <li>✓ Prioridade no suporte técnico</li>
              <li>✓ Desconto de 15% nas taxas de transação</li>
              <li>✓ Badge exclusivo para exibir em seu site</li>
              <li>✓ Acesso antecipado a novos recursos</li>
            </ul>
          </div>

          {/* Ranking */}
          <div>
            <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Top 5 do Ranking
            </h3>
            <div className="space-y-3">
              {[
                { pos: 1, nome: 'TechVendas Pro', score: 98, selo: 'Platina' },
                { pos: 2, nome: 'Digital Masters', score: 96, selo: 'Platina' },
                { pos: 3, nome: 'Você', score: 94, selo: 'Ouro', destaque: true },
                { pos: 4, nome: 'InfoProducts Hub', score: 92, selo: 'Ouro' },
                { pos: 5, nome: 'EduTech Solutions', score: 90, selo: 'Ouro' },
              ].map(item => (
                <div
                  key={item.pos}
                  className={`p-4 rounded-lg border flex items-center justify-between ${
                    item.destaque
                      ? darkMode
                        ? 'bg-[#39843e]/20 border-[#39843e]'
                        : 'bg-[#39843e]/10 border-[#39843e]'
                      : darkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.pos === 1
                        ? 'bg-yellow-500 text-white'
                        : item.pos === 2
                        ? 'bg-gray-400 text-white'
                        : item.pos === 3
                        ? 'bg-amber-600 text-white'
                        : darkMode
                        ? 'bg-gray-600 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}>
                      {item.pos}
                    </div>
                    <div>
                      <div className={darkMode ? 'text-white' : 'text-gray-900'}>
                        {item.nome}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Selo {item.selo}
                      </div>
                    </div>
                  </div>
                  <div className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
