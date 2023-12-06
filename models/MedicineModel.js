const { query } = require('../database/MySQL-connection');

class MedicineModel {
  async getRowCount() {
    try {
      const tableName = 'medicine_details';
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
}

module.exports = MedicineModel;



