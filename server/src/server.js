import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import healthRoutes from './routes/health.routes.js';
import planRoutes from './routes/plan.routes.js';

const app = express();

app.use(cors({ origin: env.clientOrigin }));
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api', planRoutes);

app.listen(env.port, () => {
  console.log(`FitGen AI server running on port ${env.port}`);
});