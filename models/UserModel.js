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
}

module.exports = UserModel;
