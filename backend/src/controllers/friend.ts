import { Friend, IFriend } from "../models/friend";
import { Profile } from "../models/profile";


export async function getFriends(req: any, res: any) {
   const listFriend: IFriend = await Friend.findOne({ creator: req.userData.userId })
   const match = await Profile.find({ creator: { $in: listFriend.match } });
   res.status(200).json({ friends: listFriend ? match : [] });
}