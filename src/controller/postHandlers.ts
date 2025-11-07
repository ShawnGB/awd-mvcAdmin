import type { Request, Response } from "express";
import {
  deletePost,
  updatePostStatus,
  createPost,
  updatePost,
} from "../model/posts";

const deletePostHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send("<h1>Post ID is required</h1>");

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

    if (!id || !status)
      return res.status(400).send("<h1>Post ID and status are required</h1>");

    await updatePostStatus(id, status);
    res.status(200).send("");
  } catch (error) {
    console.error(error);
    res.status(500).send("<h1>Error updating post status</h1>");
  }
};

const createPostHandler = async (req: Request, res: Response) => {
  try {
    if (!req.body)
      return res.status(400).send("<h1>Request body is required</h1>");

    const newPost = await createPost({
      ...req.body,
      image: "",
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("<h1>Error creating post</h1>");
  }
};

const updatePostHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send("<h1>Post ID is required</h1>");

    if (!req.body)
      return res.status(400).send("<h1>Request body is required</h1>");

    const updatedPost = await updatePost(id, req.body);

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("<h1>Error updating post</h1>");
  }
};

export {
  deletePostHandler,
  updatePostStatusHandler,
  createPostHandler,
  updatePostHandler,
};
