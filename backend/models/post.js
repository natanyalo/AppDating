import { Schema, model } from "mongoose"

const postSechma=Schema({
   title:{ type:String,require:true },
   content:String,
   imagePath:String,
   creator:{type:Schema.Types.ObjectId,ref:"User",
    require:true}
   


})

export default model('post',postSechma)