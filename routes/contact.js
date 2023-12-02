const Router=require('express');
const router=Router();
//var nodemailer = require('nodemailer');

router.get('/', (req,res)=>{
    res.render('contact');
});

module.exports = router;