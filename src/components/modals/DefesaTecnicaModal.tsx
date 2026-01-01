import { useState } from 'react';
import { motion } from 'motion/react';
import { X, FileCheck, Download, Shield } from 'lucide-react';

interface DefesaTecnicaModalProps {
  onClose: () => void;
}

const disputasMock = [
  { id: 'DISP-001', produto: 'Curso Marketing Digital', status: 'aberta', data: '2025-12-07' },
  { id: 'DISP-002', produto: 'eBook Growth', status: 'em análise', data: '2025-12-05' }
];

export default function DefesaTecnicaModal({ onClose }: DefesaTecnicaModalProps) {
  const [selectedDisputa, setSelectedDisputa] = useState<string | null>(null);

  const handleGerarPacote = (disputaId: string) => {
    alert(`Gerando Pacote de Defesa para ${disputaId}...\n\nConteúdo:\n✓ Evidence Pack completo\n✓ Hash e assinatura digital\n✓ Timeline de eventos\n✓ Metadados do produto\n✓ Playbook de resposta\n✓ Documentação jurídica\n\nPacote gerado com sucesso!`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
      >
        <div className="sticky top-0 bg-[#416b44] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2>Defesa Técnica</h2>
            <p className="text-white/80 text-sm">Acesso rápido a Evidence Packs para disputas</p>
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
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-blue-900 mb-1">Defesa Técnica Automatizada</h4>
                <p className="text-sm text-blue-700">
                  A VeriGuard AI compila automaticamente todas as provas técnicas necessárias para sua defesa 
                  em disputas, incluindo hashes, timestamps, assinaturas digitais e playbooks de resposta.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[#416b44] mb-4">Disputas em Andamento</h3>
            <div className="space-y-3">
              {disputasMock.map(disputa => (
                <div
                  key={disputa.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#39843e] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-gray-900 mb-1">{disputa.id} - {disputa.produto}</h4>
                      <p className="text-sm text-gray-600">
                        Status: <span className="text-yellow-600">{disputa.status}</span> • Data: {disputa.data}
                      </p>
                    </div>
                    <button
                      onClick={() => handleGerarPacote(disputa.id)}
                      className="bg-[#39843e] hover:bg-[#416b44] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <FileCheck className="w-5 h-5" />
                      Gerar Pacote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-[#416b44] mb-4">Acesso Rápido aos Evidence Packs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-gray-900 mb-2">Todos os Evidence Packs</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Acesse e exporte todos os seus Evidence Packs para usar em defesa
                </p>
                <button className="text-[#39843e] hover:underline text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Exportar Todos
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-gray-900 mb-2">Playbook de Resposta</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Guia passo a passo para responder a disputas com base técnica
                </p>
                <button className="text-[#39843e] hover:underline text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Baixar Playbook
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-gray-900 mb-2">O que inclui o Pacote de Defesa?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ Evidence Pack completo com hash e assinatura digital</li>
              <li>✓ Timeline detalhada de todos os eventos</li>
              <li>✓ Metadados do produto original</li>
              <li>✓ Documentação de titularidade</li>
              <li>✓ Playbook de resposta customizado</li>
              <li>✓ Formato exportável (PDF + JSON) para uso jurídico</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
