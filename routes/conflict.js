const Router=require('express');
const router=Router();


router.get('/', (req,res)=>{
    res.render('conflict');
});

router.post('/', async (req,res) =>
{
    
})

module.exports = router;