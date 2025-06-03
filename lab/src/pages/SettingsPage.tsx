import React from 'react';

interface SettingsPageProps {
  onMenuClick: (page: 'main' | 'drivers' | 'settings' | 'assistance' | 'profile') => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onMenuClick }) => {
  const menuItems = [
    { id: 1, label: 'Perfil', page: 'profile' as const },
    { id: 2, label: 'Assistência', page: 'assistance' as const },
    { id: 3, label: 'Manutenções', page: 'settings' as const },
  ];

  return (
    <div className="flex flex-col h-full bg-[#717171]">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-3 px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="w-full bg-[#7D7D7D] text-black py-3 px-6 rounded-md text-center font-bold text-xl"
              onClick={() => onMenuClick(item.page)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;