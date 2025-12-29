import React from 'react';
import { useTranslation } from 'react-i18next';
import MarketAlertCard from './MarketAlertCard';
import PriceRangeCard from './PriceRangeCard';
import AdviceCard from './AdviceCard';
import PriceTrendChart from './PriceTrendChart';

const Dashboard = ({ result }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          {t('dashboard.analysisFor', { crop: result.crop, location: result.location })}
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          {t('dashboard.lastUpdated', { time: new Date(result.timestamp).toLocaleString() })}
        </p>
      </div>

      {/* Top Row: Alert & Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MarketAlertCard result={result} />
        <PriceRangeCard result={result} />
      </div>

      {/* Middle: Price Trend Chart */}
      <PriceTrendChart result={result} />

      {/* Bottom: Advice Card */}
      <AdviceCard result={result} />
    </div>
  );
};

export default Dashboard;
