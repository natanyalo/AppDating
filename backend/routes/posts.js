const express= require('express')
const multer= require('multer')
const checkAuth= require("../middleware/check-auth")
const postControllers= require('../controllers/post')
const middlewarFile=require('../middleware/file')
 const router=express.Router()



//next for to prevent situion that the code stack because it
//is not send back response
router.get("",postControllers.getPosts)

router.post("",checkAuth, middlewarFile,postControllers.createPost)

router.put("",postControllers.upDataPost)


router.delete("/:id",checkAuth, middlewarFile,postControllers.deletePost)

module.exports=router;