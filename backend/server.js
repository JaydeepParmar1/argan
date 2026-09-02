const express = require('express');
const cors = require('cors');
require('dotenv').config();
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Bind the router
app.use('/tickets', ticketRoutes);

// Fallback for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found.` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server flying on port ${PORT}`));