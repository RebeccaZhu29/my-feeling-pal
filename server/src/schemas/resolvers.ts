import type IUserContext from '../interfaces/UserContext.js';
import { User, Feeling, FeelingType } from '../models/index.js';
import { IUser } from '../models/User.js';
import { signToken, AuthenticationError } from '../services/auth-service.js';
import { generateWellbeingTip } from '../services/wellbeing-service.js';
import { Types } from 'mongoose';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: IUserContext): Promise<IUser | null> => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('User not authenticated');
    },
    feelings: async () => {
      return Feeling.find();
    },
  },
  Mutation: {
    addUser: async (_parent: any, args: any): Promise<{ token: string; user: IUser }> => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);

      return { token, user };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: IUser }> => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    addFeeling: async (_parent: any, { feelingType }: { feelingType: FeelingType }, context: IUserContext): Promise<IUser | null> => {
      if (context.user) {
        // Generate the standardized description
        const description = `I am feeling ${feelingType}`;

        const newFeeling = await Feeling.create({
          feelingId: new Types.ObjectId().toString(),
          feelingType,
          description,
          date: new Date()
        });

        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedFeelings: newFeeling } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('User not authenticated');
    },
    updateFeeling: async (_parent: any, { feelingData }: { feelingData: any }, context: IUserContext): Promise<IUser | null> => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }

      try {
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: context.user._id,
            'savedFeelings.feelingId': feelingData.feelingId
          },
          {
            $set: {
              'savedFeelings.$.description': feelingData.description,
            }
          },
          { new: true }
        );

        if (!updatedUser) {
          throw new Error('Feeling not found');
        }

        return updatedUser;
      } catch (error) {
        throw new Error(`Failed to update feeling: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    removeFeeling: async (_parent: any, { feelingId }: { feelingId: string }, context: IUserContext): Promise<IUser | null> => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedFeelings: { feelingId } } },
          { new: true }
        );

        if (!updatedUser) {
          throw new Error('User not found');
        }

        return updatedUser;
      } catch (error) {
        throw new Error(`Failed to remove feeling: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    generateTip: async (_parent: any, { feelingType }: { feelingType: FeelingType }, context: IUserContext): Promise<{ tip: string } | null> => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }
      const wellbeingTip = await generateWellbeingTip(feelingType);
      await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { wellbeingTip: wellbeingTip } },
        { new: true }
      );
      return { tip: wellbeingTip };
    },
  },
};

export default resolvers;
