export interface PriorityAssetResult {
  readonly priorityAsset: string;
  readonly prioritySide: 'from' | 'to';
}

const buildPriorityMap = (list: string[]): Map<string, number> =>
  new Map(list.map((symbol, index) => [symbol.toUpperCase(), index]));

/** Given two assets in a trade, determine which asset's exchange rate should
 *  be used based on the jurisdiction's priority list.
 *  Returns `null` when neither asset appears on the list or no list is provided. */
export const resolvePriorityAsset = (
  fromAsset: string,
  toAsset: string,
  priorityList: string[] | undefined,
): PriorityAssetResult | null => {
  if (!priorityList || priorityList.length === 0) return null;

  const map = buildPriorityMap(priorityList);
  const fromIndex = map.get(fromAsset.toUpperCase());
  const toIndex = map.get(toAsset.toUpperCase());

  if (fromIndex === undefined && toIndex === undefined) return null;

  if (fromIndex === undefined) return { priorityAsset: toAsset, prioritySide: 'to' };
  if (toIndex === undefined) return { priorityAsset: fromAsset, prioritySide: 'from' };

  return fromIndex <= toIndex
    ? { priorityAsset: fromAsset, prioritySide: 'from' }
    : { priorityAsset: toAsset, prioritySide: 'to' };
};
