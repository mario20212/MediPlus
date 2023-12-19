const Router = require('express');
const router = Router();
const MedicineModel = require('../models/MedicineModel');

router.get('/', async (req, res) => {
  try {
    const medicine = new MedicineModel();
    const allMedicines = await medicine.getAllMedicines();
    const page = req.query.page || 1; // Get the page number from the query parameter, default to page 1 if not provided
    const pageSize = 9; // Number of medicines per page

    // Retrieve medicines from the database based on the page number and page size
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedMedicines = allMedicines.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allMedicines.length / pageSize); // Fix the typo here
    res.render('view_all', { Medicines: paginatedMedicines, currentPage: parseInt(page), totalPages });

    //   res.render('view_all', { Medicines: allMedicines });
  } catch (error) {
    // Handle the error appropriately
    console.error('Error in view_all route:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
