import React, { useState } from 'react';
import { Header } from './components/Header';
import { CoinSearch } from './components/CoinSearch';
import { CoinComparison } from './components/CoinComparison';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useCoins } from './hooks/useCoins';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [coinAId, setCoinAId] = useState('bitcoin');
  const [coinBId, setCoinBId] = useState('ethereum');

  const [coinAData, coinBData] = useCoins({ coinAId, coinBId });

  const isLoading = coinAData.isLoading || coinBData.isLoading;
  const error = coinAData.error || coinBData.error;
  const hasData = coinAData.coin && coinBData.coin;

  const handleCoinAChange = (newId: string) => {
    if (newId === coinBId) {
      console.warn('Cannot compare the same coin');
      return;
    }
    setCoinAId(newId);
  };

  const handleCoinBChange = (newId: string) => {
    if (newId === coinAId) {
      console.warn('Cannot compare the same coin');
      return;
    }
    setCoinBId(newId);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Header />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <CoinSearch
              label="First Coin"
              value={coinAId}
              onChange={handleCoinAChange}
              placeholder="Search for any cryptocurrency..."
            />
            <CoinSearch
              label="Second Coin"
              value={coinBId}
              onChange={handleCoinBChange}
              placeholder="Search for any cryptocurrency..."
            />
          </div>

          {error && (
            <ErrorMessage 
              message={
                error instanceof Error 
                  ? error.message 
                  : "Failed to fetch coin data. Please check your connection and try again."
              } 
            />
          )}

          {isLoading && <LoadingSpinner />}

          {hasData && !error && !isLoading && (
            <div className="space-y-8">
              <CoinComparison 
                coinA={coinAData.coin!} 
                coinB={coinBData.coin!} 
              />
            </div>
          )}
        </div>
      </div>
      <Analytics/>
    </ErrorBoundary>
  );
}

export default App;
