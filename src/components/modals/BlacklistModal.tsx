import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Ban, Search, AlertTriangle, Plus, Trash2, Globe, User, Building, Shield } from 'lucide-react';

interface BlacklistModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const listaBlacklist = [
  { 
    id: 'BL-001', 
    tipo: 'CPF',
    identificador: '***.***.***-12',
    nome: 'João Fraudador',
    motivo: 'Chargebacks fraudulentos (12x)',
    dataInclusao: '02/01/2025',
    origem: 'Automático'
  },
  { 
    id: 'BL-002', 
    tipo: 'CNPJ',
    identificador: '**.***.***/**-01',
    nome: 'Empresa Golpe LTDA',
    motivo: 'Documentos falsos no cadastro',
    dataInclusao: '01/01/2025',
    origem: 'Manual'
  },
  { 
    id: 'BL-003', 
    tipo: 'Email',
    identificador: 'fraud***@gmail.com',
    nome: '-',
    motivo: 'Múltiplas contas detectadas',
    dataInclusao: '28/12/2024',
    origem: 'Automático'
  },
  { 
    id: 'BL-004', 
    tipo: 'Telefone',
    identificador: '(11) 9****-1234',
    nome: '-',
    motivo: 'Usado em 15 golpes confirmados',
    dataInclusao: '25/12/2024',
    origem: 'Compartilhado'
  },
  { 
    id: 'BL-005', 
    tipo: 'IP',
    identificador: '192.168.***.**',
    nome: '-',
    motivo: 'Proxy/VPN suspeito - múltiplas fraudes',
    dataInclusao: '20/12/2024',
    origem: 'Automático'
  },
];

export default function BlacklistModal({ onClose, darkMode = false }: BlacklistModalProps) {
  const [blacklist, setBlacklist] = useState(listaBlacklist);
  const [busca, setBusca] = useState('');
  const [novoItem, setNovoItem] = useState({ tipo: 'CPF', identificador: '', motivo: '' });
  const [mostrarForm, setMostrarForm] = useState(false);

  const removerItem = (id: string) => {
    if (confirm('Tem certeza que deseja remover este item da blacklist?')) {
      setBlacklist(prev => prev.filter(item => item.id !== id));
    }
  };

  const adicionarItem = () => {
    if (!novoItem.identificador || !novoItem.motivo) {
      alert('Preencha todos os campos');
      return;
    }
    
    const novo = {
      id: `BL-${String(blacklist.length + 1).padStart(3, '0')}`,
      tipo: novoItem.tipo,
      identificador: novoItem.identificador,
      nome: '-',
      motivo: novoItem.motivo,
      dataInclusao: new Date().toLocaleDateString('pt-BR'),
      origem: 'Manual'
    };
    
    setBlacklist(prev => [novo, ...prev]);
    setNovoItem({ tipo: 'CPF', identificador: '', motivo: '' });
    setMostrarForm(false);
  };

  const filtrados = blacklist.filter(item =>
    item.identificador.toLowerCase().includes(busca.toLowerCase()) ||
    item.motivo.toLowerCase().includes(busca.toLowerCase()) ||
    item.tipo.toLowerCase().includes(busca.toLowerCase())
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
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <Ban className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Gestão de Blacklist</h2>
                <p className="text-gray-400 text-sm">Bloqueie fraudadores conhecidos automaticamente</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Estatísticas */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {['CPF', 'CNPJ', 'Email', 'Telefone', 'IP'].map(tipo => (
              <div key={tipo} className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {blacklist.filter(i => i.tipo === tipo).length}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tipo}s</div>
              </div>
            ))}
          </div>

          {/* Busca e Adicionar */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <Search className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Buscar na blacklist..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className={`flex-1 bg-transparent outline-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
              />
            </div>
            <button
              onClick={() => setMostrarForm(!mostrarForm)}
              className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Adicionar
            </button>
          </div>

          {/* Formulário de Adição */}
          {mostrarForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Adicionar à Blacklist</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={novoItem.tipo}
                  onChange={(e) => setNovoItem(prev => ({ ...prev, tipo: e.target.value }))}
                  className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                >
                  <option value="CPF">CPF</option>
                  <option value="CNPJ">CNPJ</option>
                  <option value="Email">Email</option>
                  <option value="Telefone">Telefone</option>
                  <option value="IP">IP</option>
                </select>
                <input
                  type="text"
                  placeholder="Identificador"
                  value={novoItem.identificador}
                  onChange={(e) => setNovoItem(prev => ({ ...prev, identificador: e.target.value }))}
                  className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300'}`}
                />
                <input
                  type="text"
                  placeholder="Motivo"
                  value={novoItem.motivo}
                  onChange={(e) => setNovoItem(prev => ({ ...prev, motivo: e.target.value }))}
                  className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={adicionarItem}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => setMostrarForm(false)}
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          )}

          {/* Lista */}
          <div className={`rounded-xl border overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tipo</th>
                  <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Identificador</th>
                  <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Motivo</th>
                  <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Data</th>
                  <th className={`text-left py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Origem</th>
                  <th className={`text-right py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map(item => (
                  <tr key={item.id} className={`border-t ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.tipo === 'CPF' ? 'bg-blue-100 text-blue-700' :
                        item.tipo === 'CNPJ' ? 'bg-purple-100 text-purple-700' :
                        item.tipo === 'Email' ? 'bg-green-100 text-green-700' :
                        item.tipo === 'Telefone' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.tipo}
                      </span>
                    </td>
                    <td className={`py-3 px-4 font-mono text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.identificador}</td>
                    <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.motivo}</td>
                    <td className={`py-3 px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.dataInclusao}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.origem === 'Automático' ? 'bg-blue-100 text-blue-700' :
                        item.origem === 'Compartilhado' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.origem}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => removerItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
