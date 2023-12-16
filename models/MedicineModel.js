const { query } = require('../database/MySQL-connection');
const tableName = 'medicine_details';

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
  async schedule()
  {
    
  }
  
}

module.exports = MedicineModel;



