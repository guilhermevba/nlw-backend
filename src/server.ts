import express from "express";
import routes from "./routes";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use("/tmp", express.static(path.resolve(__dirname, "..", "tmp")));

app.use("/health", (request, response) => {
  response.json({ running: true, datetime: Date.now() });
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`server listening on port ${port}`)
);

const address = process.env.ADDRESS || `http://localhost:${port}`

app.use(routes(address));
