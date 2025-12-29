import React from 'react';
import { useTranslation } from 'react-i18next';

const PurposeAlert = () => {
  const { t } = useTranslation();
  return (
    <div className="card p-6 mb-6 bg-yellow-50 border-l-4 border-yellow-400">
      <h3 className="text-lg font-bold mb-2">{t('purpose.title')}</h3>
      <p className="text-sm text-gray-700 whitespace-pre-line">{t('purpose.body')}</p>
    </div>
  );
};

export default PurposeAlert;
