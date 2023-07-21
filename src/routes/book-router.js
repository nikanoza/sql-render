import express from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
} from "../controllers/books-controller.js";

const bookRouter = express.Router();

bookRouter.get("/books", getAllBooks);
bookRouter.post("/books", addBook);
bookRouter.delete("/books/:id", deleteBook);

export default bookRouter;
