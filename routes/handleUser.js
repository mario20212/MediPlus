const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const Userhandler = new UserController();

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/login', (req, res) => Userhandler.loginUser(req, res));
router.post('/register', (req, res) => {
    console.log('test');
    Userhandler.registerNewUser(req, res);
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ success: false, error: 'An error occurred during logout' });
        } else {
            res.json({ success: true, message: 'Logout successful' });
        }
    });
});

module.exports = router;
