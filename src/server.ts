import express from "express";
import routes from "./routes";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  routes.use(express.static(path.resolve(__dirname, "..", "uploads")))
);
app.use(
  "/tmp",
  routes.use(express.static(path.resolve(__dirname, "..", "tmp")))
);

app.use(routes);

app.listen(3333, () => console.log(" server listening on port 3333"));
