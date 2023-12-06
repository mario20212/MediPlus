const express = require('express');
const router = express.Router();
const isAdminMiddleware = require('../middleware/isAdminMiddleware');

router.get('/', isAdminMiddleware, (req, res) => {
  res.render('dashboard');
});

module.exports = router;
