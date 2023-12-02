const Router=require('express');
const router=Router();
//var nodemailer = require('nodemailer');

router.get('/', (req,res)=>{
    res.render('add_doctor');
});

module.exports = router;