const bcrypt = require('bcrypt');
const { query } = require('../database/MySQL-connection');

class UserController {
  async registerNewUser(req, res) {
    const signupData = req.body;
    if (Object.keys(signupData).length === 3) {
      try {
        const rows = await query('SELECT * FROM user_info WHERE email = ?', [signupData.email]);
        if (rows && rows.length > 0) {
          res.send({ success: "email is already used" });
        } else {
          const hashedPwd = await bcrypt.hash(signupData.password, 10);
          await query('INSERT INTO user_info (username, email, password) VALUES (?, ?, ?)', [signupData.username, signupData.email, hashedPwd]);
          console.log(`New user ${signupData.username} created!`);
          res.send({ success: "true", data: signupData });
        }
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "An error occurred while processing your request" });
      }
    } else {
      res.status(400).send({ error: "Invalid request for user registration" });
    }
  }

  async loginUser(req, res) {
    console.log('Here right now')
    const loginData = req.body;
    try {
      const user = await query('SELECT * FROM user_info WHERE email = ?', [loginData.email]);
      if (user && user.length > 0) {
        const isPasswordMatch = await bcrypt.compare(loginData.password, user[0].password);
        if (isPasswordMatch) {
          res.send({ success: "true", data: user });
        } else {
          res.send({ success: "Incorrect Email/Password" });
        }
      } else {
        res.send({ success: "Incorrect Email/Password" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "An error occurred while processing your request" });
    }
  }
}

module.exports = UserController;
