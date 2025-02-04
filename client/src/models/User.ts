import type { Feeling } from './Feeling';

export interface User {
  email: string | null;
  password: string | null;
  saveFeelings: Feeling[] | null;
  wellbeingTip: string | null;
}
