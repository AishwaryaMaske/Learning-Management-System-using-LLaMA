import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRoutes from './server/routes/auth';
import llamaRoutes from './server/routes/llama';
import searxngRoutes from './server/routes/searxng';
import youtubeRoutes from './server/routes/youtube';
import feedbackRoutes from './server/routes/feedback';
import agentRoutes from './server/routes/queryRouter';
import pathwayRoutes from './server/routes/pathways';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Mount API Endpoints
  app.use('/api/auth', authRoutes);
  app.use('/api/llama', llamaRoutes);
  app.use('/api/searxng', searxngRoutes);
  app.use('/api/youtube', youtubeRoutes);
  app.use('/api/feedback', feedbackRoutes);
  app.use('/api/agent', agentRoutes);
  app.use('/api/pathways', pathwayRoutes);

  // System Diagnostics and Connection Prober
  app.get('/api/system/health', async (_req: Request, res: Response) => {
    const ollamaUrl = process.env.OLLAMA_ENDPOINT || 'http://localhost:11434';
    const searxngUrl = process.env.SEARXNG_ENDPOINT || 'http://localhost:8080';
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_llama_db';
    const hasYouTubeKey = Boolean(process.env.YOUTUBE_API_KEY);

    let ollamaStatus: 'connected' | 'simulated' = 'simulated';
    try {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), 1200);
      const r = await fetch(`${ollamaUrl}/api/tags`, { signal: c.signal });
      clearTimeout(t);
      if (r.ok) ollamaStatus = 'connected';
    } catch {
      ollamaStatus = 'simulated';
    }

    let searxngStatus: 'connected' | 'simulated' = 'simulated';
    try {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), 1200);
      const r = await fetch(`${searxngUrl}/healthz`, { signal: c.signal });
      clearTimeout(t);
      if (r.ok) searxngStatus = 'connected';
    } catch {
      searxngStatus = 'simulated';
    }

    return res.json({
      status: 'operational',
      timestamp: new Date().toISOString(),
      project: {
        title: 'Learning Management System using LLaMA and SearXNG',
        authors: [
          'Aishwarya Maske (102)',
          'Abhijeet Konar (131)',
          'Pawan Balpande (160)',
          'Pralendra Behera (161)',
          'Samyak Labhane (165)',
        ],
        guide: 'Prof. Priti Matre',
        institution: 'Yeshwantrao Chavan College of Engineering (YCCE), Nagpur',
        publication: 'Hinweis International Conference on Recent Trends in Engineering and Technology (RTET-2024)',
      },
      services: {
        ollama: {
          endpoint: ollamaUrl,
          model: process.env.OLLAMA_MODEL || 'llama3:8b',
          status: ollamaStatus,
          modeDescription: ollamaStatus === 'connected' ? 'Live Local Inference' : 'Demonstration Simulator Active',
        },
        searxng: {
          endpoint: searxngUrl,
          status: searxngStatus,
          modeDescription: searxngStatus === 'connected' ? 'Live Metasearch Proxy' : 'Privacy-Preserving Dataset Active',
        },
        youtube: {
          status: hasYouTubeKey ? 'configured' : 'simulated',
          modeDescription: hasYouTubeKey ? 'Live YouTube Data API v3' : 'Curated Educational Video Bank Active',
        },
        mongodb: {
          uri: mongoUri,
          status: 'simulated',
          modeDescription: 'High-Speed In-Memory Mock Store with Full MongoDB Schemas',
        },
      },
    });
  });

  // Vite development middleware integration
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LMS LLaMA & SearXNG Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[Fatal Error starting LMS server]:', err);
});
