import React, { useState } from 'react';
import { predefinedUsers, User } from '../types/auth';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onRecover: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onRecover }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = predefinedUsers.find(
      u => (u.username === identifier || u.email === identifier || u.name === identifier) && u.password === password
    );

    if (user) {
      setError('');
      onLogin(user);
    } else {
      setError('Credenciais inválidas');
    }
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border-b border-black text-black placeholder-black focus:outline-none focus:border-[#2EA043]"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-[#2EA043] focus:ring-[#2EA043] border-black rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-black">
              Guardar Login
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#2EA043] hover:bg-[#2EA043]/90 text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#2EA043] focus:ring-offset-2"
          >
            LOGIN
          </button>

          <div className="text-center space-y-2 text-sm">
            <button
              type="button"
              onClick={onRecover}
              className="block w-full text-black hover:text-[#2EA043]"
            >
              [Recover Password]
            </button>
            <div className="text-black">
              Don't have account? <a href="https://www.utad.pt/gpfe/a-mover/" target="_blank" rel="noopener noreferrer" className="text-[#2EA043] hover:text-[#2EA043]/90">Contact us!</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;