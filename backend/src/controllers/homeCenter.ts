import Friend, { IFriend } from "../models/friend";
import {Profile} from "../models/profile";

export function getUsers(req: any, res: any, next: any) {
  Profile.find(function(err: any, profiles: any) {
    if (err) {
      res.status(400).json({ messege: "cant find profiles" });
    } else {
      res.status(200).json({ users: profiles });
    }
  });
}

async function createfriend(req: any) {
  const friends = new Friend({
    creator: req.userData.userId,
    match: [],
    want: [req.body.wantId],
  });
  const result = await friends.save();
  return result;
}

export async function addWant(req: any, res: any, next: any) {
  try {
    let result = await Friend.findOne({ creator: req.body.creatorId });
    if (result === null) {
      result = await createfriend(req);
      if (result === null) {
        throw new Error("add friend is fail");
      }
    }
    let listFriends = {} as IFriend;
    await Friend.findOne({ want: req.body.creatorId }, function(err, item) {
      if (err) {
        throw new Error("add friend is fail");
      }
      listFriends = item;
    });

    if (listFriends && result !== null) {
      listFriends.want =  listFriends.want.map((id: string) => {
        if (id === req.body.creatorId) {
          result.match.push(req.body.wantId);
          listFriends.match.push(req.body.creatorId);
          return null;
        } else {
          return id;
        }
      }).filter((i) => i !== null);

      const index = result.want.indexOf(req.body.wantId);
      if (index !== -1) {
        result.want.splice(index, 1);
      }

      result.save((err, item) => {
        if (err) {
          throw new Error("add friend is fail");
        }
      });

      listFriends.save((err, item) => {
        if (err) {
          throw new Error("add friend is fail");
        }
      });

      res.status(200).json({});
    } else {
      res.status(200).json(result);
    }
  } catch (message) {
    res.status(400).json({ message });
  }
}
