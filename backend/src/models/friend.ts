import { Document, model, Schema } from "mongoose";
import { IUser } from "./user";

export interface IFriend extends Document {
   match:Schema.Types.ObjectId[];
   want: string[];
   creator: IUser;
}

const FriendSechma = new Schema({
   creator: {
      ref: "User",
      require: true,
      type: Schema.Types.ObjectId,
   },
   match:[{ type: Schema.Types.ObjectId, ref: 'User' }],
   want: [String],

});

 const Friend= model<IFriend>("Friend", FriendSechma);
 export {Friend}
