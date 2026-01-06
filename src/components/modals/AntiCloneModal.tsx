import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Search, AlertTriangle, Shield, CheckCircle, FileText, ExternalLink, Hash } from 'lucide-react';

interface AntiCloneModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const produtosMonitorados = [
  { 
    id: 'PRD-001', 
    nome: 'Curso Marketing Digital Pro',
    hash: '0x7a8f...3c21',
    cadastro: '15/11/2024',
    clones: 3,
    status: 'protegido',
    ultimoClone: '02/01/2025'
  },
  { 
    id: 'PRD-002', 
    nome: 'eBook Growth Hacking 2025',
    hash: '0x9b2e...4d32',
    cadastro: '20/11/2024',
    clones: 1,
    status: 'protegido',
    ultimoClone: '28/12/2024'
  },
  { 
    id: 'PRD-003', 
    nome: 'Template Pack Design',
    hash: '0x3c1f...8a54',
    cadastro: '01/12/2024',
    clones: 0,
    status: 'seguro',
    ultimoClone: '-'
  },
];

const clonesDetectados = [
  { 
    id: 'CLN-001', 
    produtoOriginal: 'Curso Marketing Digital Pro',
    urlClone: 'hotmart.com/fake-curso-123',
    plataforma: 'Hotmart',
    vendedor: 'Usuario_Fake_123',
    preco: 'R$ 47,00',
    dataDeteccao: '02/01/2025',
    status: 'ativo'
  },
  { 
    id: 'CLN-002', 
    produtoOriginal: 'Curso Marketing Digital Pro',
    urlClone: 'eduzz.com/produto-clone',
    plataforma: 'Eduzz',
    vendedor: 'GolpistaBR',
    preco: 'R$ 29,90',
    dataDeteccao: '01/01/2025',
    status: 'removido'
  },
  { 
    id: 'CLN-003', 
    produtoOriginal: 'eBook Growth Hacking 2025',
    urlClone: 'monetizze.com/ebook-fake',
    plataforma: 'Monetizze',
    vendedor: 'Pirata_Digital',
    preco: 'R$ 9,90',
    dataDeteccao: '28/12/2024',
    status: 'reportado'
  },
];

export default function AntiCloneModal({ onClose, darkMode = false }: AntiCloneModalProps) {
  const [clones, setClones] = useState(clonesDetectados);
  const [verificando, setVerificando] = useState(false);
  const [urlVerificar, setUrlVerificar] = useState('');

  const reportarClone = (id: string) => {
    setClones(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'reportado' } : c
    ));
  };

  const verificarURL = () => {
    if (!urlVerificar) return;
    setVerificando(true);
    setTimeout(() => {
      setVerificando(false);
      alert('URL verificada! Produto autêntico confirmado.');
      setUrlVerificar('');
    }, 2000);
  };

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
        <div className="bg-gradient-to-r from-rose-600 to-pink-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Copy className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Sistema Anti-Clone</h2>
                <p className="text-rose-200 text-sm">Detecte e combata cópias dos seus produtos</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Verificador de URL */}
          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Verificar Autenticidade
            </h3>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Cole a URL do produto suspeito..."
                value={urlVerificar}
                onChange={(e) => setUrlVerificar(e.target.value)}
                className={`flex-1 px-4 py-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button
                onClick={verificarURL}
                disabled={verificando || !urlVerificar}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  verificando || !urlVerificar
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-rose-600 hover:bg-rose-700 text-white'
                }`}
              >
                {verificando ? 'Verificando...' : 'Verificar'}
              </button>
            </div>
          </div>

          {/* Produtos Protegidos */}
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Seus Produtos Protegidos
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {produtosMonitorados.map(produto => (
              <div key={produto.id} className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    produto.status === 'seguro' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {produto.status === 'seguro' ? '✓ Seguro' : `⚠ ${produto.clones} clones`}
                  </div>
                  <Shield className={`w-5 h-5 ${produto.clones > 0 ? 'text-yellow-500' : 'text-green-500'}`} />
                </div>
                <h4 className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{produto.nome}</h4>
                <div className={`flex items-center gap-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Hash className="w-3 h-3" />
                  <span className="font-mono">{produto.hash}</span>
                </div>
                <div className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Cadastrado: {produto.cadastro}
                </div>
              </div>
            ))}
          </div>

          {/* Clones Detectados */}
          <h3 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Clones Detectados
          </h3>
          
          <div className="space-y-4">
            {clones.map(clone => (
              <motion.div
                key={clone.id}
                layout
                className={`p-4 rounded-xl border ${
                  clone.status === 'ativo'
                    ? darkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
                    : clone.status === 'reportado'
                    ? darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
                    : darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        clone.status === 'ativo' ? 'bg-red-600 text-white' :
                        clone.status === 'reportado' ? 'bg-yellow-500 text-white' :
                        'bg-green-600 text-white'
                      }`}>
                        {clone.status}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {clone.plataforma}
                      </span>
                    </div>

                    <div className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Clone de: {clone.produtoOriginal}
                    </div>

                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Vendedor: <span className="text-red-500 font-medium">{clone.vendedor}</span>
                    </div>
                    
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Preço falso: <span className="font-medium">{clone.preco}</span>
                    </div>

                    <div className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Detectado: {clone.dataDeteccao}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {clone.status === 'ativo' && (
                      <>
                        <button
                          onClick={() => reportarClone(clone.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                        >
                          <AlertTriangle className="w-4 h-4" />
                          Reportar
                        </button>
                        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                          darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}>
                          <FileText className="w-4 h-4" />
                          Gerar Prova
                        </button>
                      </>
                    )}
                    {clone.status === 'removido' && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Removido</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
