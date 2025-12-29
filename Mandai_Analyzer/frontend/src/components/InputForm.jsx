import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const InputForm = ({ onSubmit, loading }) => {
  const [crop, setCrop] = useState('');
  const [location, setLocation] = useState('');

  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (crop && location) {
      onSubmit({ crop, location });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-8 sticky top-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span>📝</span> {t('app.checkYourMarket')}
      </h2>

      <div className="space-y-5">
        {/* Crop Text Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('app.selectCrop')}
          </label>
          <input
            type="text"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            placeholder="e.g., Onion, Tomato, Wheat..."
            className="input-field w-full"
            required
          />
        </div>

        {/* Location Text Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('app.selectLocation')}
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Nashik, Mumbai, Delhi..."
            className="input-field w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !crop || !location}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span> {t('app.analyzing')}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>🔍</span> {t('app.checkMarket')}
            </span>
          )}
        </button>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700">
          <strong>💡</strong> {t('app.tip')}
        </p>
      </div>
    </form>
  );
};

export default InputForm;
