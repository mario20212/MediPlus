const express = require('express');
const router = express.Router();
const isAdminMiddleware = require('../middleware/isAdminMiddleware');
const MedicineController = require('../controllers/medicine-controller');
const UserController = require('../controllers/registerController');

const medicineController = new MedicineController();
const userController = new UserController();

router.get('/', isAdminMiddleware, async (req, res) => {
  try {
    const rowCount = await medicineController.getMedStats();
    const userCount = await userController.getUserStats();

    res.render('dashboard', { rowCount, userCount });
  } catch (error) {
    console.error('Error in dashboard route:', error.message);
    res.render('404', { message: 'An error occurred while loading the dashboard.' , title: 'Error getting statistics', errcode: '405'});
  }
});

module.exports = router;

