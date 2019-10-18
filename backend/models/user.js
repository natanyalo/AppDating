const mongoose= require("mongoose")

const userSechma=mongoose.Schema({
   email:{ type:String,unique : true,require:true },
   password:{ type:String,require:true},
   lastName:{ type:String,require:true},
   firstName:{ type:String,require:true}


   
})

module.exports= mongoose.model('User',userSechma)