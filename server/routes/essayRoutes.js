import express from 'express';
import { generateEssay } from '../controllers/essayController.js';

const router = express.Router();

router.post('/generate', generateEssay);

export default router;