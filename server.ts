import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Nestora Home Design AI' });
  });

  // Lazy Gemini client helper
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!process.env.GEMINI_API_KEY) {
      return null;
    }
    if (!aiClient) {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return aiClient;
  }

  // Gemini advice endpoint
  app.post('/api/gemini/advice', async (req, res) => {
    try {
      const { userQuery, context } = req.body;
      const client = getGeminiClient();

      if (!client) {
        return res.json({
          source: 'local_engine',
          reply: `As your Baya Weaver companion, I recommend balancing your space with calming natural tones. For ${context?.roomType || 'your room'}, ensure adequate ambient lighting and consider natural earthy textures like teak wood and linen.`,
        });
      }

      const prompt = `You are Nesto, a friendly, warm Baya Weaver bird and home design companion for Nestora ("Weave Your Dream Home").
You speak in short, encouraging, jargon-free sentences. Never use intimidating interior-design jargon.
Help the user make confident home design choices.
User context: ${JSON.stringify(context || {})}
User question: "${userQuery}"

Provide a concise, thoughtful response (2-3 sentences max) with practical home advice and encouragement.`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
      });

      res.json({
        source: 'gemini',
        reply: response.text || 'Let us weave a cozy and harmonious space for your home.',
      });
    } catch (error: any) {
      console.warn('Gemini advice fallback:', error?.message);
      res.json({
        source: 'fallback',
        reply: 'I recommend pairing gentle sage or warm sand tones with soft warm lighting to make your space feel spacious and peaceful.',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nestora Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
