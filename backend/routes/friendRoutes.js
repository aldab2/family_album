import express from 'express';
import {
    getFriendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFamilyFriends,
    removeFamilyFriend
} from '../controllers/friendController.js'

import { protect, isParent } from '../middleware/authMiddleware.js';
import { editFamilyMember, editFamilyProfile } from '../controllers/authController.js';

const router = express.Router();

// http://localhost:5000/api/friend/request
router.get('/request', protect, getFriendRequests)
router.post('/request', protect, isParent, sendFriendRequest)
router.post('/acceptRequest', protect, isParent, acceptFriendRequest)
router.post('/rejectRequest', protect, isParent, rejectFriendRequest)
router.get('/getFamilyFriends', protect, getFamilyFriends)
router.post('/removeFamilyFriend', protect, isParent, removeFamilyFriend)

export default router;