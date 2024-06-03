import { Router } from 'express';
import { inviteUser } from '../controllers/invite';
import auth from '../auth';

const router = Router();

router.post('/invite/:email', auth, inviteUser)


export default router;