import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

const faqs = [
  {
    id: 1,
    pergunta: 'O que é o Evidence Pack?',
    resposta: 'Evidence Pack é um pacote técnico e jurídico gerado pela VeriGuard AI que contém hash, timestamp, assinatura digital e metadados do evento (cadastro, validação ou análise). Ele serve como prova rastreável em disputas e auditorias.'
  },
  {
    id: 2,
    pergunta: 'Como a IA aprende e melhora com o tempo?',
    resposta: 'A IA usa autoaprendizado contínuo, aprendizado supervisionado com dados rotulados e aprendizado por reforço para otimizar decisões. Decisões humanas (revisões) alimentam o re-treinamento. Modelos são versionados e promovidos após validação.'
  },
  {
    id: 3,
    pergunta: 'O que acontece quando há um falso positivo?',
    resposta: 'Casos com baixa confiança são encaminhados para revisão humana; analistas podem marcar a decisão e adicionar nota. Essas correções entram no pipeline de re-treinamento. O sistema também recomenda ajustes de sensibilidade e permite rollback de thresholds.'
  },
  {
    id: 4,
    pergunta: 'Como o score de risco é calculado?',
    resposta: 'O score é uma combinação de modelos que consideram variáveis como valor, velocity, device fingerprint, IP reputation, histórico do usuário, método de pagamento, metadados do produto e sinais externos. O resultado é calibrado para um score 0–100 e acompanhado por nível de confiança.'
  },
  {
    id: 5,
    pergunta: 'Posso ajustar a sensibilidade do sistema?',
    resposta: 'Sim. No painel de sensibilidade você ajusta thresholds globais, pesos de grupos de features e escolhe presets (agressivo/balanceado/conservador). Testes em sandbox são recomendados antes de aplicar em produção.'
  },
  {
    id: 6,
    pergunta: 'O que são playbooks e posso editá-los?',
    resposta: 'Playbooks são sequências automatizadas de ações (bloquear, notificar, abrir ticket). Eles são editáveis via editor visual e podem ser testados em sandbox. Regras customizadas podem ser criadas pelo cliente.'
  },
  {
    id: 7,
    pergunta: 'Como funciona a exclusão de dados?',
    resposta: 'Ao solicitar exclusão, o sistema faz soft-delete imediato, inicia anonimização e, após cumprir retenções legais, executa hard-delete. Evidence Packs sujeitos a obrigações legais podem ser preservados ou pseudonimizados; o painel de privacidade mostra o status da solicitação.'
  },
  {
    id: 8,
    pergunta: 'Como é o consentimento e a revogação?',
    resposta: 'Consentimentos são capturados de forma granular e versionados. A revogação é aplicada prospectivamente; dados já processados podem permanecer para fins legais, mas não serão usados para novos treinamentos se o usuário revogar.'
  },
  {
    id: 9,
    pergunta: 'Posso ver quem acessou ou exportou um Evidence Pack?',
    resposta: 'Sim. O painel de auditoria mostra logs imutáveis com usuário, ação, timestamp e IP. Exports e compartilhamentos geram entradas de log e podem disparar alertas.'
  },
  {
    id: 10,
    pergunta: 'O app terá notificações em tempo real e biometria?',
    resposta: 'Sim — push notifications em tempo real serão suportadas em apps nativos (APNs/FCM). Biometria (TouchID/FaceID/Android Biometric) será suportada em apps nativos para autenticação. No protótipo web, notificações podem ser simuladas via WebSocket.'
  },
  {
    id: 11,
    pergunta: 'Onde meus dados ficam armazenados?',
    resposta: 'Dados são armazenados em MongoDB replicado, objetos em repositório seguro, com criptografia AES-256 e chaves em HSM/KMS; deploys podem ser em VPC dedicada e em região escolhida pelo cliente para atender requisitos regulatórios.'
  },
  {
    id: 12,
    pergunta: 'Como funciona o suporte e SLA?',
    resposta: 'Integração com Zendesk/Freshdesk ou painel interno; SLAs variam por plano (Starter/Pro/Enterprise). Tickets são vinculados a Evidence Packs e logs.'
  }
];

export default function HelpModal({ onClose }: HelpModalProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [busca, setBusca] = useState('');

  const faqsFiltrados = faqs.filter(faq =>
    faq.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
    faq.resposta.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="sticky top-0 bg-[#416b44] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2>Central de Ajuda</h2>
            <p className="text-white/80 text-sm">Perguntas frequentes sobre a VeriGuard AI</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por pergunta ou palavra-chave..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39843e]"
          />
        </div>

        <div className="flex-1 overflow-auto px-6 pb-6">
          <div className="space-y-3">
            {faqsFiltrados.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#39843e] flex-shrink-0" />
                    <span className="text-gray-900">{faq.pergunta}</span>
                  </div>
                  {expandedId === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {expandedId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{faq.resposta}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {faqsFiltrados.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhuma pergunta encontrada para sua busca.</p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-[#416b44] mb-4">Ainda precisa de ajuda?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-gray-900 mb-2">Suporte por E-mail</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Entre em contato com nossa equipe de suporte
                </p>
                <a
                  href="mailto:contatoveriguard@gmail.com"
                  className="text-sm text-[#39843e] hover:underline"
                >
                  contatoveriguard@gmail.com
                </a>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-gray-900 mb-2">Documentação Técnica</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Acesse nossa documentação completa da API
                </p>
                <button className="text-sm text-[#39843e] hover:underline">
                  Ver documentação →
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}