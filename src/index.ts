import "dotenv/config";
import express from "express";
import nunjucks from "nunjucks";
import { indexHandler } from "./handler/handlers";
import { logger } from "./middleware/loggerMiddleware";

const app = express();
const port = process.env.PORT || 3030;

//nunjucks config
nunjucks.configure("src/templates", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

//middleware init
app.use(logger);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("{/:id}", indexHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
