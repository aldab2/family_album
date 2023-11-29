import express from 'express';
import {login,
    registerFamily,
    getFamilyProfile,
    editFamilyProfile,
    deleteFamilyProfile,
    getUserProfile,
    logoutUser,
    addFamilyMember,
    changePassword,
    deleteFamilyMember,
    editFamilyMember
}  from '../controllers/authController.js';
import { protect } from '../middleware/authMidleware.js';

const router = express.Router();

router.post('/',login);
router.post('/family',registerFamily);
router.get('/family',protect,getFamilyProfile);
router.put('/family',protect,editFamilyProfile);
router.delete('/family',protect,deleteFamilyProfile);
router.route('/user')
    .post(protect,addFamilyMember)
    .get(protect,getUserProfile)
    .put(protect,editFamilyMember)
    .delete(protect,deleteFamilyMember)
router.put('/change-password',protect,changePassword)
router.post('/logout',logoutUser);

export default router;
