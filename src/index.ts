import "dotenv/config";
import "./model/init";
import express from "express";
import nunjucks from "nunjucks";
import { logger } from "./middleware/loggerMiddleware";
import { router } from "./controller/routes";

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

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
