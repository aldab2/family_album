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
    editFamilyMember,
    verifyCode
}  from '../controllers/authController.js';
import { sendVerificationEmail } from '../utils/emailUtils.js';
import { protect } from '../middleware/authMidleware.js';
import rateLimit from 'express-rate-limit';
const router = express.Router();


// Create rate limit middleware configured for 1 request per minute
const sendVerificationEmailLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 1 minute in milliseconds
  max: 1, // Limit each IP to 1 request per `window` (here, per minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {message: "You can only send one verification email per minute"}, // Custom message
}); 

router.post('/',login);
router.post('/family',registerFamily);
router.get('/send-verification-email',protect,sendVerificationEmailLimiter, sendVerificationEmail);
router.post('/verify-code',protect, verifyCode);
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
