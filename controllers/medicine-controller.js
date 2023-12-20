const MedicineModel = require('../models/MedicineModel');
const Options = require('../models/options');
const MedOptions = require('../models/med-options');


class MedicineController {
  constructor() {
    this.medModel = new MedicineModel();
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

  async getMedicineById(medicineId) {
    try {
      let medicine = await this.medModel.getMedicineById(medicineId);

      if (!medicine) {
        console.error(`No medicine found with ID ${medicineId}`);
        medicine = await this.medModel.getMedicinesByName(medicineId);
        if(!medicine){
          return null
        }
      }

      medicine.CompositionArray = medicine.Composition.split(' + ');
      const usesRegex = /Treatment of (.*?)(?=(Treatment of|and|&|$))/g;
      const matches = medicine.Uses.match(usesRegex);

      medicine.UsesArray = matches ? matches.map(use => use.trim()) : [medicine.Uses];

      const relatedMedicines = await this.medModel.getMedicinesByUses(medicine.Uses, medicine.id);

      return { medicine, relatedMedicines };

    } catch (error) {
      console.error(`Error getting medicine with ID ${medicineId}:`, error.message);
      throw new Error(`An error occurred while fetching details for medicine with ID ${medicineId}.`);
    }
  }
  async getMedicineByName(medicineName) {
    try {
      const medicine = await this.medModel.getMedicinesByName(getMedicineByName);

      if (!medicine) {
        console.error(`No medicine found with ID ${medicineId}`);
        return null;
      }

      medicine.CompositionArray = medicine.Composition.split(' + ');
      const usesRegex = /Treatment of (.*?)(?=(Treatment of|and|&|$))/g;
      const matches = medicine.Uses.match(usesRegex);

      medicine.UsesArray = matches ? matches.map(use => use.trim()) : [medicine.Uses];

      const relatedMedicines = await this.medModel.getMedicinesByUses(medicine.Uses, medicine.id);

      return { medicine, relatedMedicines };

    } catch (error) {
      console.error(`Error getting medicine with ID ${medicineId}:`, error.message);
      throw new Error(`An error occurred while fetching details for medicine with ID ${medicineId}.`);
    }
  }

  async addMedicine(medicineData, userID) {
    try {
      const { MedicineName, medicine_type, Composition, Uses, Side_effects, Manufacturer, Price, Quantity } = medicineData;
      const newMedicine = new MedicineModel({
        MedicineName,
        medicine_type,
        Composition,
        Uses,
        Side_effects,
        Manufacturer,
        Price,
        Quantity
      });

      const success = await newMedicine.addMedicine(userID)

      if (success) {
        console.log('Medicine added successfully');
        return { success: true };
      } else {
        throw new Error('Failed to add medicine to the database');
      }
    } catch (error) {
      console.error('In Controller Error adding medicine:', error.message);
      throw new Error('In Controller An error occurred while adding the medicine');
    }
  }

  async createOption(req, res) {
    try {
      const { option_name } = req.body;

      const newOption = new Options(option_name);
      const newOptionId = await newOption.save();

      res.json({ success: true, message: 'Option created successfully', optionId: newOptionId });
    } catch (error) {
      console.error('Error creating option:', error.message);
      res.status(500).json({ success: false, error: 'An error occurred while creating the option' });
    }
  }
  async createValue(req, res) {
    try {
      const { med_id, option_id, option_value } = req.body;

      const newValue = new MedOptions(option_id, med_id, option_value);
      const newOptionId = await newValue.save();

      res.json({ success: true, message: 'Value created successfully', optionId: newOptionId });
    } catch (error) {
      console.error('Error creating value:', error.message);
      res.status(500).json({ success: false, error: 'An error occurred while creating the value' });
    }
  }

  async getMedOptionsByID(medID) {
    try {
      const { result } = await this.medModel.getMedicineOptionsById(medID);
      console.log('Controller', result)
      return result;
    } catch (error) {
      console.error('Error fetching medicine options:', error);
      return { success: false, error: 'An error occurred while fetching medicine options.' };
    }
  }
}

module.exports = MedicineController;
