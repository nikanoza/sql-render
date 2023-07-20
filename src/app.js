import express from "express";
import pool, { createBooksTable } from "./config/sql.js";

const app = express();


app.get('/books', async (req, res) => {
    try {
        const queryResult = await pool.query('SELECT * FROM books');
        const books = queryResult.rows;
        res.json(books);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Error fetching books');
    }
});


async function initialize() {
    try {
      await createBooksTable();
      app.listen(3000);
    } catch (err) {
      console.error('Error creating table:', err);
    }
  }

initialize();
