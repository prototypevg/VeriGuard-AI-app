import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Shield, Search, AlertTriangle, Globe, ExternalLink, Ban, CheckCircle, Eye } from 'lucide-react';

interface ProtecaoMarcaModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const ameacasMarca = [
  { 
    id: 'BRD-001', 
    tipo: 'Perfil Falso',
    plataforma: 'Instagram',
    url: '@curso_fake_marketing',
    seguidores: '12.4K',
    risco: 95,
    status: 'ativo',
    deteccao: '02/01/2025',
    descricao: 'Perfil usando sua logo e vendendo curso falso'
  },
  { 
    id: 'BRD-002', 
    tipo: 'Site Clone',
    plataforma: 'Web',
    url: 'cursofake.com.br',
    seguidores: '-',
    risco: 98,
    status: 'reportado',
    deteccao: '01/01/2025',
    descricao: 'Site idêntico ao seu coletando dados de cartão'
  },
  { 
    id: 'BRD-003', 
    tipo: 'Anúncio Falso',
    plataforma: 'Facebook Ads',
    url: 'ad_id_28374',
    seguidores: '-',
    risco: 88,
    status: 'ativo',
    deteccao: '31/12/2024',
    descricao: 'Anúncio promovendo seu produto com preço falso'
  },
  { 
    id: 'BRD-004', 
    tipo: 'Grupo Pirata',
    plataforma: 'Telegram',
    url: 't.me/cursos_gratis',
    seguidores: '45.2K',
    risco: 75,
    status: 'removido',
    deteccao: '28/12/2024',
    descricao: 'Grupo distribuindo seu conteúdo gratuitamente'
  },
];

export default function ProtecaoMarcaModal({ onClose, darkMode = false }: ProtecaoMarcaModalProps) {
  const [ameacas, setAmeacas] = useState(ameacasMarca);
  const [escaneando, setEscaneando] = useState(false);

  const reportarAmeaca = (id: string) => {
    setAmeacas(prev => prev.map(a => 
      a.id === id ? { ...a, status: 'reportado' } : a
    ));
  };

  const iniciarEscaneamento = () => {
    setEscaneando(true);
    setTimeout(() => {
      setEscaneando(false);
      alert('Escaneamento completo! Nenhuma nova ameaça detectada.');
    }, 3000);
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
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Proteção de Marca</h2>
                <p className="text-amber-100 text-sm">Monitore e proteja sua identidade digital</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Ação Principal */}
          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-amber-900/20 border border-amber-700' : 'bg-amber-50 border border-amber-200'}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-amber-400' : 'text-amber-800'}`}>
                  Escaneamento de Ameaças
                </h3>
                <p className={`text-sm ${darkMode ? 'text-amber-500' : 'text-amber-700'}`}>
                  Busque por perfis falsos, sites clones e pirataria
                </p>
              </div>
              <button
                onClick={iniciarEscaneamento}
                disabled={escaneando}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  escaneando 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                <Search className={`w-5 h-5 ${escaneando ? 'animate-spin' : ''}`} />
                {escaneando ? 'Escaneando...' : 'Iniciar Escaneamento'}
              </button>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                {ameacas.filter(a => a.status === 'ativo').length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-red-500' : 'text-red-700'}`}>Ameaças Ativas</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                {ameacas.filter(a => a.status === 'reportado').length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-yellow-500' : 'text-yellow-700'}`}>Reportadas</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {ameacas.filter(a => a.status === 'removido').length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-green-500' : 'text-green-700'}`}>Removidas</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>24/7</div>
              <div className={`text-xs ${darkMode ? 'text-blue-500' : 'text-blue-700'}`}>Monitoramento</div>
            </div>
          </div>

          {/* Lista de Ameaças */}
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Ameaças Detectadas
          </h3>
          
          <div className="space-y-4">
            {ameacas.map(ameaca => (
              <motion.div
                key={ameaca.id}
                layout
                className={`p-4 rounded-xl border ${
                  ameaca.status === 'ativo'
                    ? darkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
                    : ameaca.status === 'reportado'
                    ? darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
                    : darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-mono text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{ameaca.id}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        ameaca.status === 'ativo' ? 'bg-red-600 text-white' :
                        ameaca.status === 'reportado' ? 'bg-yellow-500 text-white' :
                        'bg-green-600 text-white'
                      }`}>
                        {ameaca.status}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                        {ameaca.tipo}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <Globe className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{ameaca.plataforma}</span>
                      <span className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{ameaca.url}</span>
                    </div>

                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{ameaca.descricao}</p>
                    
                    <div className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Detectado em: {ameaca.deteccao}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Risco</div>
                      <div className={`text-2xl font-bold ${
                        ameaca.risco >= 90 ? 'text-red-500' : ameaca.risco >= 70 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {ameaca.risco}%
                      </div>
                    </div>

                    {ameaca.status === 'ativo' && (
                      <button
                        onClick={() => reportarAmeaca(ameaca.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        <Ban className="w-4 h-4" />
                        Reportar
                      </button>
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
