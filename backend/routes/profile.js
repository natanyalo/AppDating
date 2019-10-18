const express= require('express')
const multer= require('multer')
const checkAuth= require("../middleware/check-auth")
const middlewarFile=require('../middleware/file')
const profileControllers=require('../controllers/profile')

 const router=express.Router()
  
 // function call without () is mean ref to function

router.post("",checkAuth,middlewarFile, profileControllers.saveProfile)
router.put("",checkAuth,middlewarFile, profileControllers.upDataProfile)
router.get("",checkAuth ,profileControllers.getProfile)


module.exports=router;