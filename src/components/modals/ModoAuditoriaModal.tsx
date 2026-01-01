import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Activity, Eye, FileText, Clock, User, AlertTriangle } from 'lucide-react';

interface ModoAuditoriaModalProps {
  onClose: () => void;
  darkMode: boolean;
}

interface LogEntry {
  id: number;
  timestamp: string;
  usuario: string;
  acao: string;
  detalhes: string;
  tipo: 'info' | 'warning' | 'error' | 'success';
}

export default function ModoAuditoriaModal({ onClose, darkMode }: ModoAuditoriaModalProps) {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, timestamp: '14:32:45', usuario: 'Sistema', acao: 'EVIDENCE_PACK_GERADO', detalhes: 'EP-001 criado com sucesso', tipo: 'success' },
    { id: 2, timestamp: '14:32:18', usuario: 'admin@veriguard.ai', acao: 'EXPORT_RELATORIO', detalhes: 'Relatório mensal exportado', tipo: 'info' },
    { id: 3, timestamp: '14:31:52', usuario: 'Sistema IA', acao: 'FRAUDE_DETECTADA', detalhes: 'Score 92 - Transação TX-8821 bloqueada', tipo: 'error' },
    { id: 4, timestamp: '14:31:30', usuario: 'vendedor@example.com', acao: 'PRODUTO_VALIDADO', detalhes: 'Produto PROD-125 autenticado', tipo: 'success' },
    { id: 5, timestamp: '14:31:05', usuario: 'Sistema', acao: 'INTEGRACAO_SYNC', detalhes: 'Hotmart: 12 produtos sincronizados', tipo: 'info' },
  ]);

  const [filtroTipo, setFiltroTipo] = useState<string>('todos');

  useEffect(() => {
    const intervalo = setInterval(() => {
      const novoLog: LogEntry = {
        id: logs.length + 1,
        timestamp: new Date().toLocaleTimeString('pt-BR'),
        usuario: ['Sistema', 'Sistema IA', 'admin@veriguard.ai'][Math.floor(Math.random() * 3)],
        acao: ['API_CALL', 'AUTENTICACAO', 'VALIDACAO', 'SYNC_DADOS'][Math.floor(Math.random() * 4)],
        detalhes: 'Operação executada com sucesso',
        tipo: ['info', 'success', 'warning'][Math.floor(Math.random() * 3)] as any
      };

      setLogs(prev => [novoLog, ...prev].slice(0, 50));
    }, 3000);

    return () => clearInterval(intervalo);
  }, [logs.length]);

  const logsFiltrados = filtroTipo === 'todos' 
    ? logs 
    : logs.filter(log => log.tipo === filtroTipo);

  const getCorTipo = (tipo: string) => {
    switch (tipo) {
      case 'success': return 'text-green-500';
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      default: return darkMode ? 'text-blue-400' : 'text-blue-600';
    }
  };

  const getIconeTipo = (tipo: string) => {
    switch (tipo) {
      case 'error': return AlertTriangle;
      case 'warning': return AlertTriangle;
      default: return Activity;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl max-w-6xl w-full h-[90vh] flex flex-col ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <div className={`p-6 border-b flex items-center justify-between ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <Eye className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            </div>
            <div>
              <h2 className={darkMode ? 'text-white' : 'text-gray-900'}>
                Modo Auditoria - Console de Segurança
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Monitoramento em tempo real de todas as operações
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Live
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
          >
            <X className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
          </button>
        </div>

        {/* Stats */}
        <div className={`p-4 border-b grid grid-cols-4 gap-4 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total de Eventos
            </div>
            <div className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {logs.length}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Usuários Ativos
            </div>
            <div className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              24
            </div>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              APIs/min
            </div>
            <div className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              1,847
            </div>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Alertas Críticos
            </div>
            <div className="text-xl text-red-500">
              3
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className={`p-4 border-b flex gap-2 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'success', label: 'Sucesso' },
            { id: 'info', label: 'Info' },
            { id: 'warning', label: 'Avisos' },
            { id: 'error', label: 'Erros' }
          ].map(filtro => (
            <button
              key={filtro.id}
              onClick={() => setFiltroTipo(filtro.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filtroTipo === filtro.id
                  ? 'bg-[#39843e] text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filtro.label}
            </button>
          ))}
        </div>

        {/* Logs */}
        <div className={`flex-1 overflow-y-auto font-mono text-sm ${
          darkMode ? 'bg-black' : 'bg-gray-50'
        }`}>
          <div className="p-4 space-y-1">
            {logsFiltrados.map((log) => {
              const Icone = getIconeTipo(log.tipo);
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start gap-3 p-2 rounded hover:bg-gray-800/50 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  <Clock className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
                    {log.timestamp}
                  </span>
                  <Icone className={`w-4 h-4 mt-0.5 ${getCorTipo(log.tipo)}`} />
                  <User className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {log.usuario}
                  </span>
                  <span className={getCorTipo(log.tipo)}>
                    [{log.acao}]
                  </span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {log.detalhes}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Logs atualizados em tempo real
          </div>
          <div className="flex gap-2">
            <button className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}>
              <FileText className="w-4 h-4 inline mr-2" />
              Exportar Logs
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
