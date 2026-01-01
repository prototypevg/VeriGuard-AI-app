import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, AlertTriangle, Shield, CheckCircle, Activity } from 'lucide-react';

interface SimulacaoAtaqueModalProps {
  onClose: () => void;
  darkMode: boolean;
  perfil: 'vendedores' | 'marketplaces' | 'bancos';
}

export default function SimulacaoAtaqueModal({ onClose, darkMode, perfil }: SimulacaoAtaqueModalProps) {
  const [simulando, setSimulando] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [concluido, setConcluido] = useState(false);

  const cenariosPerfil = {
    vendedores: [
      { etapa: 'Tentativa de cadastro de produto clonado', tipo: 'fraude', detectado: true },
      { etapa: 'Verificação de titularidade em base de dados', tipo: 'analise', detectado: true },
      { etapa: 'IA detectou hash idêntico a produto existente', tipo: 'alerta', detectado: true },
      { etapa: 'Bloqueio automático aplicado', tipo: 'acao', detectado: true },
      { etapa: 'Evidence Pack de bloqueio gerado', tipo: 'sucesso', detectado: true },
    ],
    marketplaces: [
      { etapa: 'Vendedor tenta cadastrar produto suspeito', tipo: 'fraude', detectado: true },
      { etapa: 'Sistema analisa histórico do vendedor', tipo: 'analise', detectado: true },
      { etapa: 'Múltiplas tentativas de upload detectadas', tipo: 'alerta', detectado: true },
      { etapa: 'Score de risco calculado: 95/100', tipo: 'alerta', detectado: true },
      { etapa: 'Produto bloqueado e vendedor notificado', tipo: 'acao', detectado: true },
      { etapa: 'Alerta enviado para administradores', tipo: 'sucesso', detectado: true },
    ],
    bancos: [
      { etapa: 'Transação suspeita de R$ 50.000 detectada', tipo: 'fraude', detectado: true },
      { etapa: 'Análise de device fingerprint e IP', tipo: 'analise', detectado: true },
      { etapa: 'Dispositivo não reconhecido + IP de alto risco', tipo: 'alerta', detectado: true },
      { etapa: 'Velocity check: 5 tentativas em 2 minutos', tipo: 'alerta', detectado: true },
      { etapa: 'Score de risco: 92/100 - ALTO RISCO', tipo: 'alerta', detectado: true },
      { etapa: 'Transação bloqueada automaticamente', tipo: 'acao', detectado: true },
      { etapa: 'Conta protegida e titular notificado', tipo: 'sucesso', detectado: true },
    ]
  };

  const cenarios = cenariosPerfil[perfil];

  const iniciarSimulacao = () => {
    setSimulando(true);
    setConcluido(false);
    setEtapaAtual(0);

    let etapa = 0;
    const intervalo = setInterval(() => {
      etapa++;
      setEtapaAtual(etapa);

      if (etapa >= cenarios.length) {
        clearInterval(intervalo);
        setTimeout(() => {
          setConcluido(true);
          setSimulando(false);
        }, 500);
      }
    }, 1500);
  };

  const getIconeEtapa = (tipo: string) => {
    switch (tipo) {
      case 'fraude': return AlertTriangle;
      case 'analise': return Activity;
      case 'alerta': return AlertTriangle;
      case 'acao': return Shield;
      case 'sucesso': return CheckCircle;
      default: return Activity;
    }
  };

  const getCorEtapa = (tipo: string) => {
    switch (tipo) {
      case 'fraude': return 'text-red-500';
      case 'analise': return 'text-blue-500';
      case 'alerta': return 'text-yellow-500';
      case 'acao': return 'text-purple-500';
      case 'sucesso': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2>Simulação de Ataque/Fraude</h2>
            <p className="text-white/80 text-sm">Teste o sistema de defesa da VeriGuard AI</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {!simulando && !concluido && (
            <div className="text-center space-y-6">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                darkMode ? 'bg-red-900/20' : 'bg-red-100'
              }`}>
                <Shield className="w-10 h-10 text-red-600" />
              </div>
              
              <div>
                <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Pronto para Testar a Segurança?
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Esta simulação irá criar um cenário falso de {perfil === 'vendedores' ? 'produto clonado' : perfil === 'marketplaces' ? 'vendedor fraudulento' : 'transação suspeita'} 
                  para demonstrar como a IA da VeriGuard reage e protege seu sistema em tempo real.
                </p>
              </div>

              <button
                onClick={iniciarSimulacao}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors flex items-center gap-2 mx-auto"
              >
                <Play className="w-5 h-5" />
                Iniciar Simulação
              </button>

              <div className={`p-4 rounded-lg border ${
                darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <p className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>
                  ⚠️ Esta é uma simulação segura. Nenhum dado real será afetado.
                </p>
              </div>
            </div>
          )}

          {simulando && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className={darkMode ? 'text-white' : 'text-gray-900'}>
                  Simulação em Andamento...
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Live
                  </span>
                </div>
              </div>

              {cenarios.map((cenario, index) => {
                const Icone = getIconeEtapa(cenario.tipo);
                const ativo = index < etapaAtual;
                const atual = index === etapaAtual - 1;

                return (
                  <AnimatePresence key={index}>
                    {ativo && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 rounded-lg border ${
                          atual
                            ? darkMode
                              ? 'bg-[#39843e]/20 border-[#39843e] shadow-lg'
                              : 'bg-[#39843e]/10 border-[#39843e] shadow-lg'
                            : darkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Icone className={`w-5 h-5 mt-0.5 ${getCorEtapa(cenario.tipo)}`} />
                          <div className="flex-1">
                            <div className={darkMode ? 'text-white' : 'text-gray-900'}>
                              {cenario.etapa}
                            </div>
                            {cenario.detectado && (
                              <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                                <CheckCircle className="w-3 h-3" />
                                Detectado e bloqueado
                              </div>
                            )}
                          </div>
                          {atual && (
                            <div className="flex gap-1">
                              <div className="w-1.5 h-1.5 bg-[#39843e] rounded-full animate-bounce"></div>
                              <div className="w-1.5 h-1.5 bg-[#39843e] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-1.5 h-1.5 bg-[#39843e] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                );
              })}
            </div>
          )}

          {concluido && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                darkMode ? 'bg-green-900/20' : 'bg-green-100'
              }`}>
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              <div>
                <h3 className={`text-2xl mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Simulação Concluída com Sucesso!
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  A VeriGuard AI detectou e bloqueou todas as tentativas de fraude em tempo real.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className={`text-2xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    100%
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Taxa de Detecção
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className={`text-2xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    &lt; 2s
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tempo de Resposta
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className={`text-2xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    0
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Falsos Positivos
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setConcluido(false);
                  setEtapaAtual(0);
                }}
                className="bg-[#39843e] hover:bg-[#416b44] text-white px-6 py-2 rounded-lg transition-colors"
              >
                Executar Nova Simulação
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}