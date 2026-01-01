import { useState } from 'react';
import { motion } from 'motion/react';
import { X, User, Bell, Shield, Globe, Moon, Sun, Key, Database, Zap } from 'lucide-react';

interface ConfiguracoesModalProps {
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  userEmail: string;
}

export default function ConfiguracoesModal({ 
  onClose, 
  darkMode, 
  onToggleDarkMode,
  userEmail 
}: ConfiguracoesModalProps) {
  const [activeTab, setActiveTab] = useState('perfil');

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'preferencias', label: 'Preferências', icon: Zap },
    { id: 'privacidade', label: 'Privacidade', icon: Database }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Sidebar */}
        <div className={`w-64 border-r p-6 ${
          darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={darkMode ? 'text-white' : 'text-gray-900'}>Configurações</h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            >
              <X className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            </button>
          </div>

          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#39843e] text-white'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {activeTab === 'perfil' && (
              <div className="space-y-6">
                <div>
                  <h3 className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Informações do Perfil
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className={`block mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={userEmail}
                        disabled
                        className={`w-full px-4 py-2 rounded-lg ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300 border-gray-600' 
                            : 'bg-gray-100 text-gray-600 border-gray-300'
                        } border`}
                      />
                    </div>

                    <div>
                      <label className={`block mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        placeholder="Seu nome completo"
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#39843e] ${
                          darkMode 
                            ? 'bg-gray-700 text-white border-gray-600' 
                            : 'bg-white text-gray-900 border-gray-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Empresa
                      </label>
                      <input
                        type="text"
                        placeholder="Nome da empresa"
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#39843e] ${
                          darkMode 
                            ? 'bg-gray-700 text-white border-gray-600' 
                            : 'bg-white text-gray-900 border-gray-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Cargo
                      </label>
                      <input
                        type="text"
                        placeholder="Seu cargo"
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#39843e] ${
                          darkMode 
                            ? 'bg-gray-700 text-white border-gray-600' 
                            : 'bg-white text-gray-900 border-gray-300'
                        }`}
                      />
                    </div>

                    <button className="bg-[#39843e] hover:bg-[#416b44] text-white px-6 py-2 rounded-lg transition-colors">
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notificacoes' && (
              <div className="space-y-6">
                <h3 className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Preferências de Notificações
                </h3>

                <div className="space-y-4">
                  {[
                    { label: 'Alertas de Fraude', description: 'Receber notificações quando fraudes forem detectadas' },
                    { label: 'Evidence Packs', description: 'Notificar quando novos Evidence Packs forem gerados' },
                    { label: 'Relatórios', description: 'Receber relatórios automáticos por email' },
                    { label: 'Atualizações do Sistema', description: 'Novos recursos e melhorias da plataforma' }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div>
                        <div className={`mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.label}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.description}
                        </div>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'seguranca' && (
              <div className="space-y-6">
                <h3 className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Segurança e Autenticação
                </h3>

                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className={`mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Autenticação de Dois Fatores (2FA)
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Adicione uma camada extra de segurança
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        Ativo
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className={`block mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Alterar Senha
                    </label>
                    <input
                      type="password"
                      placeholder="Nova senha"
                      className={`w-full px-4 py-2 rounded-lg border mb-2 focus:outline-none focus:ring-2 focus:ring-[#39843e] ${
                        darkMode 
                          ? 'bg-gray-700 text-white border-gray-600' 
                          : 'bg-white text-gray-900 border-gray-300'
                      }`}
                    />
                    <input
                      type="password"
                      placeholder="Confirmar nova senha"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#39843e] ${
                        darkMode 
                          ? 'bg-gray-700 text-white border-gray-600' 
                          : 'bg-white text-gray-900 border-gray-300'
                      }`}
                    />
                    <button className="mt-4 bg-[#39843e] hover:bg-[#416b44] text-white px-6 py-2 rounded-lg transition-colors">
                      Atualizar Senha
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferencias' && (
              <div className="space-y-6">
                <h3 className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Preferências
                </h3>

                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Modo Escuro
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Ativar tema escuro para reduzir cansaço visual
                        </div>
                      </div>
                      <button
                        onClick={onToggleDarkMode}
                        className={`p-2 rounded-lg ${
                          darkMode ? 'bg-gray-600' : 'bg-gray-200'
                        }`}
                      >
                        {darkMode ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-gray-700" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className={`block mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Idioma
                    </label>
                    <select className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#39843e] ${
                      darkMode 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-white text-gray-900 border-gray-300'
                    }`}>
                      <option>Português (BR)</option>
                      <option>English (US)</option>
                      <option>Español</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Moeda
                    </label>
                    <select className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#39843e] ${
                      darkMode 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-white text-gray-900 border-gray-300'
                    }`}>
                      <option>BRL (R$)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacidade' && (
              <div className="space-y-6">
                <h3 className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Privacidade e Dados
                </h3>

                <div className={`p-4 rounded-lg border ${
                  darkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'
                }`}>
                  <h4 className={`mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                    Seus Dados Estão Protegidos
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    Todos os dados são criptografados com AES-256 e armazenados em servidores seguros com certificação ISO 27001.
                  </p>
                </div>

                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 rounded-lg border transition-colors hover:bg-[#39843e]/10 hover:border-[#39843e] border-gray-300">
                    <div className={darkMode ? 'text-white' : 'text-gray-900'}>
                      Exportar Meus Dados
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Baixar todos os seus dados em formato JSON
                    </div>
                  </button>

                  <button className="w-full text-left px-4 py-3 rounded-lg border transition-colors hover:bg-red-50 hover:border-red-300 border-gray-300">
                    <div className="text-red-600">Solicitar Exclusão de Conta</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Excluir permanentemente sua conta e dados
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
