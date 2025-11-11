import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "node:path";

const DB_FILE = path.resolve("blog.db");

let db: Database | null = null;

const createTableSQL = `
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    author TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    teaser TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('published', 'draft', 'archived'))
  )
`;

export const connectDB = async (): Promise<Database> => {
  if (db) {
    return db;
  }

  try {
    db = await open({
      filename: DB_FILE,
      driver: sqlite3.Database,
    });

    await db.exec(createTableSQL);
    console.log("Connected to SQLite database");

    return db;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

export const getDB = (): Database => {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
};

export const closeDB = async (): Promise<void> => {
  if (db) {
    try {
      await db.close();
      db = null;
      console.log("Database connection closed");
    } catch (error) {
      console.error("Error closing database:", error);
      throw error;
    }
  }
};
