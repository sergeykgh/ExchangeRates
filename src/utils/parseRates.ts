import { ExchangeRate } from '../types/exchangeRates';

export const parseRates = (text: string): ExchangeRate[] => {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.includes('#') && !line.includes('Country|Currency|'))
    .map(line => {
      const parts = line.split('|').map(part => part.trim());
      if (parts.length !== 5) {
        return null;
      }
      const [country, currency, amountStr, code, rateStr] = parts;
      const amount = parseFloat(amountStr);
      const rate = parseFloat(rateStr);
      if (isNaN(amount) || isNaN(rate)) {
        return null;
      }
      return {
        country,
        currency,
        amount,
        code,
        rate,
      } as ExchangeRate;
    })
    .filter((rate): rate is ExchangeRate => rate !== null);
};