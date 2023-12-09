const express = require('express');
const router = express.Router();
const isAdminMiddleware = require('../middleware/isAdminMiddleware');
const MedicineController = require('../controllers/medicine-controller');
const UserController = require('../controllers/userController');

const medicineController = new MedicineController();
const userController = new UserController();

router.get('/', isAdminMiddleware, async (req, res) => {
  res.render('dashboard');
})

router.get('/statistics', async (req, res) => {
  try {
    const { rowCount, latestMedicine, latestNineMeds } = await medicineController.getMedStats();
    const { userCount } = await userController.getUserStats();

    res.render('statistics',{ rowCount, userCount, latestMedicine, latestNineMeds });
  } catch (error) {
    console.error('Error in dashboard route:', error.message);
    res.render('404', { message: 'An error occurred while loading the dashboard.' , title: 'Error getting statistics', errcode: '405'});
  }
})

router.get('/manage-users-content', async (req, res) => {
  try {
    const { allUsers } = await userController.getUserStats();
    res.render('manageusers', { allUsers });
  } catch (error) {
    console.error('Error in manage users route:', error.message);
    res.render('404', { message: 'An error occurred while loading the manage users page.', title: 'Error getting user stats', errcode: '405' });
  }
});


module.exports = router;


