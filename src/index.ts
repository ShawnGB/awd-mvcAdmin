import "dotenv/config";
import express from "express";
import nunjucks from "nunjucks";
import { logger } from "./middleware/loggerMiddleware";
import { router } from "./controller/routes";
import { connectDB, closeDB } from "./db/db";

const app = express();
const port = process.env.PORT || 3030;

//nunjucks config
nunjucks.configure("src/view", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

//middleware init
app.use(logger);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

const shutdown = async (signal: string): Promise<void> => {
  console.log(`${signal} received, shutting down gracefully...`);
  try {
    await closeDB();
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();
