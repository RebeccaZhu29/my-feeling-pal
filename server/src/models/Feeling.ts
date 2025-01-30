import { Schema, model, type Document } from 'mongoose';

interface IFeeling extends Document {
  feelingId: string;
  feelingType: FeelingType;
  description: string;
  wellbeingTip: string;
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
  wellbeingTip: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Feeling = model<IFeeling>('Feeling', feelingSchema);
export { type IFeeling, feelingSchema, FeelingType };
export default Feeling;
