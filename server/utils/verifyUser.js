import { errorHandller } from "./error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const cookieString = req.headers.cookie;
  const myToken = cookieString.split('my_token=')[1];
  if (!myToken) return next(errorHandller(401, "Unauthorized!"));

  jwt.verify(myToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandller(403, "Forbidden!"));
    req.user = user.id;
    next();
  });
};
