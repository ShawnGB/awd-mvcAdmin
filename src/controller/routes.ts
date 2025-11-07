import express from "express";
import { adminHandler, indexHandler } from "./handlers";
import {
  deletePostHandler,
  updatePostStatusHandler,
  createPostHandler,
} from "./postHandlers";

const router = express.Router();

router.get("/", indexHandler);
router.get("/admin", adminHandler);

router.post("/admin/post", createPostHandler);
router.delete("/admin/post/:id", deletePostHandler);
router.post("/admin/post/:id/status", updatePostStatusHandler);

export { router };
