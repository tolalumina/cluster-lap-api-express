const db = require('../config/db');

const User = {
  create: (username, email, hashedPassword, callback) => {
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.query(query, [username, email, hashedPassword], callback);
  },

  findByEmail: (email, callback) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], callback);
  }
};

module.exports = User;


/*

const db = require('../config/db').promise(); // Use promise wrapper

const User = {
  // Create a new user
  create: async (username, email, hashedPassword) => {
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const [result] = await db.query(query, [username, email, hashedPassword]);
    return result;
  },

  // Find user by email
  findByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.query(query, [email]);
    return rows;
  }
};

module.exports = User;

/*