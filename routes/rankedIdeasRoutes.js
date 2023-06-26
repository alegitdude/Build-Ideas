import express from "express";
const router = express.Router();

import {
  createRankedIdea,
  getAllRankedIdeas,
  deleteRankedIdea,
  getMyRankedIdeas,
} from "../controllers/rankedIdeasController.js";

router.route("/").post(createRankedIdea).get(getAllRankedIdeas);
//remember about :id
router.route("/:id").delete(deleteRankedIdea).get(getMyRankedIdeas);
export default router;
