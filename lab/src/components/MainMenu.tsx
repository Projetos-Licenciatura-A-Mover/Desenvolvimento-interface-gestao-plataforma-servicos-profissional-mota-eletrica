import React from 'react';
import { UserRole } from '../types/auth';

interface MainMenuProps {
  onMenuClick: (page: 'main' | 'tasks' | 'drivers' | 'motorcycles') => void;
  userRole: UserRole;
}

const MainMenu: React.FC<MainMenuProps> = ({ onMenuClick, userRole }) => {
  const menuItems = [
    { id: 1, label: 'Tarefas/Rotas', page: 'tasks' as const },
    { id: 2, label: 'Condutores', page: 'drivers' as const, adminOnly: true },
    { id: 3, label: 'Motas', page: 'motorcycles' as const },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.adminOnly || userRole === 'admin'
  );

  return (
    <div className="w-full max-w-md space-y-3">
      {filteredMenuItems.map((item) => (
        <button
          key={item.id}
          className="w-full bg-[#7D7D7D] text-black py-3 px-6 rounded-md text-center font-bold text-xl"
          onClick={() => onMenuClick(item.page)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default MainMenu;