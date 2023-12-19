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
    async conflict(req,res){
        const { drugNames } = req.body; 

        try {
          const rxcuis = [];
      
          // Call the RXCUI finder API for each drug
          for (const drugName of drugNames) {
            const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drugName}`);
            if (response.data.idGroup && response.data.idGroup.rxnormId) {
              const rxcui = response.data.idGroup.rxnormId[0];
              rxcuis.push(rxcui);
              console.log(`RXCUI for ${drugName}: ${rxcui}`);
            } else {
              res.status(404).json({ error: `RxCUI not found for the given drug name: ${drugName}` });
              return;
            }
          }
      
          // Call the drug interaction API
          const interactionResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxcuis.join('+')}`);
      
         
          let descriptions =[];
      
          // Check if any interaction data was returned
          if (interactionResponse.data.fullInteractionTypeGroup && interactionResponse.data.fullInteractionTypeGroup.length > 0) {
            // Extract the interaction data
            const interactions = interactionResponse.data.fullInteractionTypeGroup[0].fullInteractionType.map(interaction => interaction.interactionPair);
            
            // Extract descriptions
            descriptions = interactions.flat().map(pair => pair.description);
            
            console.log(`Interactions for ${drugNames.join(', ')}:`, interactions);
            console.log(`Descriptions:`, descriptions);
          } else {
            descriptions.push('No Interactions Found');
            console.log(descriptions);
          }
          
          // Always send the descriptions and drug names to the frontend
          res.status(200).json({ drugNames, descriptions });
          
          
        } catch (error) {
          console.error(`Error while fetching data: ${error.message}`);
          res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getAllNavs(req, res) {
        try {
            const result = await this.navModel.getAll();

            if (result && result.length > 0) {
                res.status(200).json({ success: true, data: result });
            } else {
                res.status(404).json({ success: false, error: 'No navigation items found.' });
            }
        } catch (error) {
            console.error('Error getting navigation items:', error.message);
            res.status(500).json({ success: false, error: 'An error occurred while fetching navigation items.' });
        }
    }
}

module.exports = utilitiesController;
