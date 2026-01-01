import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, ShieldCheck, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Olá! Sou o assistente inteligente da VeriGuard. Como posso ajudar a proteger seu negócio hoje?', sender: 'bot', timestamp: new Date() }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), text: input, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulação de resposta da IA
    setTimeout(() => {
      let responseText = "Entendi. Para essa situação, recomendo consultar o dashboard de auditoria.";
      const lowerInput = userMsg.text.toLowerCase();

      if (lowerInput.includes('fraude') || lowerInput.includes('golpe')) {
        responseText = "Detectamos padrões de fraude crescentes em transações via PIX. Recomendo ativar a verificação biométrica para valores acima de R$ 500.";
      } else if (lowerInput.includes('ajuda') || lowerInput.includes('suporte')) {
        responseText = "Estou aqui para ajudar 24/7. Você pode me perguntar sobre 'validação de produtos', 'análise de sellers' ou 'configuração de segurança'.";
      } else if (lowerInput.includes('produto') || lowerInput.includes('validar')) {
        responseText = "Para validar um produto, acesse o Painel de Vendedor e use a ferramenta 'Validar Produto'. Nossa IA analisa preço, descrição e imagens para detectar falsificações.";
      } else if (lowerInput.includes('preço') || lowerInput.includes('valor')) {
        responseText = "Nossa base de preços é atualizada a cada 15 minutos com dados dos maiores marketplaces para garantir competitividade e compliance.";
      } else if (lowerInput.includes('olá') || lowerInput.includes('oi')) {
        responseText = "Olá! Em que posso ser útil na sua gestão de riscos hoje?";
      }

      const botMsg: Message = { id: Date.now() + 1, text: responseText, sender: 'bot', timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#39843e] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">VeriGuard Assistant</h3>
                  <div className="flex items-center gap-1 text-xs opacity-90">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online • IA Ativa
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#39843e] text-white rounded-tr-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="flex items-center gap-1 mb-1 text-xs text-[#39843e] font-bold">
                        <Sparkles className="w-3 h-3" /> IA
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua dúvida..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#39843e] focus:ring-1 focus:ring-[#39843e]"
                />
                <button
                  onClick={handleSend}
                  className="bg-[#39843e] text-white p-2 rounded-full hover:bg-[#2d6a31] transition-colors flex items-center justify-center w-10 h-10 shadow-lg"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 bg-[#39843e] text-white p-4 rounded-full shadow-2xl hover:bg-[#2d6a31] transition-all z-50 group flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute right-full mr-3 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Precisa de ajuda?
          </span>
        )}
      </motion.button>
    </>
  );
}
