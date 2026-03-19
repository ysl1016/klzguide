import redeemCodesData from '@/data/redeem-codes.json';
import type { RedeemCodeData, RedeemCode } from '@/types/common';

const data = redeemCodesData as RedeemCodeData;

export function getActiveCodes(): RedeemCode[] {
  return data.codes.filter((c) => c.isActive);
}

export function getAllCodes(): RedeemCode[] {
  return data.codes;
}

export function getLastUpdated(): string {
  return data.lastUpdated;
}
