const express = require('express');
const router = express.Router();
const UserController = require('../controllers/registerController');

const Userhandler = new UserController();

router.get('/',(req,res)=>
{
    res.render('register')
})

router.post('/login', (req, res) => Userhandler.registerNewUser(req, res));
router.post('/register', (req, res) => Userhandler.loginUser(req, res));

module.exports = router;