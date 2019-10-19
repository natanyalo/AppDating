import { verify } from "jsonwebtoken"

//זה פונקציה שבודקת את אימות משתשמש אם לא זורקת שגיאה ולא מתקדם 
// למשימה הבא
export default (req, res, next) => {

  try {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    const decodedToken = verify(token, "secret")//if is not verfiy is trow error
    req.userData = { email: decodedToken.email, userId: decodedToken.userId }

    next();//continue to next task 
  }
  catch (error) {
    res.status(401).json({ messeage: "you are nor authenticated!" })
  }
}