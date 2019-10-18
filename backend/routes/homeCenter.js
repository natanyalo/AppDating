const express= require('express')
const multer= require('multer')
const checkAuth= require("../middleware/check-auth")
const centerControllers= require('../controllers/homeCenter')
const middlewarFile=require('../middleware/file')
 const router=express.Router()



//next for to prevent situion that the code stack because it
//is not send back response
router.get("",centerControllers.getUsers)
router.post("/want",checkAuth,centerControllers.addWant)
module.exports=router;