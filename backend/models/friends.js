import { Schema, model } from "mongoose"

const friendSechma=Schema({
   match:{ type:[String]},
   want:[String] ,
 creator:{type:Schema.Types.ObjectId,ref:"User",
    require:true}
   


})

export default model('friends',friendSechma)