import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Star, AlertTriangle, ThumbsDown, Bot, CheckCircle, Trash2, Eye } from 'lucide-react';

interface ReviewsFalsosModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const reviewsSuspeitos = [
  { 
    id: 'REV-001', 
    produto: 'Curso Marketing Digital Pro',
    vendedor: 'João Silva Digital',
    autor: 'Usuario_123',
    nota: 5,
    texto: 'Melhor curso que já fiz na minha vida! Recomendo muito!!!',
    data: '02/01/2025',
    risco: 95,
    motivos: ['Conta nova', 'Texto genérico', 'Padrão de bot'],
    status: 'suspeito'
  },
  { 
    id: 'REV-002', 
    produto: 'eBook Growth Hacking',
    vendedor: 'Maria Cursos',
    autor: 'Comprador_ABC',
    nota: 5,
    texto: 'Excelente produto, superou minhas expectativas! 10/10',
    data: '01/01/2025',
    risco: 88,
    motivos: ['IP duplicado', 'Mesmo dispositivo'],
    status: 'suspeito'
  },
  { 
    id: 'REV-003', 
    produto: 'Template Pack Design',
    vendedor: 'Design Pro BR',
    autor: 'ClienteFeliz',
    nota: 1,
    texto: 'Péssimo! Não comprem! Golpe!!!',
    data: '31/12/2024',
    risco: 82,
    motivos: ['Review bomb', 'Concorrente detectado'],
    status: 'ataque'
  },
  { 
    id: 'REV-004', 
    produto: 'Curso Vendas Online',
    vendedor: 'Tech Academy',
    autor: 'EstudanteBR',
    nota: 5,
    texto: 'Conteúdo muito bom, professor explica bem.',
    data: '30/12/2024',
    risco: 25,
    motivos: [],
    status: 'legítimo'
  },
];

export default function ReviewsFalsosModal({ onClose, darkMode = false }: ReviewsFalsosModalProps) {
  const [reviews, setReviews] = useState(reviewsSuspeitos);
  const [filtro, setFiltro] = useState('todos');

  const removerReview = (id: string) => {
    setReviews(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'removido' } : r
    ));
  };

  const aprovarReview = (id: string) => {
    setReviews(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'legítimo' } : r
    ));
  };

  const filtrados = reviews.filter(r => 
    filtro === 'todos' || r.status === filtro
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
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Detecção de Reviews Falsos</h2>
                <p className="text-yellow-100 text-sm">IA identifica avaliações fraudulentas automaticamente</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Estatísticas */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {reviews.length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Analisados Hoje</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
              <div className="text-2xl font-bold text-red-500">
                {reviews.filter(r => r.status === 'suspeito').length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Suspeitos</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
              <div className="text-2xl font-bold text-orange-500">
                {reviews.filter(r => r.status === 'ataque').length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>Ataques</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <div className="text-2xl font-bold text-green-500">
                {reviews.filter(r => r.status === 'removido').length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Removidos</div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 mb-6">
            {['todos', 'suspeito', 'ataque', 'legítimo', 'removido'].map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filtro === f 
                    ? 'bg-yellow-500 text-white' 
                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Lista de Reviews */}
          <div className="space-y-4">
            {filtrados.map(review => (
              <motion.div
                key={review.id}
                layout
                className={`p-4 rounded-xl border ${
                  review.status === 'suspeito' || review.status === 'ataque'
                    ? darkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
                    : review.status === 'removido'
                    ? darkMode ? 'bg-gray-700 border-gray-600 opacity-60' : 'bg-gray-100 border-gray-200 opacity-60'
                    : darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.nota ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        review.status === 'suspeito' ? 'bg-red-600 text-white' :
                        review.status === 'ataque' ? 'bg-orange-600 text-white' :
                        review.status === 'removido' ? 'bg-gray-500 text-white' :
                        'bg-green-600 text-white'
                      }`}>
                        {review.status}
                      </span>
                      {review.risco >= 80 && (
                        <Bot className="w-4 h-4 text-red-500" title="Padrão de bot detectado" />
                      )}
                    </div>

                    <p className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>"{review.texto}"</p>

                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Por <span className="font-medium">{review.autor}</span> em {review.produto}
                    </div>

                    {/* Motivos */}
                    {review.motivos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {review.motivos.map((motivo, i) => (
                          <span key={i} className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                            darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                          }`}>
                            <AlertTriangle className="w-3 h-3" />
                            {motivo}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-center">
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Risco</div>
                      <div className={`text-2xl font-bold ${
                        review.risco >= 80 ? 'text-red-500' : review.risco >= 50 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {review.risco}%
                      </div>
                    </div>

                    {review.status !== 'removido' && review.status !== 'legítimo' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => aprovarReview(review.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removerReview(review.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
