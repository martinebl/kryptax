import { getContext, setContext } from 'svelte';
import type { ICryptoToFiatConverter } from '$lib/types';

const CRYPTO_CONVERTER_KEY = Symbol('cryptoToFiatConverter');

export const setCryptoConverter = (converter: ICryptoToFiatConverter) =>
  setContext(CRYPTO_CONVERTER_KEY, converter);

export const getCryptoConverter = (): ICryptoToFiatConverter =>
  getContext(CRYPTO_CONVERTER_KEY);
