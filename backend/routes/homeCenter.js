import { Router } from 'express'
//const multer= require('multer')
import checkAuth from "../middleware/check-auth"
import { getUsers, addWant } from '../controllers/homeCenter'
//const middlewarFile=require('../middleware/file')
 const router=Router()



//next for to prevent situion that the code stack because it
//is not send back response
router.get("",getUsers)
router.post("/want",checkAuth,addWant)
export default router;