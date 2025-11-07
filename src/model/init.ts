import { promises as fs, constants } from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import seedData from "./seed.json";

const DB_DIR = path.resolve("mockdb");
const DB_FILE = path.join(DB_DIR, "db.json");

type SeedPost = Omit<Post, "id" | "status">;

const transformSeedData = (): Post[] => {
  return seedData.map((post: SeedPost) => ({
    id: uuidv4(),
    title: post.title,
    image: post.image,
    author: post.author,
    createdAt: dayjs(post.createdAt * 1000).unix(),
    teaser: post.teaser,
    content: post.content,
    status: "draft" as PostStatus,
  }));
};

(async (): Promise<void> => {
  await fs.mkdir(DB_DIR, { recursive: true });

  try {
    await fs.access(DB_FILE, constants.F_OK);
    console.log("Mock database already exists");
  } catch {
    console.log("Creating mock database with seed data...");
    const posts = transformSeedData();
    await fs.writeFile(DB_FILE, JSON.stringify(posts, null, 2), "utf-8");
    console.log(`Mock database created with ${posts.length} posts`);
  }
})();
