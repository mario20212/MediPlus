// const bcrypt = require('bcrypt');
// const { query } = require('../database/MySQL-connection');

// class UserModel {
//   async getUserByEmail(email) {
//     const rows = await query('SELECT * FROM user_info WHERE email = ?', [email]);
//     return rows[0];
//   }

//   async createUser(username, email, password, isAdmin) {
//     const hashedPwd = await bcrypt.hash(password, 10);
//     await query('INSERT INTO user_info (username, email, password, isAdmin) VALUES (?, ?, ?, ?)', [username, email, hashedPwd, isAdmin]);
//   }
//   async getUserCount() {
//     try {
//       const [result] = await query('SELECT COUNT(*) as userCount FROM user_info');
      
//       if (!result || typeof result !== 'object') {
//         throw new Error('Unexpected response from the database for user count');
//       }

//       const userCount = result.userCount || 0;
//       console.log(`User count: ${userCount}`);
      
//       return userCount;
//     } catch (error) {
//       console.error('Error getting user count:', error.message);
//       throw error;
//     }
//   }
//   async getAllUsers() {
//     try {
//       const rows = await query('SELECT * FROM user_info');
//       return rows;
//     } catch (error) {
//       console.error('Error getting all users:', error.message);
//       throw error;
//     }
//   }
//   async deleteUserByEmail(email) {
//     console.log('in model')
//     try {
//       const result = await query('DELETE FROM user_info WHERE email = ?', [email]);

//       if (!result || typeof result !== 'object') {
//         throw new Error('Unexpected response from the database for delete user');
//       }

//       console.log(`User with email ${email} deleted successfully`);
//       return result;
//     } catch (error) {
//       console.error('Error deleting user by email:', error.message);
//       throw error;
//     }
//   }
//   async updateUser(user) {
//     try {
//       const { email, username, password, role } = user;

//       const hashedPwd = password ? await bcrypt.hash(password, 10) : null;

//       const queryValues = [username, hashedPwd, role, email];

//       await query('UPDATE user_info SET username = ?, password = IFNULL(?, password), isAdmin = ? WHERE email = ?', queryValues);
//     } catch (error) {
//       console.error('Error updating user:', error.message);
//       throw error;
//     }
//   }
// }

// module.exports = UserModel;

// Person class (Abstract)
class Person {
  constructor(id, username, password, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

// Admin class
class Admin extends Person {
  constructor(id) {
    super(id);
  }

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

  async deleteUser(email) {
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

  async addMedicine(medicineData, userID) {
    try {
      const [maxIdResult] = await query('SELECT MAX(id) AS maxId FROM medicine_details');
      const maxId = maxIdResult.maxId || 0;

      const newId = maxId + 1;

      const insertQuery = 'INSERT INTO medicine_details SET ?';
      const result = await query(insertQuery, [{
        id: newId,
        'Medicine Name': medicineData.MedicineName,
        medicine_type: medicineData.medicine_type,
        Composition: medicineData.Composition,
        Uses: medicineData.Uses,
        Side_effects: medicineData.Side_effects,
        Manufacturer: medicineData.Manufacturer,
        Price: medicineData.Price,
        Quantity: medicineData.Quantity,
        'Excellent Review %': 0,
        'Average Review %': 0,
        'Poor Review %': 0,
        AddedByUserID: userID,
        UpdatedByUserID: userID
      }]);

      console.log('Insert Result:', result);

      if (!result || result.affectedRows !== 1) {
        throw new Error('Failed to add medicine to the database');
      }

      return newId;
    } catch (error) {
      console.error('In Model Error adding medicine:', error.message);
      throw error;
    }
  }

  async getMedStats(){
    try {
      const [row_count] = await query('SELECT COUNT(*) as rowCount FROM medicine_details');
  
      console.log('Query Response:', row_count);
  
      if (!row_count || typeof row_count !== 'object') {
        throw new Error(`Unexpected response from the database for table `);
      }
  
      const rowCount = row_count.rowCount || 0; //value 1
      console.log(`Row count in : ${rowCount}`);
  
      const [latestMedicine] = await query('SELECT `Average Review %` FROM medicine_details LIMIT 1',);
  
      console.log('Query Response:', latestMedicine);
  
      if (!latestMedicine || typeof latestMedicine !== 'object') {
        throw new Error(`Unexpected response from the database for table `);
      }
  
      const averageReviewPercentage = latestMedicine['Average Review %']; //value 2
  
      const firstNineMeds = await query('SELECT * FROM medicine_details LIMIT 9',); //value 3
  
      if (!Array.isArray(firstNineMeds)) {
        throw new Error(`Unexpected response from the database for table `);
      }
  
      const getAllMeds = await query('SELECT * FROM medicine_details',);
  
      if (!Array.isArray(getAllMeds)) {
        throw new Error(`Unexpected response from the database for table `);
      }
  
      return {rowCount, averageReviewPercentage, firstNineMeds, getAllMeds}
  
    } catch (error) {
      console.error('Error getting med stats:', error.message);
      throw error;
    }
  }
  
}

class User extends Person {
  constructor(user_id, firstName, lastName, id, username, password, email) {
    super(id, username, password, email);
    this.user_id = user_id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  async registerUser(user_id, username, password, email, firstName, lastName) {
    
  }

  async setUsername(username) {
    try {
      await query('UPDATE user_info SET username = ? WHERE user_id = ?', [username, this.user_id]);
      this.username = username;
    } catch (error) {
      console.error('Error updating username:', error.message);
      throw error;
    }
  }

  async setEmail(email) {
    try {
      await query('UPDATE user_info SET email = ? WHERE user_id = ?', [email, this.user_id]);
      this.email = email;
    } catch (error) {
      console.error('Error updating email:', error.message);
      throw error;
    }
  }

  async setPassword(password) {
    try {
      const hashedPwd = await bcrypt.hash(password, 10);
      await query('UPDATE user_info SET password = ? WHERE user_id = ?', [hashedPwd, this.user_id]);
      this.password = hashedPwd;
    } catch (error) {
      console.error('Error updating password:', error.message);
      throw error;
    }
  }

  async getUserInfo() {
    try {
      const [user] = await query('SELECT * FROM user_info WHERE user_id = ?', [this.user_id]);
      return user;
    } catch (error) {
      console.error('Error getting user info:', error.message);
      throw error;
    }
  }
}

module.exports = {
  Admin,
  User,
};

