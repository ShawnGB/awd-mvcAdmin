import type { Response, Request } from "express";
import { getAllPosts } from "../model/posts";

const indexHandler = (req: Request, res: Response) => {
  res.render("index.njk", { title: "New Page", message: "Hello World" });
};

const adminHandler = async (req: Request, res: Response) => {
  const posts = await getAllPosts();

  if (!posts) return res.status(500);

  res.render("admin/admin.njk", {
    title: "Admin",
    posts,
  });
};
export { indexHandler, adminHandler };
