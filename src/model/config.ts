import path from "node:path";

const dbConfig = {
  dir: path.resolve("mockdb"),
  get file() {
    return path.join(this.dir, "db.json");
  },
} as const;

export default dbConfig;
