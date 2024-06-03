import { Router } from 'express';
import { getGroups, getGroup, saveGroup, updateGroup, deleteGroup } from '../controllers/groups';
import auth from '../auth';

const router = Router();

router.get('/groups', auth, getGroups)

router.get('/groups/:id', auth, getGroup)

router.post('/groups', auth, saveGroup)

router.put('/groups/:id', auth, updateGroup)

router.delete('/groups/:id', auth, deleteGroup)

export default router;