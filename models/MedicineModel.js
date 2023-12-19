const { query } = require('../database/MySQL-connection');
const tableName = 'mediplus.medicine_details';

class MedicineModel {
  constructor(
    id = 0,
    MedicineName = '',
    medicine_type = '',
    Composition = '',
    Uses = '',
    Side_effects = '',
    Manufacturer = '',
    Price = 0.0,
    Quantity = 0
  ) {
    this.id = id
    this.MedicineName = MedicineName;
    this.medicine_type = medicine_type;
    this.Composition = Composition;
    this.Uses = Uses;
    this.Side_effects = Side_effects;
    this.Manufacturer = Manufacturer;
    this.Price = Price;
    this.Quantity = Quantity;
  }
  // async getRowCount() {
  //   try {
  //     const [row_count] = await query('SELECT COUNT(*) as rowCount FROM ??', [tableName]);

  //     console.log('Query Response:', row_count);

  //     if (!row_count || typeof row_count !== 'object') {
  //       throw new Error(`Unexpected response from the database for table ${tableName}`);
  //     }

  //     const rowCount = row_count.rowCount || 0;
  //     console.log(`Row count in ${tableName}: ${rowCount}`);

  //     return rowCount;
  //   } catch (error) {
  //     console.error('Error getting row count:', error.message);
  //     throw error;
  //   }
  // }
  // async getLatestMedicine() {
  //   try {
  //     const [latestMedicine] = await query('SELECT `Average Review %` FROM ?? LIMIT 1', [tableName]);

  //     console.log('Query Response:', latestMedicine);

  //     if (!latestMedicine || typeof latestMedicine !== 'object') {
  //       throw new Error(`Unexpected response from the database for table ${tableName}`);
  //     }

  //     const averageReviewPercentage = latestMedicine['Average Review %'];
  //     return averageReviewPercentage;
  //   } catch (error) {
  //     console.error('Error getting the latest medicine:', error.message);
  //     throw error;
  //   }
  // }

  // async getFirstNineMedicines() {
  //   try {
  //     const firstNineMeds = await query('SELECT * FROM ?? LIMIT 9', [tableName]);

  //     if (!Array.isArray(firstNineMeds)) {
  //       throw new Error(`Unexpected response from the database for table ${tableName}`);
  //     }

  //     return firstNineMeds;
  //   } catch (error) {
  //     console.error('Error getting the first nine medicines:', error.message);
  //     throw error;
  //   }
  // }
  // async getAllMedicines() {
  //   try {
  //     const getAllMeds = await query('SELECT * FROM ??', [tableName]);

  //     if (!Array.isArray(getAllMeds)) {
  //       throw new Error(`Unexpected response from the database for table ${tableName}`);
  //     }

  //     return getAllMeds;
  //   } catch (error) {
  //     console.error('Error getting all medicines:', error.message);
  //     throw error;
  //   }
  // }

  async getMedicineById(medicineId) {
    try {
      const [medsByID] = await query('SELECT * FROM ?? WHERE id = ?', [tableName, medicineId]);

      console.log('Query Response:', medsByID);

      if (!medsByID) {
        console.error(`No medicine found with ID ${medicineId}`);
        return null;
      }

      const medicine = medsByID;

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
      const [medsbyUses] = await query(queryString, escapedValues);

      console.log(`Medicines with uses ${uses} excluding ID ${excludedId}:`, medsbyUses);

      return medsbyUses;
    } catch (error) {
      console.error(`Error getting medicines by uses:`, error.message);
      throw error;
    }
  }
  async getMedicinesByName(productName) {
    try {
      const queryString = 'SELECT * FROM mediplus.medicine_details WHERE `Medicine Name` = ?';

      const medsByName = await query(queryString, productName);

      return medsByName[0];
    } catch (error) {
      console.error(`Error getting medicines by uses:`, error.message);
      throw error;
    }
  }
  async getMedicinesarray(productNames) {
    try {
      let results = [];
      for (let i = 0; i < productNames.length; i++) {
        const queryString = 'SELECT * FROM mediplus.medicine_details WHERE `Medicine Name` = ?';
        const medsArray = await query(queryString, productNames[i]);
        if (medsArray != "" && medsArray != undefined && medsArray != []) {
          results.push(medsArray[0]);

        }

      }
      return results;
    } catch (error) {
      console.error(`Error getting array `, error.message);
      throw error;
    }
  }

  async getMedicineOptionsById(medicineId) {
    try {
      const optionsQuery = `
        SELECT o.option_name, mo.value
        FROM options o
        INNER JOIN medicine_options mo ON o.id = mo.option_id
        WHERE mo.medicine_id = ?;
      `;

      const medsbyOptions = await query(optionsQuery, [medicineId]);
      console.log('Model', medsbyOptions)
      return { medsbyOptions };
    } catch (error) {
      console.error('Error retrieving medicine options:', error);
      throw error;
    }
  }


}

module.exports = MedicineModel;
