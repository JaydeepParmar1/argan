const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'service_desk_db',
  password: process.env.PG_PASSWORD || 'admin',
  port: process.env.PG_PORT || 5432,
});

pool.connect()
  .then(() => console.log('✅ Postgres Connected'))
  .catch(err => console.error('❌ Database connection failure:', err.message));

module.exports = pool;