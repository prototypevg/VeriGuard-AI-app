import { useState } from 'react';
import Login from './components/Login';
import VendedoresDashboard from './components/dashboards/VendedoresDashboardNew';
import MarketplacesDashboard from './components/dashboards/MarketplacesDashboard';
import BancosDashboard from './components/dashboards/BancosDashboard';
import ChatbotAssistant from './components/ChatbotAssistant';

export type PerfilType = 'vendedores' | 'marketplaces' | 'bancos' | null;

export interface UserSession {
  email: string;
  perfil: PerfilType;
}

export default function App() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = (email: string, perfil: PerfilType) => {
    setSession({ email, perfil });
  };

  const handleLogout = () => {
    setSession(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!session) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      {session.perfil === 'vendedores' && (
        <VendedoresDashboard 
          userEmail={session.email} 
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}
      {session.perfil === 'marketplaces' && (
        <MarketplacesDashboard 
          userEmail={session.email} 
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}
      {session.perfil === 'bancos' && (
        <BancosDashboard 
          userEmail={session.email} 
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}
      <ChatbotAssistant />
    </div>
  );
}