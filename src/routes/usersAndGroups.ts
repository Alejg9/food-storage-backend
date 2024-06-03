import { Router } from 'express';
import { getUsersFromGroup, getGroupsFromUser, deleteUsersFromGroup } from '../controllers/usersAndGroups';
import auth from '../auth';

const router = Router();

router.get('/usersAndGroups/users/:groupId',auth, getUsersFromGroup)
router.get('/usersAndGroups/:userId/groups',auth, getGroupsFromUser)
router.delete('/usersAndGroups/:userId/:groupId',auth, deleteUsersFromGroup)

export default router;