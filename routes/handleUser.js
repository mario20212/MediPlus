const express = require('express');
const router = express.Router();
const UserController = require('../controllers/registerController');

const Userhandler = new UserController();

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/login', (req, res) => Userhandler.loginUser(req, res));
router.post('/register', (req, res) => {
    console.log('test')
    Userhandler.registerNewUser(req, res)
});

module.exports = router;