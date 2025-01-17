import express from 'express';
import {
    newPost,
    deletePost,
    getPost,
    editPost,
    minioUploadExample,
    editPostVisibility
} from '../controllers/postController.js'
import {
    addComment,
    editComment,
    deleteComment
} from '../controllers/commentController.js'
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router()

router.use(protect)

router.post('/', upload.single('file'),newPost);
router.put('/', editPost);
router.delete('/', deletePost);
router.get('/', getPost)
router.post('/mediaExample',upload.single('file') ,minioUploadExample);
router.put("/visibility",editPostVisibility)
router.post('/comment', addComment)
router.put('/comment', editComment)
router.delete('/comment', deleteComment)
export default router