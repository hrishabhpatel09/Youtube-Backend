import { Router} from "express";
import {changePassword, getUserProfile, loginUser, logoutUser, registerUser} from '../controllers/user.controller.js'
import { upload } from "../middleware/multer.middleware.js";
import {verifyJwtToken} from '../controllers/auth.controller.js'
import { follow } from "../controllers/follower.controller.js";


const router = Router()

router.route('/register').post(upload.single('avatarImage'),registerUser)
router.post('/login',upload.none(),loginUser)
router.get('/logout',logoutUser)
router.post('/changepassword',upload.none(),changePassword)
router.get('/profile',upload.none(),verifyJwtToken,getUserProfile)
router.get('/:name/follow',verifyJwtToken,follow)
export default router 