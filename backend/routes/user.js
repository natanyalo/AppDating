const express= require('express')
const userControllers=require('../controllers/user')

 const router=express.Router()
  
 // function call without () is mean ref to function
 router.post("/signup",userControllers.userSignUp)

 
 router.post("/login",userControllers.userLogin)

module.exports=router;