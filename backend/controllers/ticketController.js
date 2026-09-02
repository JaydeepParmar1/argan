const pool = require('../config/db');

const isValidId = (id) => /^[0-9]+$/.test(id);
const VALID_PRIORITIES = ['Low', 'Medium', 'High'];
const VALID_STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

exports.createTicket = async (req, res) => {
  try {
    const { title, description, categoryId, priority } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ error: 'Title required.' });
    if (!categoryId || !isValidId(String(categoryId))) return res.status(400).json({ error: 'Valid categoryId required.' });
    if (!priority || !VALID_PRIORITIES.includes(priority)) return res.status(400).json({ error: 'Valid priority required.' });

    const newTicket = await pool.query(
      'INSERT INTO Tickets (Title, Description, CategoryId, Priority) VALUES ($1, $2, $3, $4) RETURNING *',
      [title.trim(), description ? description.trim() : null, categoryId, priority]
    );
    return res.status(201).json(newTicket.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const allTickets = await pool.query(`
      SELECT t.*, c.Name as CategoryName 
      FROM Tickets t LEFT JOIN Categories c ON t.CategoryId = c.CategoryId
      ORDER BY t.CreatedDate DESC
    `);
    return res.status(200).json(allTickets.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid ID.' });
    const ticket = await pool.query("SELECT * FROM Tickets WHERE TicketId = $1", [id]);
    if (ticket.rows.length === 0) return res.status(404).json({ error: 'Not found.' });
    return res.status(200).json(ticket.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId, priority, status } = req.body;
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid ID.' });
    
    const updateTicket = await pool.query(
      `UPDATE Tickets SET Title = COALESCE($1, Title), Description = COALESCE($2, Description), 
       CategoryId = COALESCE($3, CategoryId), Priority = COALESCE($4, Priority), Status = COALESCE($5, Status) 
       WHERE TicketId = $6 RETURNING *`,
      [title || null, description || null, categoryId || null, priority || null, status || null, id]
    );
    if (updateTicket.rows.length === 0) return res.status(404).json({ error: 'Not found.' });
    return res.status(200).json(updateTicket.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.closeTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid ID.' });

    const closeTicket = await pool.query("UPDATE Tickets SET Status = 'Closed' WHERE TicketId = $1 RETURNING *", [id]);
    if (closeTicket.rows.length === 0) return res.status(404).json({ error: 'Not found.' });
    if (note && note.trim()) await pool.query('INSERT INTO Comments (TicketId, Notes) VALUES ($1, $2)', [id, note.trim()]);
    
    return res.status(200).json(closeTicket.rows[0]);
  } 
   catch (err) {
    console.error("Database Error:", err.message); 
    return res.status(500).json({ error: 'Internal server error' }); 
  }
};