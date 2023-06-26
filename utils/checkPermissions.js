import { UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourseUserId) => {
  if (requestUser._id === resourseUserId.toString()) return;

  throw new UnAuthenticatedError("Not authorized to access this route");
};

export default checkPermissions;
