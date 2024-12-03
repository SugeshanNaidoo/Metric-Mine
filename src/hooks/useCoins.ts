import { useQueries } from '@tanstack/react-query';
import { getCoinData } from '../services/api';
import type { Coin } from '../types/crypto';

interface UseCoinsPair {
  coinAId: string;
  coinBId: string;
}

interface CoinData {
  coin?: Coin;
  isLoading: boolean;
  error: unknown;
}

export function useCoins({ coinAId, coinBId }: UseCoinsPair): [CoinData, CoinData] {
  const results = useQueries({
    queries: [
      {
        queryKey: ['coin', coinAId],
        queryFn: () => getCoinData(coinAId),
        enabled: Boolean(coinAId),
        retry: (failureCount, error) => {
          if (error instanceof Error && error.message.includes('not found')) {
            return false;
          }
          return failureCount < 2;
        },
        staleTime: 30000,
      },
      {
        queryKey: ['coin', coinBId],
        queryFn: () => getCoinData(coinBId),
        enabled: Boolean(coinBId),
        retry: (failureCount, error) => {
          if (error instanceof Error && error.message.includes('not found')) {
            return false;
          }
          return failureCount < 2;
        },
        staleTime: 30000,
      },
    ],
  });

  const [coinAData, coinBData] = results;

  return [
    {
      coin: coinAData.data,
      isLoading: coinAData.isLoading,
      error: coinAData.error,
    },
    {
      coin: coinBData.data,
      isLoading: coinBData.isLoading,
      error: coinBData.error,
    },
  ];
}