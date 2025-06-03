import React from 'react';
import { User } from 'lucide-react';

interface UserProfileProps {
  name: string;
  onClick?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
      onClick={onClick}
    >
      <div className="bg-[#333333] rounded-full p-2 w-12 h-12 flex items-center justify-center">
        <User size={28} color="white" />
      </div>
      <span className="text-black mt-1 text-sm">{name}</span>
    </div>
  );
};

export default UserProfile;