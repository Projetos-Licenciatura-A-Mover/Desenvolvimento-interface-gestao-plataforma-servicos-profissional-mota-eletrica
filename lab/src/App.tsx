import { useState, useEffect } from 'react';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import BottomNavigation from './components/BottomNavigation';
import UserProfile from './components/UserProfile';
import DriversPage from './pages/DriversPage';
import SettingsPage from './pages/SettingsPage';
import AssistancePage from './pages/AssistancePage';
import CalendarPage from './pages/CalendarPage';
import TasksPage from './pages/TasksPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import MotorcyclesPage from './pages/MotorcyclesPage';
import RoutesPage from './pages/RoutesPage';
import { User } from './types/auth';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<'main' | 'routes' | 'settings' | 'assistance' | 'calendar' | 'tasks' | 'profile' | 'recover' | 'motorcycles'>('main');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getPageTitle = () => {
    switch (currentPage) {
      case 'routes':
        return 'ROTAS';
      case 'settings':
        return 'DEFINIÇÕES';
      case 'assistance':
        return 'ASSISTÊNCIA';
      case 'calendar':
        return 'CALENDÁRIO';
      case 'tasks':
        return 'TAREFAS';
      case 'profile':
        return 'PERFIL';
      case 'recover':
        return 'RECUPERAR SENHA';
      case 'motorcycles':
        return 'GESTÃO DE MOTAS';
      default:
        return 'MAIN PAGE';
    }
  };

  if (!currentUser) {
    if (currentPage === 'recover') {
      return <RecoverPasswordPage />;
    }
    return <LoginPage onLogin={setCurrentUser} onRecover={() => setCurrentPage('recover')} />;
  }

  return (
    <div className="flex flex-col h-screen bg-[#717171]">
      {/* Header */}
      <Header time={currentTime} title={getPageTitle()} />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {currentPage === 'main' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="absolute top-[85px] right-5">
              <UserProfile 
                name={currentUser.name} 
                onClick={() => setCurrentPage('profile')}
              />
            </div>
            <MainMenu onMenuClick={(page) => setCurrentPage(page)} userRole={currentUser.role} />
          </div>
        )}
        {currentPage === 'routes' && <RoutesPage />}
        {currentPage === 'settings' && <SettingsPage onMenuClick={setCurrentPage} />}
        {currentPage === 'assistance' && <AssistancePage />}
        {currentPage === 'calendar' && <CalendarPage />}
        {currentPage === 'tasks' && <TasksPage />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'motorcycles' && <MotorcyclesPage />}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default App