import { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle, XCircle, Code, Play, Settings as SettingsIcon } from 'lucide-react';

interface IntegracoesModalProps {
  onClose: () => void;
  perfil: 'vendedores' | 'marketplaces' | 'bancos';
}

export default function IntegracoesModal({ onClose, perfil }: IntegracoesModalProps) {
  const integracoesVendedores = [
    { id: 'hotmart', nome: 'Hotmart', status: 'ativa', ultimaSync: '2025-12-08 14:30' },
    { id: 'eduzz', nome: 'Eduzz', status: 'ativa', ultimaSync: '2025-12-08 13:15' },
    { id: 'monetizze', nome: 'Monetizze', status: 'inativa', ultimaSync: '-' },
    { id: 'shopify', nome: 'Shopify', status: 'ativa', ultimaSync: '2025-12-08 14:00' },
    { id: 'woocommerce', nome: 'WooCommerce', status: 'inativa', ultimaSync: '-' }
  ];

  const integracoesMarketplaces = [
    { id: 'mercadolivre', nome: 'Mercado Livre', status: 'ativa', ultimaSync: '2025-12-08 14:25' },
    { id: 'amazon', nome: 'Amazon', status: 'ativa', ultimaSync: '2025-12-08 14:10' },
    { id: 'olx', nome: 'OLX', status: 'inativa', ultimaSync: '-' },
    { id: 'api-custom', nome: 'API Customizada', status: 'ativa', ultimaSync: '2025-12-08 14:30' }
  ];

  const integracoesBancos = [
    { id: 'bacen', nome: 'Bacen/PIX', status: 'ativa', ultimaSync: '2025-12-08 14:32' },
    { id: 'swift', nome: 'Swift Network', status: 'ativa', ultimaSync: '2025-12-08 14:28' },
    { id: 'stripe', nome: 'Stripe', status: 'ativa', ultimaSync: '2025-12-08 14:20' },
    { id: 'cielo', nome: 'Cielo Gateway', status: 'inativa', ultimaSync: '-' },
    { id: 'siem', nome: 'SIEM Interno', status: 'ativa', ultimaSync: '2025-12-08 14:30' }
  ];

  const integracoes = 
    perfil === 'vendedores' ? integracoesVendedores :
    perfil === 'marketplaces' ? integracoesMarketplaces :
    integracoesBancos;

  const handleTestar = (id: string) => {
    alert(`Testando integração ${id}...\n\n✓ Conexão estabelecida\n✓ Autenticação OK\n✓ API respondendo\n✓ Sincronização funcionando\n\nIntegração funcionando perfeitamente!`);
  };

  const handleConfigurar = (id: string) => {
    alert(`Configurando integração ${id}...\n\nOpções disponíveis:\n• URL/Endpoint\n• Chave de API\n• Webhook\n• Frequência de sincronização\n• Mapeamento de campos\n\nUse o painel de configurações para ajustar.`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto"
      >
        <div className="sticky top-0 bg-[#416b44] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2>Integrações</h2>
            <p className="text-white/80 text-sm">Conecte com marketplaces, ERPs e sistemas via API</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Code className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-blue-900 mb-1">API REST da VeriGuard AI</h4>
                <p className="text-sm text-blue-700 mb-2">
                  Integre a VeriGuard AI em seus sistemas usando nossa API RESTful. 
                  Documentação completa disponível com endpoints para verificação de titularidade, 
                  sincronização de status e envio de Evidence Packs.
                </p>
                <button className="text-sm text-blue-700 hover:underline">
                  Ver documentação da API →
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[#416b44] mb-4">Integrações Disponíveis</h3>
            <div className="space-y-3">
              {integracoes.map(integracao => (
                <div
                  key={integracao.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#39843e] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        integracao.status === 'ativa' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <div>
                        <h4 className="text-gray-900 mb-1">{integracao.nome}</h4>
                        <p className="text-sm text-gray-600">
                          Status: <span className={integracao.status === 'ativa' ? 'text-green-600' : 'text-gray-500'}>
                            {integracao.status}
                          </span>
                          {integracao.ultimaSync !== '-' && (
                            <> • Última sincronização: {integracao.ultimaSync}</>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTestar(integracao.id)}
                        className="text-sm text-[#39843e] hover:underline flex items-center gap-1"
                      >
                        <Play className="w-4 h-4" />
                        Testar
                      </button>
                      <button
                        onClick={() => handleConfigurar(integracao.id)}
                        className="text-sm text-[#39843e] hover:underline flex items-center gap-1"
                      >
                        <SettingsIcon className="w-4 h-4" />
                        Configurar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#416b44] mb-4">Logs de Sincronização</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-48 overflow-auto">
              <div className="space-y-2 text-sm font-mono">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-gray-700">[2025-12-08 14:32:15] Sincronização com Bacen/PIX: 142 transações processadas</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-gray-700">[2025-12-08 14:30:42] API Customizada: Evidence Pack EP-001 enviado</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-gray-700">[2025-12-08 14:28:33] Swift Network: Status de 3 contas atualizado</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-gray-700">[2025-12-08 14:25:18] Hotmart: 12 produtos validados</span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                  <span className="text-gray-700">[2025-12-08 13:45:22] WooCommerce: Falha na autenticação - verificar credenciais</span>
                </div>
              </div>
            </div>
          </div>

          {perfil === 'bancos' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-green-900 mb-2">Endpoints para Reguladores</h4>
              <p className="text-sm text-green-700 mb-3">
                Endpoints especiais para envio automático de Evidence Packs e relatórios para órgãos reguladores:
              </p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• <code className="bg-green-100 px-2 py-0.5 rounded">POST /api/regulators/evidence-pack</code></li>
                <li>• <code className="bg-green-100 px-2 py-0.5 rounded">GET /api/regulators/reports</code></li>
                <li>• <code className="bg-green-100 px-2 py-0.5 rounded">POST /api/regulators/alert</code></li>
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-gray-900 mb-2">Webhooks</h4>
              <p className="text-sm text-gray-600 mb-3">
                Configure webhooks para receber notificações em tempo real sobre eventos importantes
              </p>
              <button className="text-sm text-[#39843e] hover:underline">
                Gerenciar webhooks →
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-gray-900 mb-2">Chaves de API</h4>
              <p className="text-sm text-gray-600 mb-3">
                Gerencie suas chaves de API e tokens de autenticação
              </p>
              <button className="text-sm text-[#39843e] hover:underline">
                Ver chaves →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
