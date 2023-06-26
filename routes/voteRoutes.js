import express from "express";
const router = express.Router();

import {
  createVote,
  changeVote,
  getAllVotes,
  deleteVote,
  getAllIdeaVotes,
} from "../controllers/voteController.js";

router.route("/").post(createVote).get(getAllVotes);
//remember about :id
router.route("/:id").delete(deleteVote).patch(changeVote).get(getAllIdeaVotes);
export default router;
