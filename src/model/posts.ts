import { promises as fs } from "node:fs";
import dbConfig from "./config";

const getAllPosts = async (): Promise<Post[]> => {
  try {
    const posts = await fs.readFile(dbConfig.file, "utf-8");
    return JSON.parse(posts);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getAllPosts };
