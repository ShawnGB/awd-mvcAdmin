import express from "express";
import { indexHandler } from "./handlers";

const router = express.Router();

router.get("{/:id}", indexHandler);

export { router };
