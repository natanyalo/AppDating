import { Router } from 'express'
import { userSignUp, userLogin } from '../controllers/user'

 const router=Router()
  
 // function call without () is mean ref to function
 router.post("/signup",userSignUp)

 
 router.post("/login",userLogin)

 export default router;