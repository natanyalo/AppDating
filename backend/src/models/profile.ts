import { Document, model, Schema } from "mongoose";
import { IUser } from "./user";
import {IAddress, addressSchema} from './address'
export interface IProfile extends Document {
   phoneNumber: number;
   lastName: string;
   firstName: string;
   favorite: string;
   minimum: number;
   age: number;
   summery: string;
   address: IAddress;
   imagePath: string;
   range: number;
   maximum: number;
   creator: IUser;
   gender: boolean;
}
export const profileSchema = new Schema({
   phoneNumber: { type: Number, require: true },
   lastName: { type: String, require: true },
   firstName: { type: String, require: true },
   favorite: { type: String, require: true },
   minimum: { type: Number, require: true },
   gender: { type: Boolean, required: true },
   age: { type: Number, require: true },
   maximum: { type: Number, require: true },
   range: { type: Number, require: true },
   summery: { type: String, require: true },
   address: { type: addressSchema, require: true },
   imagePath: { type: String, require: true },
   creator: {
      type: Schema.Types.ObjectId, ref: "User",
      require: true
   }
});
profileSchema.method('toJSON', function() {
   return {
      id:this.id,
      phoneNumber:this.phoneNumber ,
      lastName: this.lastName,
      firstName: this.firstName,
      favorite: this.favorite,
      minimum: this.minimum,
      age: this.age,
      summery: this.summery,
      address: this.address,
      image: this.imagePath,
      range: this.range,
      maximum: this.maximum,
      creator: this.creator,
      gender: this.gender,
   };
 });
 
export const Profile = model<IProfile>("Profile", profileSchema);
