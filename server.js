const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = new Pool({
    user: process.env.PG_USER || 'postgres',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DATABASE || 'service_desk_db',
    password: process.env.PG_PASSWORD || 'admin',
    port: process.env.PG_PORT || 5432,
});

// Test DB Connection
pool.connect()
  .then(() => console.log('✅ Postgres Connected'))
  .catch(err => console.error('❌ Connection error', err.stack));

// 1. CREATE TICKET
app.post('/tickets', async (req, res) => {
    try {
        const { title, description, categoryId, priority } = req.body;
        const newTicket = await pool.query(
            "INSERT INTO Tickets (Title, Description, CategoryId, Priority) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, categoryId, priority]
        );
        res.status(201).json(newTicket.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

// 2. GET ALL TICKETS
app.get('/tickets', async (req, res) => {
    try {
        const allTickets = await pool.query(`
            SELECT t.*, c.Name as CategoryName 
            FROM Tickets t 
            LEFT JOIN Categories c ON t.CategoryId = c.CategoryId
            ORDER BY t.CreatedDate DESC
        `);
        res.json(allTickets.rows);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

// 3. GET SINGLE TICKET
app.get('/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await pool.query("SELECT * FROM Tickets WHERE TicketId = $1", [id]);
        if (ticket.rows.length === 0) return res.status(404).json({ message: "Ticket not found" });
        res.json(ticket.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

// 4. UPDATE TICKET
app.put('/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, categoryId, priority, status } = req.body;
        const updateTicket = await pool.query(
            "UPDATE Tickets SET Title = $1, Description = $2, CategoryId = $3, Priority = $4, Status = $5 WHERE TicketId = $6 RETURNING *",
            [title, description, categoryId, priority, status, id]
        );
        res.json(updateTicket.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

// 5. CLOSE TICKET
app.put('/tickets/:id/close', async (req, res) => {
    try {
        const { id } = req.params;
        const closeTicket = await pool.query(
            "UPDATE Tickets SET Status = 'Closed' WHERE TicketId = $1 RETURNING *",
            [id]
        );
        res.json(closeTicket.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server flying on port ${PORT}`));