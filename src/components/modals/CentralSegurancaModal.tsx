import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Shield, Smartphone, Globe, MapPin, AlertTriangle, CheckCircle, Truck, PackageCheck, Lock } from 'lucide-react';
import { analisarSegurancaContaIA } from '../../utils/aiLogic';

interface CentralSegurancaModalProps {
  onClose: () => void;
}

export default function CentralSegurancaModal({ onClose }: CentralSegurancaModalProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simula tempo de varredura do sistema
    setTimeout(() => {
      setData(analisarSegurancaContaIA());
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#1e293b] text-white p-6 rounded-t-2xl flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Central de Segurança da Conta</h2>
              <p className="text-xs text-gray-400">Monitoramento em Tempo Real (24/7)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 bg-gray-50 min-h-[500px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
              />
              <p className="text-gray-600 font-medium">Varrendo dispositivos e logs de acesso...</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Status Geral */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Status de Proteção</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl font-black text-gray-900">{data.status}</span>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Última varredura: Agora mesmo</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-[#39843e]">{data.scoreSeguranca}%</div>
                  <p className="text-xs text-gray-500">Score de Integridade</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Seção 1: Invasão de Conta (Account Takeover) */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4 pb-2 border-b">
                    <Lock className="w-5 h-5 text-blue-600" />
                    Dispositivos e Acessos
                  </h3>
                  
                  <div className="space-y-4">
                    {data.dispositivos.map((dev: any, idx: number) => (
                      <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${dev.status === 'Bloqueado' ? 'bg-red-50 border border-red-100' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-3">
                          {dev.nome.includes('iPhone') || dev.nome.includes('PC') ? <Smartphone className="w-5 h-5 text-gray-500" /> : <Globe className="w-5 h-5 text-gray-500" />}
                          <div>
                            <p className="font-medium text-sm text-gray-900">{dev.nome}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" /> {dev.local} • {dev.ip}
                            </div>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          dev.status === 'Bloqueado' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                        }`}>
                          {dev.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {data.tentativasBloqueadas > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-yellow-800">Tentativa de Invasão Bloqueada</p>
                        <p className="text-xs text-yellow-700">Identificamos e bloqueamos 1 tentativa de login suspeita da Rússia nas últimas 24h.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Seção 2: Anti-Dropshipping & Logística */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4 pb-2 border-b">
                    <Truck className="w-5 h-5 text-orange-600" />
                    Validação Logística (Anti-Golpe)
                  </h3>

                  <div className="flex flex-col items-center justify-center py-4 mb-4">
                     <div className="relative w-32 h-32">
                       <svg className="w-full h-full" viewBox="0 0 36 36">
                         <path
                           className="text-gray-200"
                           d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="3"
                         />
                         <path
                           className="text-green-500"
                           strokeDasharray={`${data.analiseLogistica.scoreEntrega}, 100`}
                           d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="3"
                         />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center flex-col">
                         <span className="text-3xl font-bold text-gray-800">{data.analiseLogistica.scoreEntrega}</span>
                         <span className="text-[10px] uppercase text-gray-500">Score Logístico</span>
                       </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Modelo Operacional:</span>
                      <span className="font-medium text-green-700">{data.analiseLogistica.status}</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Pedidos sem Rastreio:</span>
                      <span className="font-medium text-gray-900">{data.analiseLogistica.pedidosSemRastreio}% (Excelente)</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                    <PackageCheck className="w-5 h-5 text-blue-600 shrink-0" />
                    <p className="text-xs text-blue-800">
                      Sua conta não apresenta indícios de <strong>Dropshipping sem Envio</strong>. Isso aumenta sua relevância nos marketplaces.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
