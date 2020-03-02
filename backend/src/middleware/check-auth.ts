import { verify } from "jsonwebtoken";
// זה פונקציה שבודקת את אימות משתשמש אם לא זורקת שגיאה ולא מתקדם
// למשימה הבא
export default (req: any, res: any, next: any) => {
  try {
   
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = verify(token, "secret") as {email: string , userId: string}; // if is not verfiy is trow error
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next(); // continue to next task
  } catch (error) {
    res.status(401).json({ messeage: "you are not authenticated!" });
  }
};
