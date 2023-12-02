const express = require('express');
const router = express.Router();
const MedicineController = require('../controllers/medicine-controller');

const apiKey = 'c09d273a61msh9e15c25b8e896b7p12bbb0jsn940198a20192';
const medicineController = new MedicineController(apiKey);

router.get('/', (req, res) =>{
    medicineController.medDisplay(req, res)
} );

module.exports = router;