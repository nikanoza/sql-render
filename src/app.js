import express from "express";
import pool, { createTable } from "./config/sql.js";
import swagger from "./middlewares/swagger-middleware.js";
import bodyParser from "body-parser";
import cors from "cors";

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
    app.use(bodyParser.json());
    app.use(cors());

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
    
    app.post('/api/books', async (req, res) => {
      try {
        const { title, author } = req.body;
        if (!title || !author) {
          return res.status(400).json({ error: 'Both title and author are required' });
        }
  
        const queryResult = await pool.query(
          'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *',
          [title, author]
        );
  
        const newBook = queryResult.rows[0];
        res.json(newBook);
      } catch (err) {
        console.error('Error inserting book:', err);
        res.status(500).send('Error inserting book');
      }
    });
    
    app.use("/", ...swagger);
  
    app.listen(3000);
  }

  initialize();