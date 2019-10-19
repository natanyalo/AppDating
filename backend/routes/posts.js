import { Router } from 'express'
import multer from 'multer'
import checkAuth from "../middleware/check-auth"
import { getPosts, createPost, upDataPost, deletePost } from '../controllers/post'
import middlewarFile from '../middleware/file'
 const router=Router()



//next for to prevent situion that the code stack because it
//is not send back response
router.get("",getPosts)

router.post("",checkAuth, middlewarFile,createPost)

router.put("",upDataPost)


router.delete("/:id",checkAuth, middlewarFile,deletePost)

export default router;