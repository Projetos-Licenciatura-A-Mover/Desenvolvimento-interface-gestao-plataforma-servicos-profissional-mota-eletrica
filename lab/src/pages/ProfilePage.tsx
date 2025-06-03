import React, { useState } from 'react';
import { User, PenSquare, History, X, Camera } from 'lucide-react';

interface ProfileData {
  name: string;
  driverLicense: string;
  citizenCard: string;
  phone: string;
  address: string;
  email: string;
}

interface Break {
  id: number;
  start: string;
  end: string;
  duration: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Nuno Melo',
    driverLicense: '',
    citizenCard: '',
    phone: '',
    address: '',
    email: ''
  });

  const breaks: Break[] = [
    { id: 1, start: '10:00', end: '10:15', duration: '15 minutos' },
    { id: 2, start: '13:00', end: '14:40', duration: '40 minutos' },
    { id: 3, start: '15:00', end: '15:15', duration: '15 minutos' },
  ];

  const handleInputChange = (field: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving profile data:', profileData);
  };

  if (showHistory) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold text-xl">CONDUTORES</h3>
            <div className="text-lg">19:03</div>
          </div>

          <div className="p-6">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-[#333333] rounded-full p-4 w-24 h-24 flex items-center justify-center mb-4">
                <User size={48} color="white" />
              </div>
              <div className="bg-gray-200 px-4 py-1 rounded-md">
                <span className="text-lg">{profileData.name}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 text-right font-medium">INÍCIO SERVIÇO</div>
                <div className="w-32 bg-gray-100 px-3 py-1 rounded">9:00 Horas</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 text-right font-medium">TÉRMINO SERVIÇO</div>
                <div className="w-32 bg-gray-100 px-3 py-1 rounded"></div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 text-right font-medium">TEMPO DE CONDUÇÃO</div>
                <div className="w-32 bg-gray-100 px-3 py-1 rounded">6:00 Horas</div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-4">PAUSAS</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium text-center">#</div>
                  <div className="font-medium">Início</div>
                  <div className="font-medium">Fim</div>
                  <div className="font-medium">Duração</div>
                  
                  {breaks.map(breakItem => (
                    <React.Fragment key={breakItem.id}>
                      <div className="text-center bg-gray-100 rounded px-2 py-1">{breakItem.id}</div>
                      <div>{breakItem.start}</div>
                      <div>{breakItem.end}</div>
                      <div>{breakItem.duration}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 font-medium hover:bg-gray-300 transition-colors"
                onClick={() => setShowHistory(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">Editar Perfil</h3>
            <button onClick={() => setIsEditing(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="bg-[#333333] rounded-full p-4 w-24 h-24 flex items-center justify-center">
                  <User size={48} color="white" />
                </div>
                <button className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-2">
                  <Camera size={20} />
                </button>
              </div>
              <input
                type="text"
                value={profileData.name}
                onChange={handleInputChange('name')}
                className="mt-4 text-center border-b border-gray-300 px-2 py-1"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Carta de Condução:</label>
                <input
                  type="text"
                  value={profileData.driverLicense}
                  onChange={handleInputChange('driverLicense')}
                  className="w-full border-b border-gray-300 px-2 py-1"
                  placeholder="Digite o número da carta de condução"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Cartão de Cidadão:</label>
                <input
                  type="text"
                  value={profileData.citizenCard}
                  onChange={handleInputChange('citizenCard')}
                  className="w-full border-b border-gray-300 px-2 py-1"
                  placeholder="Digite o número do cartão de cidadão"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Telemóvel:</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={handleInputChange('phone')}
                  className="w-full border-b border-gray-300 px-2 py-1"
                  placeholder="Digite o número de telemóvel"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Morada:</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={handleInputChange('address')}
                  className="w-full border-b border-gray-300 px-2 py-1"
                  placeholder="Digite a morada"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Email:</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange('email')}
                  className="w-full border-b border-gray-300 px-2 py-1"
                  placeholder="Digite o email"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                className="flex-1 px-4 py-2 bg-gray-200 rounded-lg text-gray-800 font-medium hover:bg-gray-300 transition-colors"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
              <button
                className="flex-1 px-4 py-2 bg-[#333333] text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                onClick={handleSave}
              >
                Guardar Alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#717171] p-4">
      <div className="flex justify-end gap-4 mb-6">
        <button 
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          onClick={() => setIsEditing(true)}
        >
          <PenSquare size={18} />
          <span>Editar Perfil</span>
        </button>
        <button 
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          onClick={() => setShowHistory(true)}
        >
          <History size={18} />
          <span>Histórico</span>
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 flex-1">
        <h2 className="text-xl font-semibold mb-8">Perfil</h2>
        
        <div className="flex flex-col items-center mb-12">
          <div className="bg-[#333333] rounded-full p-4 w-24 h-24 flex items-center justify-center mb-4">
            <User size={48} color="white" />
          </div>
          <div className="bg-gray-200 px-4 py-1 rounded-md">
            <span className="text-lg">{profileData.name}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-gray-300 pb-2">
            <label className="block text-sm text-gray-600">Carta de Condução:</label>
            <div className="h-6 mt-1">{profileData.driverLicense || '—'}</div>
          </div>

          <div className="border-b border-gray-300 pb-2">
            <label className="block text-sm text-gray-600">Cartão de Cidadão:</label>
            <div className="h-6 mt-1">{profileData.citizenCard || '—'}</div>
          </div>

          <div className="border-b border-gray-300 pb-2">
            <label className="block text-sm text-gray-600">Telemóvel:</label>
            <div className="h-6 mt-1">{profileData.phone || '—'}</div>
          </div>

          <div className="border-b border-gray-300 pb-2">
            <label className="block text-sm text-gray-600">Morada:</label>
            <div className="h-6 mt-1">{profileData.address || '—'}</div>
          </div>

          <div className="border-b border-gray-300 pb-2">
            <label className="block text-sm text-gray-600">Email:</label>
            <div className="h-6 mt-1">{profileData.email || '—'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;