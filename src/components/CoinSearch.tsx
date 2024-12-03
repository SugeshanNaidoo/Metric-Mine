import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { searchCoins } from '../services/api';
import type { CoinSearchResult } from '../types/crypto';

interface CoinSearchProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const CoinSearch: React.FC<CoinSearchProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Search for a coin...',
}) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: searchResults = [], isLoading, error } = useQuery({
    queryKey: ['coinSearch', search],
    queryFn: () => searchCoins(search),
    enabled: search.length > 1,
    staleTime: 60000,
    retry: false,
    gcTime: 0, // Disable caching to prevent stale data issues
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setIsOpen(Boolean(newSearch));
  };

  const handleSelectCoin = (coin: CoinSearchResult) => {
    onChange(coin.id);
    setSearch(coin.name);
    setIsOpen(false);
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onFocus={() => setIsOpen(Boolean(search))}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>

      {isOpen && search.length > 1 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">Failed to search coins. Please try again.</div>
          ) : searchResults.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No coins found</div>
          ) : (
            <ul className="py-1">
              {searchResults.map((coin) => (
                <li
                  key={coin.id}
                  onClick={() => handleSelectCoin(coin)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                >
                  <img src={coin.thumb} alt={coin.name} className="w-5 h-5" />
                  <span className="font-medium">{coin.name}</span>
                  <span className="text-gray-500 text-sm">({coin.symbol.toUpperCase()})</span>
                  {coin.market_cap_rank && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      Rank #{coin.market_cap_rank}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};