import { promises as fs, constants } from "node:fs";
import path from "node:path";
import type { Request, Response, NextFunction } from "express";

const LOG_DIR = path.resolve("logs");
const LOG_FILE = path.join(LOG_DIR, "requests.log");

const ensureLogFile = async (): Promise<void> => {
  await fs.mkdir(LOG_DIR, { recursive: true });
  try {
    await fs.access(LOG_FILE, constants.F_OK);
  } catch {
    await fs.writeFile(LOG_FILE, "", "utf-8");
  }
};

const addLogMessage = async (message: string): Promise<void> => {
  if (!message?.trim()) return;
  await fs.appendFile(LOG_FILE, message + "\n");
};

export const logger = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  await ensureLogFile();

  const { method, originalUrl: url, ip } = req;
  const time = new Date().toISOString();

  const logEntry = JSON.stringify({ time, method, url, ip });

  await addLogMessage(logEntry);
  next();
};
