import { Document, model, Schema } from "mongoose";
import { IUser } from "./user";

export interface IFriend extends Document {
   match: string[];
   want: string[];
   creator: IUser;
}

export const FriendSechma = new Schema({
   creator: {
      ref: "User",
      require: true,
      type: Schema.Types.ObjectId,
   },
   match: { type: [String] },
   want: [String],

});

export default model<IFriend>("Friend", FriendSechma);
