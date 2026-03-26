const db = require('../config/db');

// Get all users
async function getAllUsers() {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
}

// Get user by ID
async function getUserById(id) {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

// Create user
async function createUser(name, email) {
  const [result] = await db.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  return { id: result.insertId, name, email, is_active: true };
}

// Update user active status
async function updateUserStatus(id, isActive) {
  await db.query('UPDATE users SET is_active = ? WHERE id = ?', [isActive, id]);
  return getUserById(id);
}

// Delete user
async function deleteUser(id) {
  const user = await getUserById(id);
  if (!user) return null;
  await db.query('DELETE FROM users WHERE id = ?', [id]);
  return user;
}

// Best practice: export all functions in an object
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserStatus,
  deleteUser
};