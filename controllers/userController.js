const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

class UserController {
  constructor() {
    this.userModel = new UserModel();
  }

  async registerNewUser(req, res) {
    const signupData = req.body;
  
    if (Object.keys(signupData).length >= 3) {  
      try {
        const user = await this.userModel.getUserByEmail(signupData.email);
        if (user) {
          res.send({ success: "email is already used" });
        } else {
          await this.userModel.createUser(signupData.username, signupData.email, signupData.password, signupData.isAdmin);
          
          const newUser = await this.userModel.getUserByEmail(signupData.email);
  
          console.log(`New user ${signupData.username} created! isAdmin: ${signupData.isAdmin}`);
          res.send({ success: "true", data: { user: newUser, isAdmin: signupData.isAdmin } });
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
          req.session.isAdmin = user.isAdmin === 1;
          console.log(req.session.isAdmin)
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

  async getUserStats() {
    try {
      const userCount = await this.userModel.getUserCount();
      let allUsers = await this.userModel.getAllUsers();
      allUsers = allUsers.map(user => {
        return {
          ...user,
          role: user.isAdmin === 1 ? 'Admin' : 'User'
        };
      });
  
      console.log('User count:', userCount);
      console.log('All users:', allUsers);
  
      return {
        userCount,
        allUsers
      };
    } catch (error) {
      console.error('Error getting user stats:', error.message);
      throw new Error('An error occurred while fetching user stats');
    }
  }
  
}

module.exports = UserController;
