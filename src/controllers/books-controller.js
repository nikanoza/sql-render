import pool from "../config/sql.js";

export const getAllBooks = async (req, res) => {
  try {
    const queryResult = await pool.query("SELECT * FROM books");
    const books = queryResult.rows;
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Error fetching books");
  }
};

export const addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res
        .status(400)
        .json({ error: "Both title and author are required" });
    }

    const queryResult = await pool.query(
      "INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *",
      [title, author]
    );

    const newBook = queryResult.rows[0];
    res.json(newBook);
  } catch (err) {
    console.error("Error inserting book:", err);
    res.status(500).send("Error inserting book");
  }
};
