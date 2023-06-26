import Idea from "../models/Idea.js";

import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import RankedIdea from "../models/RankedIdea.js";

const createIdea = async (req, res) => {
  const { idea, isGoodIdea } = req.body;
  if (!idea || isGoodIdea === null || isGoodIdea === undefined) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user._id;
  const newIdea = await Idea.create(req.body);
  res.status(StatusCodes.CREATED).json({ newIdea });
};

const getAllIdeas = async (req, res) => {
  const { isGoodIdea } = req.query;

  let queryObject = {
    createdBy: req.user._id,
  };

  if (isGoodIdea && isGoodIdea !== "all") {
    queryObject.isGoodIdea = isGoodIdea;
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;
  const sort = req.query.sort;

  let result = Idea.find(queryObject);

  if (sort === "Created Newest") {
    result = result.sort("-createdAt");
  }
  if (sort === "Created Oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "Edited Newest") {
    result = result.sort("-updatedAt");
  }
  if (sort === "Edited Oldest") {
    result = result.sort("updatedAt");
  }

  result = result.skip(skip).limit(limit);
  const ideas = await result;

  const totalIdeas = await Idea.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalIdeas / limit);
  res.status(StatusCodes.OK).json({ ideas, totalIdeas, numOfPages });
};
const updateIdea = async (req, res) => {
  const { id: ideaId } = req.params;
  const { idea, isGoodIdea } = req.body;

  if (!idea || isGoodIdea === undefined || undefined) {
    throw new BadRequestError("Please provide all values");
  }
  const oldIdea = await Idea.findOne({ _id: ideaId });

  if (!oldIdea) {
    throw new NotFoundError(`No idea with id: ${ideaId}`);
  }
  //check permissions
  checkPermissions(req.user, oldIdea.createdBy);

  const updatedIdea = await Idea.findOneAndUpdate({ _id: ideaId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedIdea });
};

const deleteIdea = async (req, res) => {
  const { id: ideaId } = req.params;

  const oldIdea = await Idea.findOne({ _id: ideaId });
  if (!oldIdea) {
    throw new NotFoundError(`No idea with id: ${ideaId}`);
  }
  checkPermissions(req.user, oldIdea.createdBy);
  const oldRankedIdea = await RankedIdea.findOne({ idea: { _id: ideaId } });
  if (oldRankedIdea) {
    await oldRankedIdea.deleteOne();
  }
  await oldIdea.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Success! Idea Deleted" });
};

export { createIdea, getAllIdeas, deleteIdea, updateIdea };
