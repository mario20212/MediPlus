const Router=require('express');
const router=Router();
const utilitiesController=require('../controllers/utilities-controller')
const utilityController=new utilitiesController();
router.get('/', (req,res)=>{
    res.render('conflict');
});

router.post('/', async (req,res) => utilityController.conflict(req,res))

module.exports = router;