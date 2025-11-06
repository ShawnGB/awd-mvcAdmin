import type { Response, Request } from "express";

const indexHandler = (req: Request, res: Response) => {
  res.render("index.njk", { title: "New Page", message: "Hello World" });
};

const adminHandler = (req: Request, res: Response) => {
  res.render("admin/admin.njk", {
    title: "Admin",
    message: "Admin Mvc",
  });
};
export { indexHandler, adminHandler };
