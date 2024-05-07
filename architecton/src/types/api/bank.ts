interface IBankInfoOut {
  bankTotal: number;
  bankFree: number;
  bankBankers: number;
}

interface IBalanceOut {
  bankAmount: number;
  bnkPerHour: number;
  bnkAmount: number;
}

export interface IBankHistoryOut {
  title: string;
  type: string;
  date: string;
  symbol: string;
  changes?: string;
}

export interface IAccountOut {
  id: number;
  firstName: string;
  lastName: string;
}

export interface IBankOut {
  balance?: IBalanceOut;
  bank: IBankInfoOut;
  histories: IBankHistoryOut[];
  account?: IAccountOut;
  referral?: string;
}

export interface IBankReferralOut {
  balance?: IBalanceOut;
  bank: IBankInfoOut;
  histories: IBankHistoryOut[];
  account?: IAccountOut;
}

export interface IBankReferralOut {
  bnkPerHour: number;
  bankReward: number;
  refCount: number;
  refBought: number;
}
