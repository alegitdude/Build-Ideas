import mongoose from "mongoose";

const RankedIdeaSchema = new mongoose.Schema(
  {
    submittedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    idea: {
      type: String,
      required: [true, "No Idea!"],
      maxlength: 150,
      minlength: 5,
      trim: true,
      unique: true,
    },
    isGoodIdea: {
      type: Boolean,
      required: [true, "is it a good idea?"],
    },
    upVotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("RankedIdea", RankedIdeaSchema);
