import { promises as fs } from "node:fs";
import dbConfig from "./config";

// Utility functions
const readPosts = async (): Promise<Post[]> => {
  try {
    const posts = await fs.readFile(dbConfig.file, "utf-8");
    return JSON.parse(posts);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const writePosts = async (posts: Post[]): Promise<void> => {
  try {
    await fs.writeFile(dbConfig.file, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Model functions
const getAllPosts = async (): Promise<Post[]> => {
  return await readPosts();
};

const getPost = async (id: string): Promise<Post> => {
  const posts = await readPosts();
  const post = posts.find((post) => post.id === id);

  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }

  return post;
};

const deletePost = async (id: string): Promise<void> => {
  const posts = await readPosts();
  const filteredPosts = posts.filter((post) => post.id !== id);
  await writePosts(filteredPosts);
};

const updatePostStatus = async (
  id: string,
  status: PostStatus,
): Promise<Post> => {
  const posts = await readPosts();
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    throw new Error(`Post with id ${id} not found`);
  }

  posts[postIndex].status = status;
  await writePosts(posts);
  return posts[postIndex];
};

export { getAllPosts, getPost, deletePost, updatePostStatus };
