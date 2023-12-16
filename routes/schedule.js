const Router=require('express');
const router=Router();


router.get('/', (req,res)=>{
    res.render('schedule');
});

router.post('/', (req, res) => {
    const schedule = req.body;
    console.log(schedule);
    res.send({ success: 'testing' });
});  

module.exports = router;