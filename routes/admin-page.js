const express = require('express');
const router = express.Router();
const isAdminMiddleware = require('../middleware/isAdminMiddleware');
const MedicineController = require('../controllers/medicine-controller');
const UserController = require('../controllers/userController');
const utilitiesController = require('../controllers/utilities-controller');

const medicineController = new MedicineController();
const userController = new UserController();
const utilityController = new utilitiesController();

router.get('/', isAdminMiddleware, async (req, res) => {
  try {
    const { rowCount, latestMedicine, latestNineMeds } = await medicineController.getMedStats();
    const { userCount } = await userController.getUserStats();

    res.render('dashboard',{ rowCount, userCount, latestMedicine, latestNineMeds });
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

router.post('/delete-user', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const { success, message } = await userController.deleteUser(req, res);

    res.status(200).json({ message: message, success: success });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
});

router.post('/update-user', async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    const { success, message } = await userController.updateUser(email, username, password, role);

    res.status(200).json({ message: message, success: success });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
});

router.post('/addMedicine', async (req, res) => {
  try {
    const {
      MedicineName,
      medicine_type,
      Composition,
      Uses,
      Side_effects,
      Manufacturer,
      Price,
      Quantity
    } = req.body;

    const medicineData = {
      MedicineName,
      medicine_type,
      Composition,
      Uses,
      Side_effects,
      Manufacturer,
      Price,
      Quantity
    };
    console.log('testing id', req.session.userId);  
    const result = await medicineController.addMedicine(medicineData, req.session.userId);

    if (result.success) {
      res.json({ success: true });
    } else {
      throw new Error('Failed to add medicine');
    }
  } catch (error) {
    console.error('Error adding medicine:', error.message);
    res.status(500).json({ success: false, error: 'An error occurred while adding the medicine' });
  }
});

router.post('/addOption', (req, res) => medicineController.createOption(req, res))

router.post('/addValue', (req, res) => medicineController.createValue(req, res))

router.get('/manageNavbar', async (req, res) => {
  try {
    const navigationLinks = await utilityController.getAllNavs();

    res.render('managenavbar', { navigationLinks });
  } catch (error) {
    console.error('Error in manageNavbar route:', error.message);
    res.render('404', { message: 'An error occurred while loading the manageNavbar page.', title: 'Error getting navigation links', errcode: '405' });
  }
});




module.exports = router;



