import express from 'express';
import {
    newPost,
    deletePost,
    getPost,
    editPost
} from '../controllers/postController.js'
import {
    addComment,
    editComment,
    deleteComment
} from '../controllers/commentController.js'
import { protect } from '../middleware/authMidleware.js';
const router = express.Router()

router.use(protect)

router.post('/', newPost);
router.put('/', editPost);
router.delete('/', deletePost);
router.get('/', getPost);

router.post('/comment', addComment)
router.put('/comment', editComment)
router.delete('/comment', deleteComment)
export default router