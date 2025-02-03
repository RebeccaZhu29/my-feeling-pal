import { Schema } from 'mongoose';

interface IFeeling {
  feelingId: string;
  feelingType: FeelingType;
  description: string;
  date: Date;
}

type FeelingType = 'happy' | 'sad' | 'angry' | 'tired' | 'worried' | 'calm';

const feelingSchema = new Schema<IFeeling>({
  feelingId: {
    type: String,
    required: true
  },
  feelingType: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'tired', 'worried', 'calm']
  },
  description: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

export { type IFeeling, feelingSchema, FeelingType };
