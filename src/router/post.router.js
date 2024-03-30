import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwtToken } from "../controllers/auth.controller.js";
import { createNewPost, deletePost } from "../controllers/post.controller.js";
import likePost from "../controllers/like.controller.js";

const router = Router()

router.post('/post',upload.single('content'),verifyJwtToken,createNewPost)
router.delete('/post/delete/:postId',deletePost)
router.get('/post/like/:postId',verifyJwtToken,likePost)



export default router