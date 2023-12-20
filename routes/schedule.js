const Router=require('express');
const router=Router();
const utilitiesController = require('../controllers/utilities-controller');

const Utilites = new utilitiesController();


router.get('/', (req,res)=>{
    res.render('schedule');
});

router.post('/', (req, res) => Utilites.saveschedule(req,res)); 



module.exports = router;