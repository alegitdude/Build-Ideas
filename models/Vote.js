import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    rankedIdea: {
      type: mongoose.Types.ObjectId,
      ref: "RankedIdea",
      required: [true, "Which Idea"],
    },
    thumb: {
      type: Number,
      required: [true, "No vote!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vote", VoteSchema);
