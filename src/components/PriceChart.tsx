import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PriceHistory } from '../types/crypto';

interface PriceChartProps {
  dataA: PriceHistory;
  dataB: PriceHistory;
  coinAName: string;
  coinBName: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({
  dataA,
  dataB,
  coinAName,
  coinBName,
}) => {
  const chartData = dataA.prices.map((item, index) => ({
    timestamp: new Date(item[0]).toLocaleDateString(),
    [coinAName]: item[1],
    [coinBName]: dataB.prices[index]?.[1],
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Price Comparison Chart</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={coinAName}
            stroke="#8884d8"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey={coinBName}
            stroke="#82ca9d"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};