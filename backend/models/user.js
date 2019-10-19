import { Schema, model } from "mongoose"

const userSechma = Schema({
   email: { type: String, unique: true, require: true },
   password: { type: String, require: true },
   lastName: { type: String, require: true },
   firstName: { type: String, require: true }



})

export default model('User', userSechma)