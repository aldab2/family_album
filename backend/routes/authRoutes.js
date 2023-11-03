import express from 'express';
import {authUser,
    registerFamily,
    getFamilyProfile,
    editFamilyProfile,
    deleteFamilyProfile,
    createUser,
    getUserProfile,
    editUser,
    deleteUser,
    logoutUser
}  from '../controllers/authController.js';
import { protect } from '../middleware/authMidleware.js';

const router = express.Router();

router.post('/',authUser);
router.post('/family',registerFamily);
router.get('/family',protect,getFamilyProfile);
router.put('/family',protect,editFamilyProfile);
router.delete('/family',protect,deleteFamilyProfile);
router.route('/user').post(protect,createUser).get(protect,getUserProfile).put(protect,editUser).delete(protect,deleteUser)
router.post('/logout',logoutUser);


export default router;
