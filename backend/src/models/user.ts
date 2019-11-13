import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
   email: string;
   password: string;
 }
export const userSechma: Schema  = new Schema({
   email: { type: String, unique: true, require: true },
   password: { type: String, require: true },
});

export const User = model<IUser>("User", userSechma);
