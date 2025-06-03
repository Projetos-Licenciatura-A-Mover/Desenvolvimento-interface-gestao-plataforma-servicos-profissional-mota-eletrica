import React, { useState } from 'react';
import { predefinedUsers } from '../types/auth';

const RecoverPasswordPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = predefinedUsers.find(
      u => (u.username === identifier || u.email === identifier || u.name === identifier) && u.password === currentPassword
    );

    if (!user) {
      setError('Usuário não encontrado ou senha atual incorreta');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    // Update the user's password in the predefined users array
    user.password = newPassword;
    setSuccess(true);

    // Reset form
    setIdentifier('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#717171]">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-12">
          <img 
            src="https://i.imgur.com/cZ90AGv.png"
            alt="A-Mover Logo"
            className="h-32 object-contain"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Email / Nome de Perfil"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border-b border-black text-black placeholder-black focus:outline-none focus:border-[#2EA043]"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Senha Atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border-b border-black text-black placeholder-black focus:outline-none focus:border-[#2EA043]"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Nova Senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border-b border-black text-black placeholder-black focus:outline-none focus:border-[#2EA043]"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirmar Nova Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border-b border-black text-black placeholder-black focus:outline-none focus:border-[#2EA043]"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm text-center">
              Senha alterada com sucesso!
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-black hover:bg-black/90 text-white font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            CONFIRM
          </button>

          <button
            type="button"
            onClick={() => window.location.href = '/'}
            className="w-full text-black hover:text-[#2EA043] text-sm"
          >
            Voltar para o Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;