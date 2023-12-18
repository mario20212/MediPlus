const bcrypt = require('bcrypt');
const { query } = require('../database/MySQL-connection');

class UserModel {
  async getUserByEmail(email) {
    const rows = await query('SELECT * FROM user_info WHERE email = ?', [email]);
    return rows[0];
  }

  async createUser(username, email, password, isAdmin) {
    const hashedPwd = await bcrypt.hash(password, 10);
    await query('INSERT INTO user_info (username, email, password, isAdmin) VALUES (?, ?, ?, ?)', [username, email, hashedPwd, isAdmin]);
  }
  async getUserCount() {
    try {
      const [result] = await query('SELECT COUNT(*) as userCount FROM user_info');
      
      if (!result || typeof result !== 'object') {
        throw new Error('Unexpected response from the database for user count');
      }

      const userCount = result.userCount || 0;
      console.log(`User count: ${userCount}`);
      
      return userCount;
    } catch (error) {
      console.error('Error getting user count:', error.message);
      throw error;
    }
  }
  async getAllUsers() {
    try {
      const rows = await query('SELECT * FROM user_info');
      return rows;
    } catch (error) {
      console.error('Error getting all users:', error.message);
      throw error;
    }
  }
  async deleteUserByEmail(email) {
    console.log('in model')
    try {
      const result = await query('DELETE FROM user_info WHERE email = ?', [email]);

      if (!result || typeof result !== 'object') {
        throw new Error('Unexpected response from the database for delete user');
      }

      console.log(`User with email ${email} deleted successfully`);
      return result;
    } catch (error) {
      console.error('Error deleting user by email:', error.message);
      throw error;
    }
  }
  async updateUser(user) {
    try {
      const { email, username, password, role } = user;

      const hashedPwd = password ? await bcrypt.hash(password, 10) : null;

      const queryValues = [username, hashedPwd, role, email];

      await query('UPDATE user_info SET username = ?, password = IFNULL(?, password), isAdmin = ? WHERE email = ?', queryValues);
    } catch (error) {
      console.error('Error updating user:', error.message);
      throw error;
    }
  }
}

module.exports = UserModel;
