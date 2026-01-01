import { useState } from 'react';
import { motion } from 'motion/react';
import { X, XCircle, AlertTriangle } from 'lucide-react';

interface ItensBloqueadosModalProps {
  onClose: () => void;
}

const itensBloqueadosMock = [
  { id: 'BL-001', produto: 'Plugin SEO Pro (cópia)', vendedor: 'Carlos Souza', motivo: 'Violação de titularidade detectada pela IA', data: '2025-12-06' },
  { id: 'BL-002', produto: 'Curso React Clonado', vendedor: 'Pedro Lima', motivo: 'Produto idêntico a outro cadastrado', data: '2025-12-05' },
  { id: 'BL-003', produto: 'Template Premium Pirata', vendedor: 'Ana Santos', motivo: 'Conteúdo protegido por direitos autorais', data: '2025-12-03' }
];

export default function ItensBloqueadosModal({ onClose }: ItensBloqueadosModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto"
      >
        <div className="sticky top-0 bg-[#416b44] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2>Itens Bloqueados</h2>
            <p className="text-white/80 text-sm">Produtos barrados pela IA antifraude</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="text-red-900 mb-1">Proteção Automática</h4>
                <p className="text-sm text-red-700">
                  Estes produtos foram bloqueados automaticamente pela IA da VeriGuard após detectar 
                  violações de titularidade, cópias não autorizadas ou outros sinais de fraude.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600">ID</th>
                  <th className="text-left py-3 px-4 text-gray-600">Produto</th>
                  <th className="text-left py-3 px-4 text-gray-600">Vendedor</th>
                  <th className="text-left py-3 px-4 text-gray-600">Motivo</th>
                  <th className="text-left py-3 px-4 text-gray-600">Data</th>
                  <th className="text-right py-3 px-4 text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {itensBloqueadosMock.map(item => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        {item.id}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.produto}</td>
                    <td className="py-3 px-4">{item.vendedor}</td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-600">{item.motivo}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{item.data}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-[#39843e] hover:underline text-sm mr-3">
                        Ver Evidências
                      </button>
                      <button className="text-red-500 hover:underline text-sm">
                        Remover Definitivamente
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl text-red-500 mb-2">28</div>
              <p className="text-sm text-gray-600">Total de Itens Bloqueados</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl text-[#39843e] mb-2">94%</div>
              <p className="text-sm text-gray-600">Precisão da IA</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl text-[#416b44] mb-2">R$ 142k</div>
              <p className="text-sm text-gray-600">Perdas Evitadas</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
