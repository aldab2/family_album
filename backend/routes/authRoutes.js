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

const router = express.Router();

router.post('/',authUser);
router.post('/family',registerFamily);
router.get('/family',getFamilyProfile);
router.put('/family',editFamilyProfile);
router.delete('/family',deleteFamilyProfile);
router.route('/user').post(createUser).get(getUserProfile).put(editUser).delete(deleteUser)
router.post('/logout',logoutUser);


export default router;
