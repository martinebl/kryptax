import BigNumber from 'bignumber.js';
import type { ICryptoToFiatConverter } from '$lib/types';

/** Hardcoded rates for development and testing. Not for production use. */
const MOCK_RATES: Record<string, Record<string, number>> = {
  BTC: { USD: 66000, EUR: 50000, DKK: 433000 },
  ETH: { USD: 3000, EUR: 2750, DKK: 20500 },
  SOL: { USD: 150, EUR: 138, DKK: 1025 },
  BUSD: {USD: 1, EUR: 0.9, DKK: 6.6},
  USDT: {USD: 1, EUR: 0.9, DKK: 6.6},
  USDC: {USD: 1, EUR: 0.9, DKK: 6.6},
  TRX: {USD: 0.5, EUR: 0.4, DKK: 2.2},
  BNB: {USD: 400, EUR: 350, DKK: 4000},
};

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const createMockCryptoToFiatConverter = (delayMs = 30): ICryptoToFiatConverter => ({
  getRate: async (asset: string, fiatCurrency: string, _datetime: Date): Promise<BigNumber> => {
    if (delayMs > 0) await sleep(delayMs);
    const rate = MOCK_RATES[asset.toUpperCase()]?.[fiatCurrency.toUpperCase()];
    if (rate === undefined) {
      throw new Error(`No mock rate for ${asset}/${fiatCurrency}`);
    }
    return new BigNumber(rate);
  },
});
