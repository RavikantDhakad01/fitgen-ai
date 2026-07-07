import { Router } from 'express';
import { postGeneratePlan } from '../controllers/plan.controller.js';

const router = Router();

router.post('/generate-plan', postGeneratePlan);

export default router;