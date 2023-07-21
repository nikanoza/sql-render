import express from "express";
import pool, { createTable } from "./config/sql.js";
import swagger from "./middlewares/swagger-middleware.js";
import bodyParser from "body-parser";
import cors from "cors";
import bookRouter from "./routes/book-router.js";

const app = express();

async function initialize() {
  try {
    await createTable();
    startServer();
  } catch (err) {
    console.error("Error creating table:", err);
  }
}

function startServer() {
  app.use(bodyParser.json());
  app.use(cors());
  app.use("/api", bookRouter);
  app.use("/", ...swagger);

  app.listen(3000);
}

initialize();
