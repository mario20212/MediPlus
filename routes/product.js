const Router = require('express');
const router = Router();
const MedicineController = require('../controllers/medicine-controller');

const medicineController = new MedicineController();

router.get('/:medicineId', async(req, res) => {
    const medicineId = req.params.medicineId;

    try {
        const { medicine, relatedMedicines } = await medicineController.getMedicineById(medicineId);
        // const option= await medicineController.getMedicineOptionsById(medicineId);
        console.log('testing here: ', relatedMedicines)

        res.render('product_page', { medicine, relatedMedicines }); // options: option

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;