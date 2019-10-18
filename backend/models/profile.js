const mongoose= require("mongoose")



const userSechma=mongoose.Schema({
   phoneNumber:{ type:Number,require:true},
   lastName:{ type:String,require:true},
   firstName:{ type:String,require:true},
   favorite:{ type:String,require:true},
   minimum:{ type:String,require:true},
   age:{ type:String,require:true},
   maximum:{ type:String,require:true},
   range:{ type:Number,require:true},
   summery:{type:String, require:true},
   city:{type:String, require:true},
   imagePath:{type:String, require:true},
   creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",
   require:true}   
})

module.exports= mongoose.model('Profile',userSechma)