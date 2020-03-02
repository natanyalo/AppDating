
import { compare, hash as _hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUser, User } from "../models/user";

export function userSignUp(req: any, res: any, next: any) {
    _hash(req.body.password, 10).
        then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save().then((result: IUser) =>
             {
                const token = sign({
                    email: result.email,
                    userId: result._id
                },
                    process.env.JWT_TOKEN, { expiresIn: "1h" }
                );
                res.status(200).json({
                    token, timer: "3000",
                    userId: result._id
                });
            }).catch((error) => {
                res.status(400).json({ error });
            });
        });
}

export async function userLogin(req: any, res: any) {
    let userfatch = await User.findOne({ email: req.body.email });
    if (!userfatch) {
        res.status(401).json({
            messege: "auth faild"
        });
    }
    const verifyPassword = await compare(req.body.password, userfatch.password)
    if (!verifyPassword) {
        res.status(401).json({
            messege: "auth faild"
        });
    }
    const token =  sign({
        email: userfatch.email,
        userId: userfatch._id
    },
        process.env.JWT_TOKEN, { expiresIn: "1h" }
    )
    res.status(200).json({
        token, timer: "3000",
        userId: userfatch._id
    });
}
