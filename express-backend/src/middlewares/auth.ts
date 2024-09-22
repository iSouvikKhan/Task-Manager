import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = (req: any, res: any, next: any): void => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(token) {
            const user: any = jwt.verify(token, process.env.JWT_Sectret as string);
            if(user) {
                req.userId = user.userId;
                next();
            } else {
                return res.status(400).json({
                    message: "authentication failed in auth middleware"
                })
            }

        } else {
            return res.status(400).json({
                message: "your sessaion has expired, sign in again",
            })
        }
    } catch(ex) {
        console.log("exception occured at auth middleware", ex);
    }
}