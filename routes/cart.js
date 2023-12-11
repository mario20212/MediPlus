const Router=require('express');
const router=Router();

router.get('/',(req, res) =>{
     res.render('medcart');
})

module.exports = router;