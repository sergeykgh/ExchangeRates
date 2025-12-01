import { useQuery } from '@tanstack/react-query';
import { parseRates } from '../utils/parseRates';

const API_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ['exchangeRates'],
    queryFn: async (): Promise<ExchangeRate[]> => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch rates: ${response.statusText}`);
      }
      const text = await response.text();
      return parseRates(text);
    },
    staleTime: 1000 * 60 * 60, 
    refetchOnWindowFocus: true,
  });
};