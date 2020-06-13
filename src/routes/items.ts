import express from "express";
import { list } from "../controllers/itemsController";

const routesItems = (address: string) => {
  const routes = express();
  
  routes.get("/", async (request, response) => {
    response.send(await list(address));
  });
  return routes
}

export default routesItems;
