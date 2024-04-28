import { BE_URL } from '../constants';

export function getBank(address: string) {
  return `${BE_URL}/bank/${address}`;
}
