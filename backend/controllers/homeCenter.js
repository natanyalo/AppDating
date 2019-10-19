import { find } from '../models/profile';
import Friends from '../models/friends';



export function getUsers(req, res, next) {
  find(function (err, pro) {
    if (err)
      res.status(400).json({ messege: "cant find a profile" })
    else {
      res.status(200).json({ users: pro })
    }
  });
}

async function createfriend(req, result) {
  const friends = new Friends({
    match: [],
    want: [req.body.wantId],
    creator: req.userData.userId
  })
  await friends.save().then(resul => {
    result = resul
  })
  return result;
}

export async function addWant(req, res, next) {
  try {
    let result = await Friends.findOne({ creator: req.body.creatorId })
    if (result === null) {
      result = await createfriend(req, result)
      if (result === null)
        throw "add friend is fail";
    }

    let listFriends
    await Friends.findOne({ want: req.body.creatorId }, (err, item) => {
      if (err)
        throw "add friend is fail";
      listFriends = item
    })

    if (listFriends && result !== null) {
      listFriends.want = await listFriends.want.map(id => {
        if (id == req.body.creatorId) {
          result.match.push(req.body.wantId)
          listFriends.match.push(req.body.creatorId)
          return null
        }
        else
          return id
      }).filter(i => i != null)

      let index = result.want.indexOf(req.body.wantId);
      if (index !== -1)
        result.want.splice(index, 1);

      result.save((err, item) => {
        if (err)
          throw "add friend is fail";
      })

      listFriends.save((err, item) => {
        if (err)
          throw "add friend is fail";
      })

      res.status(200).json({})
    }
    else {
      res.status(200).json(result)
    }
  }
  catch (message) {
    res.status(400).json({ message })
  }
}