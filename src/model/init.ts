import { v4 as uuidv4 } from "uuid";
import seedData from "./seed.json";
import { connectDB } from "../db/db";

type SeedPost = Omit<Post, "id" | "status">;

const seedDatabase = async (): Promise<void> => {
  try {
    const db = await connectDB();

    // Check if database already has posts
    const existingPosts = await db.get<{ count: number }>(
      "SELECT COUNT(*) as count FROM posts",
    );

    if (existingPosts && existingPosts.count > 0) {
      console.log(
        `Database already contains ${existingPosts.count} posts. Skipping seed.`,
      );
      return;
    }

    // Insert seed data
    console.log("Seeding database with initial posts...");

    const insertStmt = await db.prepare(
      `INSERT INTO posts (id, title, image, author, createdAt, teaser, content, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    );

    for (const post of seedData as SeedPost[]) {
      await insertStmt.run(
        uuidv4(),
        post.title,
        post.image,
        post.author,
        post.createdAt,
        post.teaser,
        post.content,
        "draft",
      );
    }

    await insertStmt.finalize();

    console.log(`Successfully seeded database with ${seedData.length} posts`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

// Only run if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { seedDatabase };
