import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, LogOut, Moon, Sun, Globe, Bell } from 'lucide-react';

interface ProfileDropdownProps {
  userEmail: string;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSettings: () => void;
}

export default function ProfileDropdown({ 
  userEmail, 
  onLogout, 
  darkMode, 
  onToggleDarkMode,
  onOpenSettings 
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gerar iniciais do email
  const initials = userEmail
    .split('@')[0]
    .split('.')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          darkMode 
            ? 'hover:bg-gray-700 text-white' 
            : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-[#39843e] to-[#416b44] rounded-full flex items-center justify-center text-white">
          {initials}
        </div>
        <div className="text-left hidden sm:block">
          <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {userEmail.split('@')[0]}
          </div>
          <div className="text-xs text-gray-500">
            Online
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute right-0 mt-2 w-64 rounded-xl shadow-xl border z-50 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {userEmail}
              </div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Conta Ativa
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  onOpenSettings();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Settings className="w-5 h-5" />
                Configurações
              </button>

              <button
                onClick={onToggleDarkMode}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                {darkMode ? (
                  <>
                    <Sun className="w-5 h-5" />
                    Modo Claro
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    Modo Escuro
                  </>
                )}
              </button>

              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Globe className="w-5 h-5" />
                Idioma: PT-BR
              </button>

              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Bell className="w-5 h-5" />
                Notificações
              </button>
            </div>

            <div className={`p-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={onLogout}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-red-900/20 text-red-400' 
                    : 'hover:bg-red-50 text-red-600'
                }`}
              >
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
