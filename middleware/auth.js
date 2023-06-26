import jwt from "jsonwebtoken";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import Token from "../models/Token.js";
import attachCookie from "../utils/attachCookie.js";

const auth = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  try {
    if (accessToken) {
      const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = payload.user;
      return next();
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const existingToken = await Token.findOne({
      user: payload.user._id,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new UnAuthenticatedError("Authentication Invalid");
    }

    attachCookie({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    req.user = payload.user;
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
