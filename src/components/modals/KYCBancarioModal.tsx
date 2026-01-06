import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Fingerprint, CheckCircle, XCircle, Upload, Camera, FileText, AlertTriangle, User, Building } from 'lucide-react';

interface KYCBancarioModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const solicitacoesKYC = [
  { 
    id: 'KYC-001', 
    tipo: 'PF',
    nome: 'Carlos M****', 
    documento: 'CPF: ***.***.***-78',
    dataEnvio: '02/01/2025',
    status: 'pendente',
    documentos: ['RG Frente', 'RG Verso', 'Selfie', 'Comprovante'],
    score: 85,
    alertas: []
  },
  { 
    id: 'KYC-002', 
    tipo: 'PJ',
    nome: 'Tech Solutions LTDA', 
    documento: 'CNPJ: **.***.***/**-01',
    dataEnvio: '01/01/2025',
    status: 'analise',
    documentos: ['Contrato Social', 'CNPJ', 'Docs Sócios'],
    score: 62,
    alertas: ['Sócio com restrição', 'Endereço divergente']
  },
  { 
    id: 'KYC-003', 
    tipo: 'PF',
    nome: 'Ana P****', 
    documento: 'CPF: ***.***.***-90',
    dataEnvio: '31/12/2024',
    status: 'aprovado',
    documentos: ['CNH', 'Selfie', 'Comprovante'],
    score: 98,
    alertas: []
  },
  { 
    id: 'KYC-004', 
    tipo: 'PF',
    nome: 'Roberto S****', 
    documento: 'CPF: ***.***.***-12',
    dataEnvio: '30/12/2024',
    status: 'rejeitado',
    documentos: ['RG Frente', 'Selfie'],
    score: 25,
    alertas: ['Documento adulterado', 'Face não confere', 'CPF irregular']
  },
];

export default function KYCBancarioModal({ onClose, darkMode = false }: KYCBancarioModalProps) {
  const [solicitacoes, setSolicitacoes] = useState(solicitacoesKYC);
  const [filtro, setFiltro] = useState('todos');

  const aprovarKYC = (id: string) => {
    setSolicitacoes(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'aprovado' } : s
    ));
  };

  const rejeitarKYC = (id: string) => {
    setSolicitacoes(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'rejeitado' } : s
    ));
  };

  const filtradas = solicitacoes.filter(s => 
    filtro === 'todos' || s.status === filtro
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-5xl rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Fingerprint className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">KYC Bancário</h2>
                <p className="text-indigo-200 text-sm">Know Your Customer • Validação de Identidade</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Métricas */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                {solicitacoes.filter(s => s.status === 'pendente').length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-yellow-500' : 'text-yellow-700'}`}>Pendentes</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {solicitacoes.filter(s => s.status === 'analise').length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-blue-500' : 'text-blue-700'}`}>Em Análise</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {solicitacoes.filter(s => s.status === 'aprovado').length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-green-500' : 'text-green-700'}`}>Aprovados</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                {solicitacoes.filter(s => s.status === 'rejeitado').length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-red-500' : 'text-red-700'}`}>Rejeitados</div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 mb-6">
            {['todos', 'pendente', 'analise', 'aprovado', 'rejeitado'].map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filtro === f 
                    ? 'bg-indigo-600 text-white' 
                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Lista */}
          <div className="space-y-4">
            {filtradas.map(sol => (
              <motion.div
                key={sol.id}
                layout
                className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} shadow-sm`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      sol.tipo === 'PF' 
                        ? darkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                        : darkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                    }`}>
                      {sol.tipo === 'PF' ? (
                        <User className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      ) : (
                        <Building className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-mono text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{sol.id}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          sol.tipo === 'PF' 
                            ? darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                            : darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {sol.tipo}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          sol.status === 'aprovado' ? 'bg-green-500 text-white' :
                          sol.status === 'rejeitado' ? 'bg-red-500 text-white' :
                          sol.status === 'analise' ? 'bg-blue-500 text-white' :
                          'bg-yellow-500 text-white'
                        }`}>
                          {sol.status}
                        </span>
                      </div>
                      <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{sol.nome}</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{sol.documento}</div>
                      <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Enviado em: {sol.dataEnvio}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score IA</div>
                      <div className={`text-2xl font-bold ${
                        sol.score >= 80 ? 'text-green-500' : sol.score >= 50 ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {sol.score}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documentos */}
                <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Documentos enviados:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sol.documentos.map((doc, i) => (
                      <span key={i} className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <FileText className="w-3 h-3" />
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Alertas */}
                {sol.alertas.length > 0 && (
                  <div className={`mt-3 p-3 rounded-lg ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className={`text-sm font-medium ${darkMode ? 'text-red-400' : 'text-red-700'}`}>Alertas:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sol.alertas.map((alerta, i) => (
                        <span key={i} className="px-2 py-1 bg-red-500 text-white rounded text-xs">
                          {alerta}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ações */}
                {(sol.status === 'pendente' || sol.status === 'analise') && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => aprovarKYC(sol.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Aprovar
                    </button>
                    <button
                      onClick={() => rejeitarKYC(sol.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      Rejeitar
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
