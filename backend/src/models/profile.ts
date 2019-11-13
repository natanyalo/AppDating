import { Document, model, Schema } from "mongoose";
import { IUser } from "./user";

export interface IProfile extends Document {
   phoneNumber: number;
   lastName: string;
   firstName: string;
   favorite: string;
   minimum: number;
   age: number;
   summery: string;
   city: string;
   imagePath: string;
   range: number;
   maximum: number;
   creator: IUser;
}
export const profileSchema = new Schema({
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
});

export const Profile = model<IProfile>("Profile", profileSchema);
