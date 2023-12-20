const { Router } = require('express');
const router = Router();
const MedicineController = require('../controllers/medicine-controller');

const medicineController = new MedicineController();

router.get('/:medicineId', async(req, res) => {
    const medicineId = req.params.medicineId;

    try {
        const { medicine, relatedMedicines } = await medicineController.getMedicineById(medicineId);
        const result = await medicineController.getMedOptionsByID(medicineId);
        console.log('testing here:', result);

        res.render('product_page', { medicine, relatedMedicines, option: result });

    } catch (error) {
        console.error('Error processing the request router:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// router.get('/:medicineName', async (req, res) => {
//     const medicineName = req.params.medicineName
//     try {
//         const { medicine, relatedMedicines } = await medicineController.getMedicineByName(medicineName);
//         const result = await medicineController.getMedOptionsByID(medicine.id);
//         console.log('testing here:', result);

//         res.render('product_page', { medicine, relatedMedicines, option: result });

//     } catch (error) {
//         console.error('Error processing the request router:', error.message);
//         res.status(500).send('Internal Server Error');
//     }
// })


module.exports = router;