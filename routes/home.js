import express from "express";
const router = express.Router();

import { getAllRankedIdeas } from "../controllers/rankedIdeasController.js";

router.route("/").get(getAllRankedIdeas);

export default router;
