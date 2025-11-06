import express from "express";
import { adminHandler, indexHandler } from "./handlers";

const router = express.Router();

router.get("/", indexHandler);
router.get("/admin", adminHandler);

export { router };
