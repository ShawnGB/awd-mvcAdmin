import type { Response, Request } from "express";

const indexHandler = (req: Request, res: Response) => {
  res.render("index.njk", { title: "New Page", message: "Hello World" });
};

const adminHandler = (req: Request, res: Response) => {
  res.render("admin/admin.njk", {
    title: "admin panel",
    message: "Admin Mvc",
  });
};
export { indexHandler, adminHandler };
