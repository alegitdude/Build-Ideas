import RankedIdea from "../models/RankedIdea.js";
import Vote from "../models/Vote.js";

import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createVote = async (req, res) => {
  const { id, thumb } = req.body;
  if ((!id, !thumb)) {
    throw new BadRequestError("Please provide all values");
  }
  const user = req.user._id;

  const oldRankedIdea = await RankedIdea.findById(id);

  if (thumb !== 1 && thumb !== -1) {
    throw new BadRequestError("Invalid Thumb");
  }

  if (!oldRankedIdea) {
    throw new BadRequestError("Idea Id does not exist!");
  }

  const allUserVotes = await Vote.find({ createdBy: user });

  allUserVotes.map((singleVote) => {
    const { rankedIdea } = singleVote;
    if (rankedIdea === id && singleVote.thumb == thumb) {
      throw new BadRequestError("You already voted!");
    }
  });

  if (oldRankedIdea.submittedBy == user) {
    throw new BadRequestError("Can not vote on your own idea");
  }

  const newVote = await Vote.create({
    createdBy: user,
    rankedIdea: id,
    thumb: thumb,
  });

  const newRankedIdea = await RankedIdea.findOneAndUpdate(
    { _id: id },
    {
      upVotes: oldRankedIdea.upVotes + thumb,
    },
    {
      new: true,
    }
  );

  res.status(StatusCodes.CREATED).json({ newRankedIdea });
};

const getAllVotes = async (req, res) => {
  let queryObject = {
    createdBy: req.user._id,
  };

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  // const sort = req.query.sort;

  let result = Vote.find(queryObject);

  result = result.skip(skip).limit(limit);
  const userVotes = await result;

  const totalVotes = await Vote.countDocuments(queryObject);
  const numOfVotePages = Math.ceil(totalVotes / limit);

  res.status(StatusCodes.OK).json({ userVotes, totalVotes, numOfVotePages });
};

const deleteVote = async (req, res) => {
  const { id: voteId } = req.params;
  const user = req.user._id;
  const oldVote = await Vote.findById(voteId);

  if (oldVote === null) {
    throw new BadRequestError("No Vote with that Id");
  }
  if (oldVote.createdBy != user) {
    throw new BadRequestError("Not your vote!");
  }

  const rankedIdea = await RankedIdea.findOne({ _id: oldVote.rankedIdea });

  if (!rankedIdea) {
    throw new NotFoundError(`No rankedIdea with id: ${rankedIdea._id}`);
  }

  const newUpVotes = rankedIdea.upVotes - oldVote.thumb;
  const newRankedIdea = await RankedIdea.findOneAndUpdate(
    { _id: rankedIdea._id },
    {
      upVotes: newUpVotes,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  await oldVote.deleteOne();

  res.status(StatusCodes.OK).json({ newRankedIdea });
};

const changeVote = async (req, res) => {
  const { id: voteId } = req.params;

  if (!voteId) {
    throw new BadRequestError("Please provide a vote Id");
  }
  const oldVote = await Vote.findOne({ _id: voteId });

  if (!oldVote) {
    throw new NotFoundError(`No vote with id: ${voteId}`);
  }
  //check permissions

  if (req.user._id != oldVote.createdBy) {
    throw new UnAuthenticatedError("Not authorized to access this route");
  }

  let newThumb;
  if (oldVote.thumb === 1) {
    newThumb = -1;
  }
  if (oldVote.thumb === -1) {
    newThumb = 1;
  }

  const updatedVote = await Vote.findOneAndUpdate(
    { _id: voteId },
    { thumb: newThumb },
    {
      new: true,
      runValidators: true,
    }
  );

  const bigThumbs = newThumb * 2;
  const rankedIdeaId = oldVote.rankedIdea;
  const oldRankedIdea = await RankedIdea.findOne({ _id: rankedIdeaId });
  const newUpVotes = oldRankedIdea.upVotes + bigThumbs;

  const newRankedIdea = await RankedIdea.findOneAndUpdate(
    { _id: rankedIdeaId },
    {
      upVotes: newUpVotes,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ newRankedIdea });
};

const getAllIdeaVotes = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide an id");
  }
  const allIdeaVotes = await Vote.find({ rankedIdea: id });
  if (!allIdeaVotes) {
    throw new BadRequestError("No Idea with that Id or no Votes");
  }

  res.status(StatusCodes.OK).json({ allIdeaVotes });
};

export { createVote, changeVote, deleteVote, getAllVotes, getAllIdeaVotes };
