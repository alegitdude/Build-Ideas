import jwt from "jsonwebtoken";

const attachCookie = ({ res, user, refreshToken }) => {
  const createAccess = function (user) {
    return jwt.sign({ user }, process.env.JWT_SECRET);
  };
  const createRefresh = (user, refreshToken) => {
    return jwt.sign({ user, refreshToken }, process.env.JWT_SECRET);
  };

  const accessTokenJWT = createAccess(user);
  const refreshTokenJWT = createRefresh(user, refreshToken);

  const oneDay = 1000 * 60 * 60 * 5;
  const fiveDays = 1000 * 60 * 60 * 24 * 5;

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + fiveDays),
    secure: process.env.NODE_ENV === "production",
  });
};

export default attachCookie;
