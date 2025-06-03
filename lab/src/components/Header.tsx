import React from 'react';

interface HeaderProps {
  time: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ time, title }) => {
  return (
    <div className="bg-[#333333] text-white py-4 px-6 flex justify-between items-center rounded-b-md">
      <div className="w-20"></div> {/* Spacer */}
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="w-20 text-right">{time}</div>
    </div>
  );
};

export default Header;