const { query } = require('../database/MySQL-connection');
const tableName = 'mediplus.navigation_links';

class NavigationLinks {
    constructor(label = '', url = '') {
        this.label = label;
        this.url = url;
    }

    async save() {
        try {
            const [maxOrderResult] = await query('SELECT MAX(display_order) AS maxOrder FROM ??', [tableName]);
            const maxOrder = maxOrderResult.maxOrder || 0;
            this.display_order = maxOrder + 1;
            this.id = maxOrder + 1;

            const insertQuery = 'INSERT INTO ?? SET ?';
            const result = await query(insertQuery, [tableName, {
                label: this.label,
                url: this.url,
                display_order: this.display_order
            }]);

            console.log('Insert Result:', result);

            if (!result || result.affectedRows !== 1) {
                throw new Error('Failed to add navigation link to the database');
            }

            return result.insertId;
        } catch (error) {
            console.error('Error adding navigation link:', error.message);
            throw error;
        }
    }

    async getAll() {
        try {
            const selectQuery = 'SELECT * FROM ?? ORDER BY display_order';
            const result = await query(selectQuery, [tableName]);
            console.log('result in model:', result)
            return result;
        } catch (error) {
            console.error('Error retrieving all navigation links:', error.message);
            throw error;
        }
    }
}

module.exports = NavigationLinks;
