const Router=require('express');
const router=Router();

router.get('/', (req,res)=>{
    res.render('search');
});


module.exports = router;