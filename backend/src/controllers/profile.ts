import { IProfile, Profile } from "../models/profile";

export function getProfile(req: any, res: any) {
    const id = req.userData.userId;
    Profile.findOne({ creator: id }, function (err: any, profile: IProfile) {
        if (err) {
            res.status(400).json({ messege: "cant find a profile" });
        } else {
            res.status(200).json({ profile });
        }
    });
}

export function saveProfile(req: any, res: any) {
    const url = req.protocol + "://" + req.get("host");
    const newProfile = new Profile({
        age: req.body.age,
        address:JSON.parse(req.body.address),
        gender:req.body.gender,
        creator: req.userData.userId,
        imagePath: url + "/images/" + req.file.filename,
        firstName: req.body.firstName,
        favorite: req.body.favorite,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        minimum: req.body.minimum,
        maximum: req.body.maximum,
        range: req.body.range,
        summery: req.body.summery,
    });
    newProfile.save()
    .then((result: any) => {
        res.status(200).json(result);
    })
    .catch(
        () => {
            res.status(400).json({ messege: "create profile is fail" });
        });
}

export function upDateProfile(req: any, res: any) {
    const url = req.protocol + "://" + req.get("host");
    console.log(req.body)
    const newProfile = new Profile({
        phoneNumber: req.body.phoneNumber,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        favorite: req.body.favorite,
        age: req.body.age,
        minimum: req.body.minimum,
        maximum: req.body.maximum,
        range: req.body.range,
        gender:req.body.gender,
        summery: req.body.summery,
        address:JSON.parse(req.body.address),
        _id: req.body.id,
        imagePath: req.body.image,
        creator: req.userData.userId,

    });
    Profile.updateOne({ _id: req.body.id, creator: req.userData.userId }, newProfile)
        .then((result: any) => {
            if (result.nModified > 0) {
                res.status(200).json({});
            } else {
                res.status(400).json({ messege: "updata profile is fail" });
            }
        });
}

