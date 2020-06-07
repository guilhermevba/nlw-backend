import express from "express";
import { create, show, list } from "../controllers/pointsController";
import multer from "multer";
const routes = express();

routes.post("/", multer({dest: 'uploads/'}).single('file'), async (request, response) => {
  response.send(await create(request.file, request.body));
});

routes.get("/", async (request, response) => {
  response.send(await list(request.query));
});

routes.get("/:id", async (request, response) => {
  try {
    response.send(await show(parseInt(request.params.id)));
  } catch (err) {
    response.status(400).send(err);
  }
});

export default routes;
