export interface Feeling {
  feelingId: string;
  date: string;
  feelingType: FeelingType;
  description: string;
}

export type FeelingType = 'happy' | 'sad' | 'tired' | 'calm' | 'worried' | 'angry';