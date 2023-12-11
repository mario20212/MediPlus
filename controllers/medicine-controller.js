const axios = require('axios');
const MedicineModel = require('../models/MedicineModel');
const apiKey = 'c09d273a61msh9e15c25b8e896b7p12bbb0jsn940198a20192';


class MedicineController {
  constructor() {
    this.medModel = new MedicineModel();
  }

  async medDisplay(req, res) {
    const query = req.query.query;

    const options = {
      method: 'GET',
      url: 'https://drug-info-and-price-history.p.rapidapi.com/1/druginfo',
      params: { drug: query },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'drug-info-and-price-history.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data[0];

      if (data === 'No drug found under that name.') {
        return res.render('error-page', {
          message: 'No drug/medicine found for the provided search, try again later!',
        });
      }

      const genericName = data.generic_name;
      const brandName = data.brand_name;
      const activeIngredients = data.active_ingredients.map(ingredient => `${ingredient.name} (${ingredient.strength})`);
      const descriptionInPackaging = data.packaging[0].description;
      const manufacturerName = data.openfda.manufacturer_name[0];
      const dosageForm = data.dosage_form;
      const route = data.route[0];
      const pharmClass = data.pharm_class && data.pharm_class.slice(0, 2).join(', ');

      res.render('medicine-display', {
        name: query,
        genericName,
        brandName,
        activeIngredients,
        descriptionInPackaging,
        manufacturerName,
        dosageForm,
        route,
        pharmClass,
      });

      console.log(data);
    } catch (error) {
      console.error(error);
      res.status(500).render('404', {
        message: 'No drug/medicine found for the provided search, try again later!',
      });
    }
  }
  async getMedStats() {
    try {
      const rowCount = await this.medModel.getRowCount();
      const latestMedicine = await this.medModel.getLatestMedicine();
      const latestNineMeds = await this.medModel.getFirstNineMedicines();
      const allMedicines = await this.medModel.getAllMedicines();

      console.log(latestNineMeds);

      return { rowCount, latestMedicine, latestNineMeds, allMedicines };
    } catch (error) {
      console.error('Error getting statistics:', error.message);
      throw new Error('An error occurred while fetching the statistics.');
    }
  }
}

module.exports = MedicineController;
