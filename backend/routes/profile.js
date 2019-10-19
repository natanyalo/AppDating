import { Router } from 'express'
//const multer= require('multer')
import checkAuth from "../middleware/check-auth"
import middlewarFile from '../middleware/file'
import { saveProfile, upDataProfile, getProfile } from '../controllers/profile'

 const router=Router()
  
 // function call without () is mean ref to function

router.post("",checkAuth,middlewarFile, saveProfile)
router.put("",checkAuth,middlewarFile, upDataProfile)
router.get("",checkAuth ,getProfile)


export default router;