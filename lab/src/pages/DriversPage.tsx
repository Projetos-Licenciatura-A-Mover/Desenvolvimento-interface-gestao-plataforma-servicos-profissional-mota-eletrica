import React, { useState } from 'react';
import { Search, Plus, User } from 'lucide-react';

interface Driver {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  license: string;
}

const DriversPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const drivers: Driver[] = [
    { id: 1, name: 'João Silva', status: 'active', license: 'A12345' },
    { id: 2, name: 'Maria Santos', status: 'active', license: 'B67890' },
    { id: 3, name: 'Pedro Oliveira', status: 'inactive', license: 'C11223' },
  ];

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#717171] p-4">
      {/* Search and Add Section */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Pesquisar condutor..."
            className="w-full bg-white rounded-md py-2 pl-10 pr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button className="bg-[#333333] text-white p-2 rounded-md">
          <Plus size={24} />
        </button>
      </div>

      {/* Drivers List */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {filteredDrivers.map(driver => (
          <div
            key={driver.id}
            className="bg-[#7D7D7D] rounded-md p-4 flex items-center gap-4"
          >
            <div className="bg-[#333333] rounded-full p-2">
              <User size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black">{driver.name}</h3>
              <p className="text-sm text-gray-700">Licença: {driver.license}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              driver.status === 'active' 
                ? 'bg-green-200 text-green-800' 
                : 'bg-red-200 text-red-800'
            }`}>
              {driver.status === 'active' ? 'Ativo' : 'Inativo'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriversPage;