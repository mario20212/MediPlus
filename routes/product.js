const { Router } = require('express');
const router = Router();
const MedicineController = require('../controllers/medicine-controller');

const medicineController = new MedicineController();

router.get('/:medicineId', async (req, res) => {
    const { medicineId } = req.params;

    try {
        const { medicine, relatedMedicines } = await medicineController.getMedicineById(medicineId);

        console.log('Testing here:', relatedMedicines);

        res.render('product_page', { medicine, relatedMedicines });

    } catch (error) {
        console.error('Error processing the request:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
