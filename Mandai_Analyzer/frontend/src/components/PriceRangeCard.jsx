import React from 'react';
import { useTranslation } from 'react-i18next';

const PriceRangeCard = ({ result }) => {
  const { t } = useTranslation();
  return (
    <div className="card p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{t('priceRange.title')}</p>
          <h3 className="text-4xl font-bold text-indigo-700">
            {result.priceRange}
          </h3>
        </div>
        <div className="text-5xl">💰</div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-indigo-200">
        <div className="bg-white p-4 rounded-lg">
          <p className="text-gray-600 text-xs font-semibold mb-1">{t('priceRange.minimum')}</p>
          <p className="text-2xl font-bold text-red-600">₹{result.min_price}</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <p className="text-gray-600 text-xs font-semibold mb-1">{t('priceRange.maximum')}</p>
          <p className="text-2xl font-bold text-green-600">₹{result.max_price}</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-indigo-100 rounded-lg">
        <p className="text-indigo-700 text-xs font-semibold">
          📍 {t('marketAlert.withinRadius', { location: result.location })}
        </p>
      </div>
    </div>
  );
};

export default PriceRangeCard;
