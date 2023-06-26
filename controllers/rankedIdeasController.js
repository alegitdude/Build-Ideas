import RankedIdea from "../models/RankedIdea.js";
import Idea from "../models/Idea.js";

import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import User from "../models/User.js";

const createRankedIdea = async (req, res) => {
  const { idea, isGoodIdea } = req.body;
  if (!idea) {
    throw new BadRequestError("Please provide all values");
  }
  const user = req.user._id;

  const alreadyExists = await RankedIdea.find({ idea: idea });

  if (alreadyExists.idea) {
    throw new BadRequestError("You already submited this idea!");
  }
  const tooManyIdeas = await RankedIdea.find({
    submittedBy: user,
  });
  if (tooManyIdeas.length > 4) {
    throw new BadRequestError("You have reached your submission limit");
  }

  const newRankedIdea = await RankedIdea.create({
    submittedBy: user,
    idea: idea,
    isGoodIdea: isGoodIdea,
  });

  res.status(StatusCodes.CREATED).json({ newRankedIdea });
};

const getAllRankedIdeas = async (req, res) => {
  const { isGoodIdea } = req.query;
  let queryObject = {};

  if (isGoodIdea && isGoodIdea !== "all") {
    queryObject = { isGoodIdea: isGoodIdea };
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;
  const sort = req.query.sort;

  let result = RankedIdea.find(queryObject).populate({
    path: "submittedBy",
    select: "name",
  });

  if (sort === "Newest") {
    result = result.sort("-createdAt");
  }
  if (sort === "Oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "Most Upvotes") {
    result = result.sort("-upVotes");
  }
  if (sort === "Most Downvotes") {
    result = result.sort("upVotes");
  }

  result = result.skip(skip).limit(limit);
  const rankedIdeas = await result;

  const totalRankedIdeas = await RankedIdea.countDocuments(queryObject);
  const numOfRankedPages = Math.ceil(totalRankedIdeas / limit);
  res
    .status(StatusCodes.OK)
    .json({ rankedIdeas, totalRankedIdeas, numOfRankedPages });
};

const deleteRankedIdea = async (req, res) => {
  const { id: rankedIdeaId } = req.params;

  const oldRankedIdea = await RankedIdea.findOne({ _id: rankedIdeaId });

  if (!oldRankedIdea) {
    throw new NotFoundError(`No idea with id: ${rankedIdeaId}`);
  }
  checkPermissions(req.user, oldRankedIdea.submittedBy);

  await oldRankedIdea.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Success! Idea Deleted" });
};

const getMyRankedIdeas = async (req, res) => {
  const user = req.user._id;

  if (!user) {
    throw new BadRequestError("No Id!");
  }
  const userRankedIdeas = await RankedIdea.find({ submittedBy: user });
  res.status(StatusCodes.OK).json({ userRankedIdeas });
};

const getIdeaUser = async (req, res) => {
  const { id: user } = req.params;
  if (!user) {
    throw new BadRequestError("No Id!");
  }

  const ideaUser = await User.find({ _id: user });
  if (!ideaUser[0]) {
    throw new BadRequestError("No user with that Id");
  }

  res.status(StatusCodes.OK).json({ ideaUser });
};

export {
  createRankedIdea,
  getAllRankedIdeas,
  deleteRankedIdea,
  getIdeaUser,
  getMyRankedIdeas,
};
