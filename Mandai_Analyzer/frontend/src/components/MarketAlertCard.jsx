import React from 'react';
import { useTranslation } from 'react-i18next';

const MarketAlertCard = ({ result }) => {
  const { t } = useTranslation();
  const signalConfig = {
    'Surplus': { color: 'red', icon: '🟥', emoji: '📉', description: t('marketAlert.highSupply') },
    'Stable': { color: 'yellow', icon: '🟨', emoji: '📊', description: t('marketAlert.stable') },
    'Deficit': { color: 'green', icon: '🟩', emoji: '📈', description: t('marketAlert.lowSupply') }
  };

  const config = signalConfig[result.signal] || signalConfig['Stable'];

  const bgClass = {
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    green: 'bg-green-50 border-green-200'
  }[config.color];

  const textClass = {
    red: 'text-red-700',
    yellow: 'text-yellow-700',
    green: 'text-green-700'
  }[config.color];

  const badgeClass = `badge badge-${config.color === 'red' ? 'red' : config.color === 'yellow' ? 'yellow' : 'green'}`;

  return (
    <div className={`card p-8 border-2 ${bgClass}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{t('marketAlert.title')}</p>
          <h3 className={`text-4xl font-bold ${textClass} mb-3`}>
            {config.icon} {result.signal}
          </h3>
          <p className="text-gray-700 text-sm">{config.description}</p>
        </div>
        <div className="text-5xl">{config.emoji}</div>
      </div>

      <div className="mt-6 pt-6 border-t-2 border-current border-opacity-20">
        <div className="flex items-center gap-3">
          <div className={`badge badge-${config.color === 'red' ? 'red' : config.color === 'yellow' ? 'yellow' : 'green'}`}>
            {result.signal.toUpperCase()}
          </div>
          <p className="text-xs text-gray-600">
            {config.color === 'red' && t('marketAlert.highSupply')}
            {config.color === 'yellow' && t('marketAlert.stable')}
            {config.color === 'green' && t('marketAlert.lowSupply')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketAlertCard;
