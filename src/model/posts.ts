import { v4 as uuidv4 } from "uuid";
import { getDB } from "../db/db";

const getAllPosts = async (): Promise<Post[]> => {
  const db = getDB();
  return await db.all<Post[]>("SELECT * FROM posts ORDER BY createdAt DESC");
};

const getPost = async (id: string): Promise<Post> => {
  const db = getDB();
  const post = await db.get<Post>("SELECT * FROM posts WHERE id = ?", id);

  if (!post) throw new Error(`Post with id ${id} not found`);

  return post;
};

const deletePost = async (id: string): Promise<void> => {
  const db = getDB();
  const result = await db.run("DELETE FROM posts WHERE id = ?", id);

  if (result.changes === 0) throw new Error(`Post with id ${id} not found`);
};

const updatePostStatus = async (
  id: string,
  status: PostStatus,
): Promise<Post> => {
  const db = getDB();

  await db.run("UPDATE posts SET status = ? WHERE id = ?", status, id);

  const updatedPost = await getPost(id);
  return updatedPost;
};

const createPost = async (
  postData: Omit<Post, "id" | "createdAt">,
): Promise<Post> => {
  const db = getDB();

  const newPost: Post = {
    ...postData,
    id: uuidv4(),
    createdAt: Date.now(),
    status: postData.status || "draft",
  };

  await db.run(
    `INSERT INTO posts (id, title, image, author, createdAt, teaser, content, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    newPost.id,
    newPost.title,
    newPost.image,
    newPost.author,
    newPost.createdAt,
    newPost.teaser,
    newPost.content,
    newPost.status,
  );

  return newPost;
};

const updatePost = async (
  id: string,
  postData: Partial<Omit<Post, "id" | "createdAt">>,
): Promise<Post> => {
  const db = getDB();

  const updates: string[] = [];
  const values: unknown[] = [];

  if (postData.title !== undefined) {
    updates.push("title = ?");
    values.push(postData.title);
  }
  if (postData.image !== undefined) {
    updates.push("image = ?");
    values.push(postData.image);
  }
  if (postData.author !== undefined) {
    updates.push("author = ?");
    values.push(postData.author);
  }
  if (postData.teaser !== undefined) {
    updates.push("teaser = ?");
    values.push(postData.teaser);
  }
  if (postData.content !== undefined) {
    updates.push("content = ?");
    values.push(postData.content);
  }
  if (postData.status !== undefined) {
    updates.push("status = ?");
    values.push(postData.status);
  }

  if (updates.length === 0) {
    return await getPost(id);
  }

  values.push(id);

  await db.run(
    `UPDATE posts SET ${updates.join(", ")} WHERE id = ?`,
    ...values,
  );

  const updatedPost = await getPost(id);
  return updatedPost;
};

export {
  getAllPosts,
  getPost,
  deletePost,
  updatePostStatus,
  createPost,
  updatePost,
};
