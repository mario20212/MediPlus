const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const Cart = require('../models/cart');


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
                    req.session.username = user.username;
                    req.session.userEmail = user.email;
                    req.session.userId = user.user_id;
                    console.log(req.session.isAdmin);


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

    async deleteUser(req, res) {
        console.log('in controller')
        const userEmail = req.body.email;

        try {
            const userToDelete = await this.userModel.getUserByEmail(userEmail);
            console.log('userToDelete:', userToDelete)
            if (!userToDelete) {
                return { success: false, message: 'User not found' };
            }

            const result = await this.userModel.deleteUserByEmail(userEmail);
            console.log(result);

            console.log(`User with email ${userEmail} deleted successfully`);
            return { success: true, message: 'User deleted successfully' };
        } catch (error) {
            console.error('Error deleting user:', error.message);
            return { success: false, message: 'Error occurred while deleting user in controller' };
        }
    }
    async updateUser(req, res) {
        console.log('in controller');
        const { email, username, password, role } = req.body;

        // Validate role input
        const isAdmin = role.toLowerCase() === 'admin' ? 1 : 0;

        try {
            const userToUpdate = await this.userModel.getUserByEmail(email);

            if (!userToUpdate) {
                return { success: false, message: 'User not found' };
            }

            userToUpdate.username = username;
            userToUpdate.password = await bcrypt.hash(password, 10); // Hash the new password
            userToUpdate.isAdmin = isAdmin; // Set the isAdmin field based on the validated role

            await this.userModel.updateUser(userToUpdate);

            console.log(`User with email ${email} updated successfully`);
            return { success: true, message: 'User updated successfully' };
        } catch (error) {
            console.error('Error updating user:', error.message);
            return { success: false, message: 'Error occurred while updating user in controller' };
        }
    }



}

module.exports = UserController;