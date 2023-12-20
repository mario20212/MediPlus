const Router=require('express');
const router=Router();
const utilitiesController = require('../controllers/utilities-controller')

const utilityController = new utilitiesController()

router.get('/', (req,res)=>{
    res.render('ocr_page');
});

router.post('/', async (req,res)=> {
    await utilityController.performOCR(req, res)
});

module.exports = router;