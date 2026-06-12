import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import redis from 'redis';

// Importar rotas
import bibleRoutes from './routes/bible.routes';
import authRoutes from './routes/auth.routes';
import feedRoutes from './routes/feed.routes';
import aiRoutes from './routes/ai.routes';
import socialRoutes from './routes/social.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Inicializar banco de dados
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Inicializar Redis
export const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.connect().catch(console.error);

// Verificar conexão com banco
pool.on('connect', () => {
  console.log('✅ Conectado ao PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Erro no PostgreSQL:', err);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Lumina Backend',
  });
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/bible', bibleRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/users', userRoutes);

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path,
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
  🙏 LUMINA Backend iniciado com sucesso!
  
  📡 Servidor rodando em: http://localhost:${PORT}
  🏥 Health check: http://localhost:${PORT}/api/health
  📖 API Docs: http://localhost:${PORT}/api/docs
  
  ${new Date().toLocaleString()}
  `);
});

export default app;
