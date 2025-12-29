import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Login = ({ onLogin }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      setError(t('login.required'));
      return;
    }
    // Simple local auth for demo: accept any username/password
    const user = { name: username };
    localStorage.setItem('mandi_user', JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">{t('login.title')}</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}

        <label className="block text-sm font-semibold text-gray-700">{t('login.username')}</label>
        <input
          className="input-field w-full mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t('login.usernamePlaceholder')}
        />

        <label className="block text-sm font-semibold text-gray-700">{t('login.password')}</label>
        <input
          type="password"
          className="input-field w-full mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('login.passwordPlaceholder')}
        />

        <button type="submit" className="btn-primary w-full">{t('login.login')}</button>
      </form>
    </div>
  );
};

export default Login;
