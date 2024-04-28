interface IBankInfoOut {
  bankTotal: number;
  bankFree: number;
  bankBankers: number;
}

export interface IBankOut {
  [x: string]: any;
  bank: IBankInfoOut;
}
