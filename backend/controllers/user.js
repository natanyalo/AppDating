
import { hash as _hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import User, { findOne } from '../models/user'


export function userSignUp(req, res, next) {
    _hash(req.body.password, 10).
        then(hash => {
            let user = new User({
                email: req.body.email,
                password: hash,
                lastName: req.body.lastname,
                firstName: req.body.firstname

            });

            user.save().then(result => {
                const token = sign({
                    email: result.email,
                    userId: result._id
                },
                    process.env.JWT_TOKEN, { expiresIn: "1h" }
                )
                res.status(200).json({
                    token: token, timer: "3000",
                    userId: result._id
                })
            }).catch(error => {
                res.status(400).json({ error })
            })
        })

}


export function userLogin(req, res, next) {

    let userfatch
    findOne({ email: req.body.email }).
        then(user => {//condition for find user

            if (!user)
                return res.status(401).json({
                    messege: "auth faild"
                })

            userfatch = user
            return compare(req.body.password, user.password)
        }).then(result => {
            if (!result)
                return res.status(401).json({
                    messege: "auth failed"
                })
            console.log("process.env.JWT_TOKEN", process.env.JWT_TOKEN)
            const token = sign({
                email: userfatch.email,
                userId: userfatch._id
            },
                process.env.JWT_TOKEN, { expiresIn: "1h" }
            )

            res.status(200).json({
                token: token, timer: "3000",
                userId: userfatch._id
            })
        })
        .catch(error => {
            return res.status(401).json({
                messege: " auth failed"
            })
        })
}

