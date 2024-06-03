import { Router } from 'express';
import { signIn } from '../controllers/auth';

const router = Router();

router.post('/signIn', signIn)

export default router;