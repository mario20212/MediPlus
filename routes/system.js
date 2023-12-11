const Router = require('express');
const router = Router();
const System = require('../models/system');
router.get('/sendemail', (req, res) => {


    const system = new System();

    const recipientEmail = 'recipient@example.com';
    const reminderMessage = 'You need to take the medicine now.';

    system.sendEmail(recipientEmail, reminderMessage);
});
module.exports = router;