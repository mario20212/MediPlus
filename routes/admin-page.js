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

router.get('/manage-medicine-content', async (req, res) => {
  try {
    const { allMedicines } = await medicineController.getMedStats();
    res.render('managemedicine', { allMedicines });
  } catch (error) {
    console.error('Error in manage medicine route:', error.message);
    res.render('404', { message: 'An error occurred while loading the manage medicine page.', title: 'Error getting medicine stats', errcode: '405' });
  }
});

router.delete('/manage-users-content/deleteUser/:userEmail', async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const {success, message} = await userController.deleteUser(req, res);

    res.status(200).json({ message: message, success: success });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'An error occurred while deleting the user'});
  }
})


module.exports = router;


