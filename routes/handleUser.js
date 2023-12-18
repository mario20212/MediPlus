const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const Userhandler = new UserController();

const clearSessionStorage = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error clearing session storage:', err);
        }
        next();
    });
};

router.get('/', clearSessionStorage, (req, res) => {
    res.render('register');
});

router.post('/login', (req, res) => Userhandler.loginUser(req, res));
router.post('/register', (req, res) => {
    console.log('test');
    Userhandler.registerNewUser(req, res);
});

module.exports = router;
