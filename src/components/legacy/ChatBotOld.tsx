import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  darkMode: boolean;
}

const respostasAutomaticas: { [key: string]: string } = {
  'evidence pack': 'Evidence Pack é um pacote técnico e jurídico gerado pela VeriGuard AI que contém hash, timestamp, assinatura digital e metadados do evento. Ele serve como prova rastreável em disputas e auditorias.',
  'score': 'O score de risco é calculado usando ensemble de modelos de IA que analisam mais de 15 variáveis incluindo valor, velocity, device fingerprint, IP reputation e histórico do usuário. O resultado é um score de 0-100 com nível de confiança.',
  'fraude': 'Nossa IA detecta fraudes em tempo real usando aprendizado de máquina avançado. Analisamos padrões de comportamento, dispositivos, localização e histórico para identificar atividades suspeitas.',
  'integração': 'A VeriGuard AI oferece API REST completa para integração com seus sistemas. Temos conectores prontos para Hotmart, Eduzz, Stripe, e marketplaces principais.',
  'relatório': 'Você pode gerar relatórios customizados em PDF, Excel, CSV ou JSON. Acesse o menu Relatórios e configure o tipo, período e KPIs desejados.',
  'ajuda': 'Como posso ajudar? Você pode me perguntar sobre Evidence Packs, scores de risco, integrações, relatórios ou qualquer funcionalidade da VeriGuard AI.',
  'playbook': 'Playbooks são sequências automatizadas de ações executadas quando um gatilho ocorre. Você pode criar, editar e testar playbooks personalizados no painel de configurações.',
};

export default function ChatBot({ darkMode }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Olá! Sou a assistente virtual da VeriGuard AI. Como posso ajudar você hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Simular resposta do bot
    setTimeout(() => {
      const lowerInput = inputText.toLowerCase();
      let resposta = 'Desculpe, não entendi sua pergunta. Você pode me perguntar sobre Evidence Packs, scores de risco, integrações, relatórios ou playbooks.';

      for (const [chave, valor] of Object.entries(respostasAutomaticas)) {
        if (lowerInput.includes(chave)) {
          resposta = valor;
          break;
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: resposta,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Botão flutuante */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50 ${
          darkMode 
            ? 'bg-gradient-to-br from-[#39843e] to-[#416b44]' 
            : 'bg-gradient-to-br from-[#39843e] to-[#416b44]'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-24 right-6 w-96 h-[500px] rounded-2xl shadow-2xl z-50 flex flex-col ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#39843e] to-[#416b44] text-white p-4 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">VeriGuard AI Assistant</h3>
                  <p className="text-xs text-white/80">Online • Responde instantaneamente</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-[#39843e] text-white'
                        : darkMode
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua pergunta..."
                  className={`flex-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#39843e] ${
                    darkMode 
                      ? 'bg-gray-700 text-white border border-gray-600' 
                      : 'bg-gray-100 text-gray-900 border border-gray-300'
                  }`}
                />
                <button
                  onClick={handleSend}
                  className="bg-[#39843e] hover:bg-[#416b44] text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
