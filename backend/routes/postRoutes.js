import express from 'express';
import {
    newPost,
    deletePost,
    getPost,
    editPost,
    minioUploadExample
} from '../controllers/postController.js'
import {
    addComment,
    editComment,
    deleteComment
} from '../controllers/commentController.js'
import { protect } from '../middleware/authMidleware.js';
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router()

router.use(protect)

router.post('/', newPost);
router.put('/', editPost);
router.delete('/', deletePost);
router.get('/', getPost)
router.post('/mediaExample',upload.single('file') ,minioUploadExample);

router.post('/comment', addComment)
router.put('/comment', editComment)
router.delete('/comment', deleteComment)
export default router