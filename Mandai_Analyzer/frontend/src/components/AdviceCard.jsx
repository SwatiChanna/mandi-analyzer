import React from 'react';
import { useTranslation } from 'react-i18next';

const AdviceCard = ({ result }) => {
  const { t } = useTranslation();
  return (
    <div className="card p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
      <div className="flex items-start gap-4">
        <div className="text-5xl">🧑‍🌾</div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-amber-900 mb-3">{t('advice.title')}</h3>
          <div className="bg-white p-6 rounded-lg border-2 border-amber-200">
            <p className="text-gray-800 leading-relaxed font-medium">
              {result.advice}
            </p>
          </div>
          <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>⚡ {t('advice.powered')}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceCard;
