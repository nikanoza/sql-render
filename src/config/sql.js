import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'nikanoza',
    host: 'dpg-cisjbt95rnujejpl7vsg-a',
    database: 'books_2y3i',
    password: 'DkOcARFxwaGn9lKlmqz45Aazswe82yIN',
    port: 5432,
});

export const createTable = () => {
    return pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title TEXT,
        author TEXT
      );
    `);
  }

export default pool;