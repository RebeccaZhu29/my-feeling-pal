import OpenAI from 'openai';
import dotenv from 'dotenv';
import { FeelingType } from '../models/Feeling';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface WellbeingTipOptions {
  feelingType: FeelingType;
  description: string;
}

// Default tips in case API fails
const defaultTips: Record<FeelingType, string> = {
  happy: 'Keep spreading positivity! Consider sharing your joy with others.',
  sad: 'It\'s okay to feel down. Try taking a few deep breaths or talking to someone you trust.',
  tired: 'Listen to your body. Consider getting some rest or taking a short nap.',
  angry: 'Take a step back and breathe deeply. Consider going for a walk or finding a quiet space to calm down.',
  worried: 'Focus on what you can control. Try making a list of actions you can take, or practice some mindful breathing.',
  calm: 'Embrace this peaceful moment. Consider doing something you enjoy while maintaining this balanced state.'
};

export const generateWellbeingTip = async ({ feelingType, description }: WellbeingTipOptions): Promise<string> => {
  try {
    const prompt = `Generate a 50-word wellbeing tip for someone who is feeling ${feelingType}. Their note says: "${description}". The tip should be supportive and actionable.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a supportive wellbeing advisor. Provide concise, practical tips in 50 words or less."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 0.7
    });

    const generatedTip = response.choices[0]?.message?.content?.trim();
    return generatedTip || defaultTips[feelingType];

  } catch (error) {
    console.error('Error generating wellbeing tip:', error);
    return defaultTips[feelingType];
  }
};