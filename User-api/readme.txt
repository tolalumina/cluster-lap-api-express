
const db = require('../config/database');

class UserModel {
  /
   * Creates a new user in the database
   * @param {Object} userData - User data containing name and email
   * @returns {Promise<number>} - The ID of the newly created user
   */
  static async create(userData) {
    try {
      const { name, email } = userData;
      const [result] = await db.execute(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  /
   * Finds a user by their ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  static async findById(id) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  /
   * Finds a user by their email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  static async findByEmail(email) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  /
   * Updates user's active status
   * @param {number} id - User ID
   * @param {boolean} isActive - Active status
   * @returns {Promise<boolean>} - True if updated, false otherwise
   */
  static async updateStatus(id, isActive) {
    try {
      const [result] = await db.execute(
        'UPDATE users SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [isActive, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  /
   * Updates user information
   * @param {number} id - User ID
   * @param {Object} userData - User data to update
   * @returns {Promise<boolean>} - True if updated, false otherwise
   */
  static async update(id, userData) {
    try {
      const { name, email } = userData;
      const [result] = await db.execute(
        'UPDATE users SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, email, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  /
   * Deletes a user from the database
   * @param {number} id - User ID
   * @returns {Promise<boolean>} - True if deleted, false otherwise
   */
  static async delete(id) {
    try {
      const [result] = await db.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  /
   * Retrieves all users from the database
   * @returns {Promise<Array>} - Array of user objects
   */
  static async findAll() {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM users ORDER BY created_at DESC'
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /
   * Retrieves paginated users
   * @param {number} limit - Number of records per page
   * @param {number} offset - Number of records to skip
   * @returns {Promise<Object>} - Users and total count
   */
  static async findPaginated(limit = 10, offset = 0) {
    try {
      const [users] = await db.execute(
        'SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [limit, offset]
      );
      
      const [countResult] = await db.execute(
        'SELECT COUNT(*) as total FROM users'
      );
      
      return {
        users,
        total: countResult[0].total
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Counts active users
   * @returns {Promise<number>} - Count of active