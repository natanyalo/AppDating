const mongoose= require("mongoose")

const friendSechma=mongoose.Schema({
   match:{ type:[String]},
   want:[String] ,
 creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",
    require:true}
   


})

module.exports= mongoose.model('friends',friendSechma)