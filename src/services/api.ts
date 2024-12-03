import axios, { AxiosError } from 'axios';
import type { Coin, PriceHistory, CoinSearchResult } from '../types/crypto';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (axiosError.response?.status === 404) {
      throw new Error('Coin not found. Please check the coin ID and try again.');
    }
    if (axiosError.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your connection and try again.');
    }
    throw new Error(axiosError.message || 'An error occurred while fetching data.');
  }
  throw error;
};

export const getCoinData = async (coinId: string): Promise<Coin> => {
  try {
    if (!coinId.trim()) {
      throw new Error('Coin ID is required');
    }

    const { data } = await api.get(`/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false,
      },
    });
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const searchCoins = async (query: string): Promise<CoinSearchResult[]> => {
  try {
    if (!query.trim()) {
      return [];
    }

    const { data } = await api.get('/search', {
      params: { query }
    });

    if (!data.coins || !Array.isArray(data.coins)) {
      console.warn('Unexpected API response format:', data);
      return [];
    }

    // Map the response to a simpler structure to avoid Symbol cloning issues
    return data.coins.slice(0, 10).map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      thumb: coin.thumb,
      market_cap_rank: coin.market_cap_rank
    }));
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};