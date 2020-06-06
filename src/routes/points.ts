import express from "express";
import {create} from "../controllers/pointsController"

const routes = express();

routes.post("/", async (request, response) => {
  response.send(await create(request.body))
});

export default routes;
