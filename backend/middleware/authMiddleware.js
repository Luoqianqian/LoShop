import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if(token) {
    try {
      const decoded = jwt.verify(token, 'luoqianian');
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch(err) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
}


