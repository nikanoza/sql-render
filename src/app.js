import express from "express";
import pool, { createTable } from "./config/sql.js";
import swagger from "./middlewares/swagger-middleware.js";

const app = express();


async function initialize() {
    try {
      await createTable();
      startServer();
    } catch (err) {
      console.error('Error creating table:', err);
    }
  }
  
  function startServer() {
    app.get('/api/books', async (req, res) => {
      try {
        const queryResult = await pool.query('SELECT * FROM books');
        const books = queryResult.rows;
        res.json(books);
      } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Error fetching books');
      }
    });

    app.use("/", ...swagger);
  
    app.listen(3000);
  }

  initialize();