import { Schema, model } from "mongoose"



const userSechma = Schema({
   phoneNumber: { type: Number, require: true },
   lastName: { type: String, require: true },
   firstName: { type: String, require: true },
   favorite: { type: String, require: true },
   minimum: { type: String, require: true },
   age: { type: String, require: true },
   maximum: { type: String, require: true },
   range: { type: Number, require: true },
   summery: { type: String, require: true },
   city: { type: String, require: true },
   imagePath: { type: String, require: true },
   creator: {
      type: Schema.Types.ObjectId, ref: "User",
      require: true
   }
})

export default model('Profile', userSechma)