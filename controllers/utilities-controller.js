const MedicineModel = require('../models/MedicineModel');
const NavigationLinks = require('../models/NavigationLink');

class utilitiesController {
    constructor() {
        this.medModel = new MedicineModel();
        this.navModel = new NavigationLinks();
    }

    async createNav(req, res) {
        try {
            const { label, url } = req.body;

            const addedNav = new NavigationLinks(label, url);
            const savedNav = await addedNav.save();

            res.json({ success: true, message: 'Nav created successfully', optionId: savedNav });
        } catch (error) {
            console.error('Error creating Nav:', error.message);
            res.status(500).json({ success: false, error: 'An error occurred while creating the Nav' });
        }

    }
    async getAllNavs(req, res) {
        try {
            const result = await this.navModel.getAll();
    
            if (result && result.length > 0) {
                
            } else {
                res.status(404).json({ success: false, error: 'No navigation items found.' });
            }
        } catch (error) {
            console.error('Error getting navigation items:', error.message);
            res.status(500).json({ success: false, error: 'An error occurred while fetching navigation items.' });
        }
    }



}

