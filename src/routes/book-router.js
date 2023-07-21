import express from "express";
import { addBook, getAllBooks } from "../controllers/books-controller.js";

const bookRouter = express.Router();

bookRouter.get("/books", getAllBooks);
bookRouter.post("/books", addBook);

export default bookRouter;
