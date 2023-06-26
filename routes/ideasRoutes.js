import express from "express";
const router = express.Router();

import {
  createIdea,
  getAllIdeas,
  deleteIdea,
  updateIdea,
} from "../controllers/ideasController.js";

router.route("/").post(createIdea).get(getAllIdeas);
//remember about :id
router.route("/:id").delete(deleteIdea).patch(updateIdea);
export default router;
