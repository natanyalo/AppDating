
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const User=require('../models/user')


  exports.userSignUp= (req, res, next)=>{
    
     bcrypt.hash(req.body.password,10).
     then( hash=>{
        let user =new User({
             email:req.body.email ,
             password:hash,
             lastName:req.body.lastname,
             firstName:req.body.firstname
     
         });
        
        user.save().then(result=>{
            const token= jwt.sign({email:result.email,
                                    userId:result._id},
                                    process.env.JWT_TOKEN,{expiresIn:"1h"}
                           )
                res.status(200).json({token:token,timer:"3000",
                userId:result._id})
            }).catch(error=>{
                res.status(400).json({error})
            })
     })
  
 }

 
 exports.userLogin=(req,res,next)=>{
   
   let userfatch
  User.findOne({email:req.body.email}).
     then(user=>{//condition for find user
       
         if(!user)
            return res.status(401).json({
             messege:"auth faild"
            })
           
         userfatch=user
         return bcrypt.compare(req.body.password,user.password)
     }).then( result=>{
            if(!result)
                 return res.status(401).json({
                        messege:"auth failed"
                      })
                      console.log("process.env.JWT_TOKEN",process.env.JWT_TOKEN)      
            const token= jwt.sign({email:userfatch.email,
                                   userId:userfatch._id},
                                   process.env.JWT_TOKEN,{expiresIn:"1h"}
               )

            res.status(200).json({token:token,timer:"3000",
                               userId:userfatch._id})
     })
     .catch(error=>{
        return res.status(401).json({
            messege:" auth failed"
        })
     })
 }

