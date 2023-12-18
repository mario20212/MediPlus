const MedicineModel = require('../models/MedicineModel');


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
        const medicine = await this.medModel.getMedicineById(medicineId);

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





}

module.exports = MedicineController;
