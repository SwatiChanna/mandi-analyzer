import React from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PriceTrendChart = ({ result }) => {
  const { t } = useTranslation();
  // Prepare data for chart
  const data = [];
  
  // Past 7 days (labeled as Day -7 to Day -1)
  for (let i = 0; i < result.pastPrices.length; i++) {
    data.push({
      day: `Day ${-7 + i}`,
      pastPrice: result.pastPrices[i],
      predictedPrice: null,
      type: 'past'
    });
  }
  
  // Next 7 days (labeled as Day 1 to Day 7)
  for (let i = 0; i < result.predictedPrices.length; i++) {
    data.push({
      day: `Day ${i + 1}`,
      pastPrice: null,
      predictedPrice: result.predictedPrices[i],
      type: 'predicted'
    });
  }

  return (
    <div className="card p-8 bg-white">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>📈</span> {t('chart.title')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('chart.description', { crop: result.crop })}
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Price (₹)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '10px'
              }}
              formatter={(value) => value ? `₹${value.toFixed(0)}` : '-'}
              labelStyle={{ color: '#374151' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="line"
            />
            
            {/* Past prices line */}
            <Line
              type="monotone"
              dataKey="pastPrice"
              name="Past Prices (History)"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls={false}
              isAnimationActive={true}
            />
            
            {/* Predicted prices line */}
            <Line
              type="monotone"
              dataKey="predictedPrice"
              name="Predicted Prices (Next 7 Days)"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls={false}
              isAnimationActive={true}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-blue-700 text-sm font-semibold">{t('chart.avgPast')}</p>
          <p className="text-2xl font-bold text-blue-600">
            ₹{Math.round(result.pastPrices.reduce((a, b) => a + b, 0) / result.pastPrices.length)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-green-700 text-sm font-semibold">{t('chart.avgPredicted')}</p>
          <p className="text-2xl font-bold text-green-600">
            ₹{Math.round(result.predictedPrices.reduce((a, b) => a + b, 0) / result.predictedPrices.length)}
          </p>
        </div>
        <div className={`p-4 rounded-lg border-l-4 ${
          result.signal === 'Surplus' ? 'bg-red-50 border-red-500' : 
          result.signal === 'Stable' ? 'bg-yellow-50 border-yellow-500' : 
          'bg-green-50 border-green-500'
        }`}>
          <p className={`text-sm font-semibold ${
            result.signal === 'Surplus' ? 'text-red-700' : 
            result.signal === 'Stable' ? 'text-yellow-700' : 
            'text-green-700'
          }`}>
            {t('chart.trendSignal')}
          </p>
          <p className={`text-2xl font-bold ${
            result.signal === 'Surplus' ? 'text-red-600' : 
            result.signal === 'Stable' ? 'text-yellow-600' : 
            'text-green-600'
          }`}>
            {result.signal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceTrendChart;
