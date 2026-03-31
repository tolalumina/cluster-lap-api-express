// models/user.model.js
const db = require("../config/db");

const findByEmail = async (email) => {
  const [rows] = await db.execute(
    "SELECT id, name, email, password FROM users WHERE email = ?",
    [email]
  );
  return rows[0] || null;
};

const createUser = async ({ name, email, password }) => {
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return { id: result.insertId, name, email };
};



module.exports = { findByEmail, createUser };