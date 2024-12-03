import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, ArrowRightLeft } from 'lucide-react';
import { formatNumber } from '../utils/formatters';
import { Coin } from '../types/crypto';

interface CoinComparisonProps {
  coinA: Coin;
  coinB: Coin;
}

export const CoinComparison: React.FC<CoinComparisonProps> = ({ coinA, coinB }) => {
  const hypotheticalPrice = (coinA.market_data.market_cap.usd / coinB.market_data.market_cap.usd) * coinB.market_data.current_price.usd;
  const priceDifference = hypotheticalPrice - coinB.market_data.current_price.usd;
  const percentageDifference = (priceDifference / coinB.market_data.current_price.usd) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Coin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Coin A Card */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-4">
            <img src={coinA.image.small} alt={coinA.name} className="w-8 h-8" />
            <div>
              <h3 className="font-bold text-lg">{coinA.name}</h3>
              <p className="text-gray-500 text-sm">{coinA.symbol.toUpperCase()}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Price</span>
              </div>
              <span className="font-semibold">${formatNumber(coinA.market_data.current_price.usd)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Market Cap</span>
              </div>
              <span className="font-semibold">${formatNumber(coinA.market_data.market_cap.usd)}</span>
            </div>
          </div>
        </div>

        {/* Coin B Card */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-4">
            <img src={coinB.image.small} alt={coinB.name} className="w-8 h-8" />
            <div>
              <h3 className="font-bold text-lg">{coinB.name}</h3>
              <p className="text-gray-500 text-sm">{coinB.symbol.toUpperCase()}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Price</span>
              </div>
              <span className="font-semibold">${formatNumber(coinB.market_data.current_price.usd)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Market Cap</span>
              </div>
              <span className="font-semibold">${formatNumber(coinB.market_data.market_cap.usd)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Market Cap Comparison */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold mb-4">Market Cap Comparison Analysis</h4>
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <ArrowRightLeft className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Market Cap Ratio</span>
          </div>
          <p className="text-blue-800">
            {coinA.name}'s market cap is {formatNumber(coinA.market_data.market_cap.usd / coinB.market_data.market_cap.usd)}x 
            {coinB.name}'s market cap
          </p>
        </div>

        <div className={`rounded-lg p-4 ${
          hypotheticalPrice > coinB.market_data.current_price.usd 
            ? 'bg-green-50' 
            : 'bg-red-50'
        }`}>
          <div className="flex items-center space-x-2 mb-3">
            {hypotheticalPrice > coinB.market_data.current_price.usd ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
            <span className={`font-medium ${
              hypotheticalPrice > coinB.market_data.current_price.usd 
                ? 'text-green-800' 
                : 'text-red-800'
            }`}>
              Hypothetical Price Analysis
            </span>
          </div>
          <div className="space-y-2">
            <p className={hypotheticalPrice > coinB.market_data.current_price.usd ? 'text-green-800' : 'text-red-800'}>
              If {coinB.name} had {coinA.name}'s market cap:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li className="text-gray-700">Price would be: <span className="font-semibold">${formatNumber(hypotheticalPrice)}</span></li>
              <li className="text-gray-700">
                Difference: <span className="font-semibold">${formatNumber(Math.abs(priceDifference))} ({formatNumber(Math.abs(percentageDifference))}%)</span>
                {priceDifference > 0 ? ' higher' : ' lower'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};