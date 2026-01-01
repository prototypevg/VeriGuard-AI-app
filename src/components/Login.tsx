import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowLeft, ShoppingBag, Store, CreditCard, HelpCircle } from 'lucide-react';
import type { PerfilType } from '../App';
import logoVeriGuard from 'figma:asset/387a34705e6205bda5fa823ffc7932e787e39b67.png';
import HelpModal from './modals/HelpModal';

interface LoginProps {
  onLogin: (email: string, perfil: PerfilType) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [selectedPerfil, setSelectedPerfil] = useState<PerfilType>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && selectedPerfil) {
      onLogin(email, selectedPerfil);
    }
  };

  const perfis = [
    {
      id: 'vendedores' as PerfilType,
      title: 'Vendedores Digitais',
      icon: ShoppingBag,
      description: 'Proteja seus produtos e transações'
    },
    {
      id: 'marketplaces' as PerfilType,
      title: 'Marketplaces',
      icon: Store,
      description: 'Valide vendedores e produtos'
    },
    {
      id: 'bancos' as PerfilType,
      title: 'Bancos, Fintechs & Gateways',
      icon: CreditCard,
      description: 'Detecte fraudes em tempo real'
    }
  ];

  return (
    <div className="min-h-screen bg-[#416b44] relative overflow-hidden flex items-center justify-center p-4">
      {/* Partículas digitais de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#39843e] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo e slogan */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-[#39843e] rounded-2xl mb-6 overflow-hidden"
          >
            <img src={logoVeriGuard} alt="VeriGuard AI" className="w-full h-full object-cover" />
          </motion.div>
          <h1 className="text-white mb-2">VeriGuard AI</h1>
          <p className="text-white/80">Sua plataforma antifraude com provas digitais confiáveis</p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedPerfil ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {perfis.map((perfil, index) => (
                <motion.button
                  key={perfil.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPerfil(perfil.id)}
                  className="w-full bg-[#39843e] hover:bg-[#416b44] text-white p-6 rounded-xl transition-all duration-300 flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <perfil.icon className="w-7 h-7" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="mb-1">{perfil.title}</div>
                    <p className="text-white/70 text-sm">{perfil.description}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={() => {
                  setSelectedPerfil(null);
                  setEmail('');
                  setPassword('');
                }}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h2 className="text-white mb-2">
                  {perfis.find(p => p.id === selectedPerfil)?.title}
                </h2>
                <p className="text-white/60 mb-6">Faça login para continuar</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/80 mb-2 text-sm">E-mail</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-[#39843e]/30 rounded-lg px-12 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#39843e] transition-colors"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2 text-sm">Senha</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-[#39843e]/30 rounded-lg px-12 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#39843e] transition-colors"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#39843e] hover:bg-[#2d6b31] text-white py-3 rounded-lg transition-all duration-300 mt-6"
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Botão de Ajuda Flutuante */}
      <button
        onClick={() => setShowHelp(true)}
        className="absolute bottom-6 right-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors z-20"
      >
        <HelpCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Central de Ajuda</span>
      </button>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
}