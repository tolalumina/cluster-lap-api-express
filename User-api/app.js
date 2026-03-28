const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute');
const db = require('./config/db');

app.use(express.json());
app.use('/api', userRoutes);

// Test DB connection before starting server
db.getConnection()
  .then(conn => {
    conn.release();
    console.log('Database connected successfully');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('Database connection failed:', err.message));