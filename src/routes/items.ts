import express from "express";
import { list } from "../controllers/itemsController";

const routes = express();

routes.get("/", async (request, response) => {
  response.send(await list());
});

export default routes;
