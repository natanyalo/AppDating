const mongoose= require("mongoose")

const postSechma=mongoose.Schema({
   title:{ type:String,require:true },
   content:String,
   imagePath:String,
   creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",
    require:true}
   


})

module.exports= mongoose.model('post',postSechma)