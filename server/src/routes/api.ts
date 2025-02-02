import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/generate-tip', async (req, res) => {
  try {
    const { feeling, prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a supportive wellbeing assistant. Provide concise, practical advice."
        },
        {
          role: "user",
          content: prompt || `Generate a 50-word wellbeing tip for someone who is feeling ${feeling}. The tip should be supportive and actionable.`
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const tip = completion.choices[0]?.message?.content || 'Take care of yourself today!';
    res.json({ tip });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate tip' });
  }
});

export default router;