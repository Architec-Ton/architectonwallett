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

export interface IBankOut {
  balance?: IBalanceOut;
  bank: IBankInfoOut;
}

export interface IBankHistoryOut {
  title: string;
  type: string;
  date: string;
  symbol: string;
  changes?: string;
}
