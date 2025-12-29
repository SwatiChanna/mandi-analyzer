import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Dashboard from './components/Dashboard';
import InputForm from './components/InputForm';
import Login from './pages/Login';
import './index.css';

function App() {
  const { t, i18n } = useTranslation();
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(() => localStorage.getItem('i18nextLng') || 'en');
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mandi_user')) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
  }, [language]);

  const handleAnalysis = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze', {
        crop: formData.crop,
        location: formData.location,
        language: language
      });
      setAnalysisResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'Failed to fetch analysis. Please check if the backend is running.'
      );
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12">
                <img src="/logo.png" alt="Mandi Analyzer logo" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {t('app.title')}
                </h1>
                <p className="text-gray-600 text-sm">{t('app.tagline')}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 mr-2">{/* accessible label */}</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="input-field w-36 bg-white"
                aria-label="Select language"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="mr">मराठी</option>
              </select>
              <div className="flex items-center gap-3 ml-4">
                <span className="text-sm text-gray-700">{user?.name}</span>
                <button
                  onClick={() => {
                    localStorage.removeItem('mandi_user');
                    setUser(null);
                  }}
                  className="btn-ghost"
                >
                  {t('auth.logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Input Form - Full Width */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <InputForm onSubmit={handleAnalysis} loading={loading} />
      </main>

      {/* Analysis Results - Full Width Below */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
            {error && (
              <div className="card p-6 border-2 border-red-200 bg-red-50">
                <h3 className="font-semibold text-red-700 mb-2">⚠️ Error</h3>
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {loading && (
              <div className="card p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin mb-4">
                    <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 font-medium">{t('app.analyzing')}</p>
                </div>
              </div>
            )}

            {analysisResult && !loading && (
              <Dashboard result={analysisResult} />
            )}

            {!analysisResult && !loading && !error && (
              <div className="card p-12 text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {t('app.welcome')}
                </h3>
                <p className="text-gray-600">
                  {t('app.subtitle')}
                </p>
              </div>
            )}
          </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>Built for farmers. Powered by AI. Made for hackathons. 🚀</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
