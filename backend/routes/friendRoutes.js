import express from 'express';
import {
    getFriendRequests,
    addFriendRequest,
    acceptFriendRequest,
    rejectFriendrequest,
    getFamilyFriends,
    removeFamilyFriend
} from '../controllers/friendController.js'

import { protect, isParent } from '../middleware/authMidleware.js';

const router = express.Router();

// http://localhost:5000/api/friend/request
router.get('/request', protect, getFriendRequests)
router.post('/request', protect, isParent, addFriendRequest)
router.post('/acceptRequest', protect, isParent, acceptFriendRequest)
router.post('/rejectRequest', protect, isParent, rejectFriendrequest)
router.get('/getFamilyFriends', protect, getFamilyFriends)
router.post('/removeFamilyFriend', protect, isParent, removeFamilyFriend)

export default router;