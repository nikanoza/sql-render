import express from "express";
import { createBooksTable } from "./config/sql.js";

const app = express();

app.get("/", (req, res) => {
    return res.status(200).json({message: "works!"});
});

async function initialize() {
    try {
      await createBooksTable();
      console.log('Table "books" created successfully!');
      app.listen(3000, () => {
        console.log(`Server is running!`);
      });
    } catch (err) {
      console.error('Error creating table:', err);
    }
  }

initialize();
