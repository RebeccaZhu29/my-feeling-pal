import type { Feeling } from './Feeling';

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  saveFeelings: Feeling[] | null;
  wellbeingTip: string | null;
}
