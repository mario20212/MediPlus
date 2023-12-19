const { query } = require('../database/MySQL-connection');
const tableName = 'mediplus.medicine_options';

class MedOptions {
    constructor(option_id, med_id, value) {
        this.option_id = option_id;
        this.med_id = med_id;
        this.value = value;
    }

    async save() {
        try {
            const [maxIdResult] = await query('SELECT MAX(id) AS maxId FROM ??', [tableName]);
            const maxId = maxIdResult.maxId || 0;
            this.id = maxId + 1;

            const insertQuery = 'INSERT INTO ?? SET ?';
            const result = await query(insertQuery, [tableName, {
                id: this.id,
                medicine_id: this.med_id,
                option_id: this.option_id,
                value: this.value
            }]);

            console.log('Insert Result:', result);

            if (!result || result.affectedRows !== 1) {
                throw new Error('Failed to add option to the database');
            }

            return this.id;
        } catch (error) {
            console.error('Error adding option:', error.message);
            throw error;
        }
    }


    
}

module.exports = MedOptions;
