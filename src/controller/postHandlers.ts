import type { Request, Response } from "express";
import { deletePost, updatePostStatus } from "../model/posts";

// const getPostHandler = async (req: Request, res: Response) => {
//   const { id } = req.body;
//
//   if (!id) return res.status(404).send("<h1> can not find post </h1>");
//
//   const post = await getPost(id);
//
//   res.status(201);
// };

const deletePostHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("<h1>Post ID is required</h1>");
    }

    await deletePost(id);
    res.status(200).send("");
  } catch (error) {
    console.error(error);
    res.status(500).send("<h1>Error deleting post</h1>");
  }
};

const updatePostStatusHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).send("<h1>Post ID and status are required</h1>");
    }

    await updatePostStatus(id, status);
    res.status(200).send("");
  } catch (error) {
    console.error(error);
    res.status(500).send("<h1>Error updating post status</h1>");
  }
};

export { deletePostHandler, updatePostStatusHandler };
