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
}

module.exports = UserModel;
