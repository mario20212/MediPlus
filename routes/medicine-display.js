const express = require('express');
const router = express.Router();
const MedicineController = require('../controllers/medicine-controller');

const medicineController = new MedicineController();

router.get('/', (req, res) =>{
    medicineController.medDisplay(req, res)
} );

module.exports = router;