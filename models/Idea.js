import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema(
  {
    createdBy: {
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
    },
    isGoodIdea: {
      type: Boolean,
      required: [true, "Is it a good idea?"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Idea", IdeaSchema);
