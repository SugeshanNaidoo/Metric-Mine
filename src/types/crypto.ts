export interface Coin {
  id: string;
  symbol: string;
  name: string;
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
  };
  image: {
    small: string;
  };
}

export interface PriceHistory {
  prices: [number, number][];
}

export interface CoinSearchResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  market_cap_rank: number;
}