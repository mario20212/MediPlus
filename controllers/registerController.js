const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

class UserController {
  constructor() {
    this.userModel = new UserModel();
  }

  async registerNewUser(req, res) {
    const signupData = req.body;
    if (Object.keys(signupData).length === 3) {
      try {
        const user = await this.userModel.getUserByEmail(signupData.email);
        if (user) {
          res.send({ success: "email is already used" });
        } else {
          await this.userModel.createUser(signupData.username, signupData.email, signupData.password);
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
    const loginData = req.body;
    try {
      const user = await this.userModel.getUserByEmail(loginData.email);
      if (user) {
        const isPasswordMatch = await bcrypt.compare(loginData.password, user.password);
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
