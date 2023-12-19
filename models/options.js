    const { query } = require('../database/MySQL-connection');
    const tableName1 = 'mediplus.options';
    const tableName2 = 'mediplus.medicine_options';

    class Options {
        constructor(option_name) {
            this.option_name = option_name;
        }

        async save() {
            try {
                const [maxIdResult] = await query('SELECT MAX(id) AS maxId FROM ??', [tableName1]);
                const maxId = maxIdResult.maxId || 0;
                this.id = maxId + 1;

                const insertQuery = 'INSERT INTO ?? SET ?';
                const result = await query(insertQuery, [tableName1, {
                    id: this.id,
                    option_name: this.option_name,
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

    module.exports = Options;
