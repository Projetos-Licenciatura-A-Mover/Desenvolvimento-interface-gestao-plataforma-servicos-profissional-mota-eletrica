import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Motorcycle {
  id: string;
  matricula: string;
  name: string;
  status: 'Disponível' | 'Em Uso' | 'Manutenção';
  marca?: string;
  modelo?: string;
}

const MotorcyclesPage: React.FC = () => {
  const [selectedMoto, setSelectedMoto] = useState<Motorcycle | null>(null);
  const [motorcycles] = useState<Motorcycle[]>([
    { 
      id: 'Mota-0001', 
      matricula: '45-RT-89', 
      name: 'Honda CB500X',
      status: 'Disponível',
      marca: 'Honda',
      modelo: 'CB500X'
    },
    { 
      id: 'Mota-0002', 
      matricula: '67-VB-23', 
      name: 'Yamaha MT-07',
      status: 'Em Uso',
      marca: 'Yamaha',
      modelo: 'MT-07'
    },
    { 
      id: 'Mota-0003', 
      matricula: '12-ZX-45', 
      name: 'Kawasaki Z650',
      status: 'Manutenção',
      marca: 'Kawasaki',
      modelo: 'Z650'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'text-green-600';
      case 'Em Uso':
        return 'text-orange-500';
      case 'Manutenção':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusButtonColor = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'bg-green-600 hover:bg-green-700';
      case 'Em Uso':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'Manutenção':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#717171] p-4">
      <div className="flex-1 space-y-2">
        {motorcycles.map((moto) => (
          <div
            key={moto.id}
            className="bg-white rounded-md p-4 flex items-center justify-between cursor-pointer"
            onClick={() => setSelectedMoto(moto)}
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-medium">{moto.id}</h3>
                <p className="text-sm text-gray-500">{moto.name}</p>
                <p className="text-xs text-gray-400">Matrícula: {moto.matricula}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="px-3 py-1 text-white text-sm rounded-md bg-[#333333] hover:bg-[#444444]"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle assign motorcycle
                }}
              >
                Atribuir Mota
              </button>
              <span className={`${getStatusColor(moto.status)} font-medium`}>
                {moto.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        className="mt-4 bg-[#333333] text-white py-2 rounded-md flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        <span>Adicionar Moto</span>
      </button>

      {/* Edit Modal */}
      {selectedMoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">A editar:</h3>
              <button onClick={() => setSelectedMoto(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nome:</label>
                <input
                  type="text"
                  value={selectedMoto.name}
                  className="w-full border border-gray-300 rounded-md p-2"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Matrícula:</label>
                <input
                  type="text"
                  value={selectedMoto.matricula}
                  className="w-full border border-gray-300 rounded-md p-2"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Marca:</label>
                <input
                  type="text"
                  value={selectedMoto.marca}
                  className="w-full border border-gray-300 rounded-md p-2"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Modelo:</label>
                <input
                  type="text"
                  value={selectedMoto.modelo}
                  className="w-full border border-gray-300 rounded-md p-2"
                  readOnly
                />
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Atualizar Status da Mota</h4>
                <div className="space-y-2">
                  {(['Disponível', 'Em Uso', 'Manutenção'] as const).map((status) => (
                    <button
                      key={status}
                      className={`w-full py-2 text-white rounded-md ${getStatusButtonColor(status)}`}
                      onClick={() => {
                        // Handle status update
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="w-full mt-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setSelectedMoto(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MotorcyclesPage;