require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

app.use((req, res, next) => {
  req.db = pool;
  next();
});

app.get('/api/paintings', async (req, res) => {
  try {
    const [rows] = await req.db.query(`
      SELECT p.painting_id, p.title, p.price, p.status, 
             a.first_name, a.last_name, g.gallery_name
      FROM Painting p
      JOIN Artist a ON p.artist_id = a.artist_id
      JOIN Gallery g ON p.gallery_id = g.gallery_id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/paintings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await req.db.query('SELECT * FROM Painting WHERE painting_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/paintings', async (req, res) => {
  const { title, price, status, gallery_id, artist_id, creation_year, medium } = req.body;
  try {
    const [result] = await req.db.query(
      'INSERT INTO Painting (title, price, status, gallery_id, artist_id, creation_year, medium) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, price, status, gallery_id, artist_id, creation_year, medium]
    );
    res.status(201).json({ painting_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/paintings/:id', async (req, res) => {
  const { id } = req.params;
  const { title, price, status } = req.body;
  try {
    await req.db.query('UPDATE Painting SET title = ?, price = ?, status = ? WHERE painting_id = ?', [title, price, status, id]);
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/paintings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await req.db.query('DELETE FROM Painting WHERE painting_id = ?', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    if (err.code === 'ER_SIGNAL_EXCEPTION') return res.status(400).json({ error: err.message });
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await req.db.query(`
      SELECT customer_id, first_name, last_name, email, phone, address, registration_date, loyalty_points
      FROM Customer
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});