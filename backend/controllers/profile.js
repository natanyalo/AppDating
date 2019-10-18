const Profile=require('../models/profile')



exports.saveProfile=(req, res, next)=>{

    const url =req.protocol +'://'+req.get("host")
    console.log(req.body)
    newProfile= new Profile({
        phoneNumber:req.body.phoneNumber,
        lastName:req.body.lastName,
        firstName:req.body.firstName,
        favorite:req.body.favorite,
        age:req.body.age,
        minimum:req.body.minimum,
        maximum:req.body.maximum,
        range:req.body.range,
        summery:req.body.summery,
        city:req.body.city,
        imagePath:url +"/images/"+req.file.filename,
        creator:req.userData.userId,
    });

    newProfile.save().then(result=>{
        res.status(200).json(newProfile)
    }).catch(e=>{
    res.status(400).json({messege:"create profile is fail"})
   })
}


exports.upDataProfile= (req, res, next)=>{
console.log("aa",req.body)
console.log(req.get("host"))
const url =req.protocol +'://'+req.get("host")
    newProfile= new Profile({
        phoneNumber:req.body.phoneNumber,
        lastName:req.body.lastName,
        firstName:req.body.firstName,
        favorite:req.body.favorite,
        age:req.body.age,
        minimum:req.body.minimum,
        maximum:req.body.maximum,
        range:req.body.range,
        summery:req.body.summery,
        city:req.body.city,
        _id:req.body.id,
        imagePath:url +"/images/"+req.file.filename,
        creator:req.userData.userId,
    });


    Profile.updateOne({_id:req.body.id, creator:req.userData.userId},newProfile )
        .then(result=>{
            if(result.nModified>0)
            res.status(200).json({})
            else
            res.status(400).json({messege:"updata profile is fail"})
        
    })
  

}




exports.getProfile=(req, res, next)=>{
   let id=req.userData.userId;
  
    Profile.findOne({creator:id}, function (err, pro) { 
        if(err)
        res.status(400).json({messege:"cant find a profile"})
        else{
            console.log("fffffffffffffff",pro)
        res.status(200).json(pro)
        }

     } );
}