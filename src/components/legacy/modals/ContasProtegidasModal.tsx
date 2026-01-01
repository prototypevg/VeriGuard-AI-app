import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Shield, CheckCircle } from 'lucide-react';

interface ContasProtegidasModalProps {
  onClose: () => void;
}

const contasMock = [
  { id: 'CONTA-001', titular: 'João Silva Santos', cpf: '***.***.123-45', status: 'protegida', acoesAutomaticas: 'Bloqueio de transações acima de R$ 10.000', dataProtecao: '2025-12-01' },
  { id: 'CONTA-002', titular: 'Maria Oliveira Costa', cpf: '***.***.678-90', status: 'protegida', acoesAutomaticas: 'Verificação 2FA obrigatória', dataProtecao: '2025-12-03' },
  { id: 'CONTA-003', titular: 'Carlos Eduardo Lima', cpf: '***.***.456-12', status: 'monitorada', acoesAutomaticas: 'Alerta para novas transações', dataProtecao: '2025-12-05' }
];

export default function ContasProtegidasModal({ onClose }: ContasProtegidasModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
      >
        <div className="sticky top-0 bg-[#416b44] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2>Contas Protegidas</h2>
            <p className="text-white/80 text-sm">Monitoramento e ações automáticas aplicadas</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="text-green-900 mb-1">Proteção Proativa</h4>
                <p className="text-sm text-green-700">
                  Estas contas estão sob monitoramento contínuo da VeriGuard AI. Ações automáticas foram 
                  aplicadas para prevenir fraudes e proteger os titulares contra invasões e transações suspeitas.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl text-[#39843e] mb-2">2.384</div>
              <p className="text-sm text-gray-600">Contas Protegidas</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl text-[#416b44] mb-2">146</div>
              <p className="text-sm text-gray-600">Tentativas Bloqueadas (última semana)</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl text-green-600 mb-2">99.8%</div>
              <p className="text-sm text-gray-600">Taxa de Proteção</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600">ID</th>
                  <th className="text-left py-3 px-4 text-gray-600">Titular</th>
                  <th className="text-left py-3 px-4 text-gray-600">CPF</th>
                  <th className="text-left py-3 px-4 text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-gray-600">Ações Automáticas</th>
                  <th className="text-left py-3 px-4 text-gray-600">Data Proteção</th>
                  <th className="text-right py-3 px-4 text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {contasMock.map(conta => (
                  <tr key={conta.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{conta.id}</td>
                    <td className="py-3 px-4">{conta.titular}</td>
                    <td className="py-3 px-4">{conta.cpf}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                        conta.status === 'protegida' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        <CheckCircle className="w-3 h-3" />
                        {conta.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-gray-600">{conta.acoesAutomaticas}</p>
                    </td>
                    <td className="py-3 px-4">{conta.dataProtecao}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-[#39843e] hover:underline text-sm mr-3">
                        Ver Detalhes
                      </button>
                      <button className="text-[#39843e] hover:underline text-sm">
                        Histórico
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-gray-900 mb-2">Tipos de Proteção Automática</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ Bloqueio de transações acima de limites customizados</li>
              <li>✓ Verificação 2FA obrigatória para operações sensíveis</li>
              <li>✓ Alertas em tempo real para novas tentativas de acesso</li>
              <li>✓ Bloqueio de dispositivos não reconhecidos</li>
              <li>✓ Restrição de IPs suspeitos ou de alto risco</li>
              <li>✓ Monitoramento contínuo com score de risco</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
