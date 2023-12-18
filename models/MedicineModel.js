const { query } = require('../database/MySQL-connection');
const tableName = 'mediplus.medicine_details';

class MedicineModel {
  async getRowCount() {
    try {
      const [result] = await query('SELECT COUNT(*) as rowCount FROM ??', [tableName]);

      console.log('Query Response:', result);

      if (!result || typeof result !== 'object') {
        throw new Error(`Unexpected response from the database for table ${tableName}`);
      }

      const rowCount = result.rowCount || 0;
      console.log(`Row count in ${tableName}: ${rowCount}`);

      return rowCount;
    } catch (error) {
      console.error('Error getting row count:', error.message);
      throw error;
    }
  }
  async getLatestMedicine() {
    try {
      const [result] = await query('SELECT `Average Review %` FROM ?? LIMIT 1', [tableName]);

      console.log('Query Response:', result);

      if (!result || typeof result !== 'object') {
        throw new Error(`Unexpected response from the database for table ${tableName}`);
      }

      const averageReviewPercentage = result['Average Review %'];
      return averageReviewPercentage;
    } catch (error) {
      console.error('Error getting the latest medicine:', error.message);
      throw error;
    }
  }

  async getFirstNineMedicines() {
    try {
      const result = await query('SELECT * FROM ?? LIMIT 9', [tableName]);

      if (!Array.isArray(result)) {
        throw new Error(`Unexpected response from the database for table ${tableName}`);
      }

      return result;
    } catch (error) {
      console.error('Error getting the first nine medicines:', error.message);
      throw error;
    }
  }
  async getAllMedicines() {
    try {
      const result = await query('SELECT * FROM ??', [tableName]);

      if (!Array.isArray(result)) {
        throw new Error(`Unexpected response from the database for table ${tableName}`);
      }

      return result;
    } catch (error) {
      console.error('Error getting all medicines:', error.message);
      throw error;
    }
  }

  async getMedicineById(medicineId) {
    try {
      const [result] = await query('SELECT * FROM ?? WHERE id = ?', [tableName, medicineId]);

      console.log('Query Response:', result);

      if (!result) {
        console.error(`No medicine found with ID ${medicineId}`);
        return null;
      }

      const medicine = result;

      return medicine;
    } catch (error) {
      console.error(`Error getting medicine with ID ${medicineId}:`, error.message);
      throw error;
    }
  }

  async getMedicinesByUses(uses, excludedId) {
    try {
      const queryString = 'SELECT * FROM ?? WHERE Uses LIKE ? AND id != ? LIMIT 8';
      const escapedValues = [tableName, `%${uses}%`, excludedId];
      const [result] = await query(queryString, escapedValues);
    
      console.log(`Medicines with uses ${uses} excluding ID ${excludedId}:`, result);
    
      return result;
    } catch (error) {
      console.error(`Error getting medicines by uses:`, error.message);
      throw error;
    }
  }
  

  





}

module.exports = MedicineModel;



