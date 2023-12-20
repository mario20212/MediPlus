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
    async getMedicinesByName(productName) {
        try {
            const queryString = 'SELECT * FROM mediplus.medicine_details WHERE `Medicine Name` = ?';

            const result = await query(queryString, productName);

            return result[0];
        } catch (error) {
            console.error(`Error getting medicines by uses:`, error.message);
            throw error;
        }
    }
    static async getMedicinesarray(productNames) {
        try {
            let results = [];
            for (let i = 0; i < productNames.length; i++) {
                const queryString = 'SELECT * FROM mediplus.medicine_details WHERE `Medicine Name` = ?';
                let result = await query(queryString, productNames[i].medicine_name);
                if (result != "" && result != undefined && result != []) {
                    results.push(result[0]);

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

            const result = await query(optionsQuery, [medicineId]);
            console.log('Model', result)
            return { result };
        } catch (error) {
            console.error('Error retrieving medicine options:', error);
            throw error;
        }
    }

    async addMedicine(userID) {
        try {
            console.log(this)
            const [maxIdResult] = await query('SELECT MAX(id) AS maxId FROM ??', [tableName]);
            const maxId = maxIdResult.maxId || 0;

            const newId = maxId + 1;

            const insertQuery = 'INSERT INTO ?? SET ?';
            const result = await query(insertQuery, [tableName, {
                id: newId,
                'Medicine Name': this.id.MedicineName,
                medicine_type: this.id.medicine_type,
                Composition: this.id.Composition,
                Uses: this.id.Uses,
                Side_effects: this.id.Side_effects,
                Manufacturer: this.id.Manufacturer,
                Price: this.id.Price,
                Quantity: this.id.Quantity,
                'Excellent Review %': 0,
                'Average Review %': 0,
                'Poor Review %': 0,
                AddedByUserID: 12,
                UpdatedByUserID: 12
            }]);

            console.log('Insert Result:', result);

            if (!result || result.affectedRows !== 1) {
                throw new Error('Failed to add medicine to the database');
            }

            return newId;
        } catch (error) {
            console.error('In Model Error adding medicine:', error.message);
            throw error;
        }
    }





}

module.exports = MedicineModel;