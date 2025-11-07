import type { Request, Response } from "express";
import { getPost } from "../model/posts";

const getPostHandler = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) return res.status(404).send("<h1> can not find post </h1>");

  const post = await getPost(id);

  res.status(201);
};
