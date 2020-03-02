import { Friend, IFriend } from "../models/friend";
import { Profile, IProfile } from "../models/profile";
import { EnumGender, EnumNotification } from "../models/enum";
import { FactoryObj } from "../models/fcatory/factoryObj";

export async function getUsers(req: any, res: any, next: any) {
  const userProfile = await Profile.findOne({ creator: req.userData.userId }) as IProfile
  if (!userProfile)
    res.status(200).json({ users: [] });
  const conditions = {
    gender: userProfile.favorite === EnumGender.Male.toLowerCase(),
    maximum: {
      $gte: userProfile.minimum
    },
    minimum: {
      $lte: userProfile.maximum
    }
  }
  Profile.find(conditions)
    .then((profiles: IProfile[]) => {
      return res.status(200).json({
        users: profiles
          .filter(profile => {
            const coordinates1 = userProfile.address.coordinates;
            const coordinates2 = profile.address.coordinates;
            if (distance(coordinates1.lon, coordinates1.lat,
              coordinates2.lon, coordinates2.lat) <= userProfile.range) {
              return profile;
            }
          })
      });
    }).
    catch(e => {
      res.status(400).json({ messege: e });
    })
}
export async function addWant(req: any, res: any, next: any) {
  try {
    let creator = await Friend.findOne({ creator: req.body.creatorId });
    if (creator === null) {
      creator = await createFriendObj(req);
      if (creator === null)
        throw "adding a friend failed";
    }
    let creatorFriend = {} as IFriend;
    creatorFriend = await Friend.findOne({ want: req.body.creatorId });
    if (creatorFriend !== null){
    creatorFriend.want = await Promise.all(creatorFriend.want.map(async (id: string) => {
      if (id === req.body.creatorId) {
        let notificationFactory: FactoryObj = FactoryObj.getInstanceFactory();
        await notificationFactory.createObj(EnumNotification.Match,
          {
            from: id, to: req.body.wantId
          });
        creatorFriend.match.push(req.body.creatorId);
        creator.match.push(req.body.wantId);
        const index = creator.want.indexOf(req.body.wantId);
        if (index !== -1)
          creator.want.splice(index, 1);
        return null;
      } else {
        return id;
      }
    }).filter((i) => i !== null));
  }
    if (await creator.save() === null)
      throw "adding a friend failed";
    if (creatorFriend !==null && await creatorFriend.save() === null)
    throw "adding a friend failed";
      res.status(200).json({});
  }
  catch (message) {
    res.status(400).json({ message });
  }
}
//------------private--------------------------------------------
async function createFriendObj(req: any) {
  const friends = new Friend({
    creator: req.userData.userId,
    match: [],
    want: [req.body.wantId],
  });
  const result = await friends.save();
  return result;
}

function distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: string = 'k') {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    let radlat1 = Math.PI * lat1 / 180;
    let radlat2 = Math.PI * lat2 / 180;
    let theta = lon1 - lon2;
    let radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    console.log(dist)
    return dist;
  }
}