import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { type IFeeling, feelingSchema } from './Feeling.js';

interface IUser extends Document {
  email: string;
  password: string;
  savedFeelings: IFeeling[];
  wellbeingTip: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    savedFeelings: [feelingSchema],
    wellbeingTip: {
      type: String,
      required: false
    },
  }
);

// hash user password
userSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);
export { type IUser, userSchema };
export default User;
