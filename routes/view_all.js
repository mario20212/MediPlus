const Router=require('express');
const router=Router();

router.get('/', (req,res)=>{
    res.render('view_all');
});


module.exports = router;