const Router = require('express');
const router = Router();
const MedicineController = require('../controllers/medicine-controller');

const medicineController = new MedicineController();

router.get('/:medicineId', async (req, res) => {
    const medicineId = req.params.medicineId;

    try {
        const specificMedicine = await medicineController.getMedicineById(medicineId);
        console.log(specificMedicine);
        res.render('product_page', { specificMedicine: specificMedicine });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
