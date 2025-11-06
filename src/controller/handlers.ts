import type { Response, Request } from "express";

const indexHandler = (req: Request, res: Response) => {
  res.render("index.njk", { title: "New Page", message: "Hello World" });
};

export { indexHandler };
