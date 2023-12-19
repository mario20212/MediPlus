const { connection, query } = require('../database/MySQL-connection');

class cart {
    constructor(userId, medicineNames, medicineQuantity) {
        this.user_id = userId;
        this.medicine_names = medicineNames;
        this.medicine_quantity = medicineQuantity;

        console.log("Constructed new cart successfully");
    }

    static async createCart(userid, medicineNames, medicineQuantity) {
        const insertQuery = 'INSERT INTO cart (user_id, medicine_name, medicine_quantity) VALUES (?, ?, ?)';
        try {

            await query(insertQuery, [userid, medicineNames, medicine_quantity]);
            console.log('Cart created in the database.');
        } catch (error) {
            console.error('Error creating cart in the database:', error);
        }
    }

    static async getCartByUserId(userId) {

        const selectQuery = 'SELECT * FROM cart WHERE user_id = ?';
        try {
            const results = await query(selectQuery, [userId]);

            if (results.length > 0) {
                return results;

            } else {
                console.log('Cart not found in the database.');
                return [];
            }
        } catch (error) {
            console.error('Error retrieving cart from the database:', error);
        }
    }

    static async addToCart(productName, userid) {
        // Search for the product in the database and add to cart
        console.log(userid);
        const selectQuery = 'SELECT * FROM mediplus.medicine_details WHERE `Medicine Name` = ?';
        try {

            let quantity = 1;
            const results = await query(selectQuery, productName);

            if (results.length > 0 && results[0].Quantity > 0) {
                const insertQuery = 'INSERT INTO cart (user_id, medicine_name, medicine_quantity) VALUES (?, ?, ?)';
                try {

                    await query(insertQuery, [userid, productName, quantity]);
                    console.log('added to cart succefully');
                } catch (error) {
                    console.error('Error creating cart in the database:', error);
                }

            } else {
                console.log('Product out of stock');
            }
        } catch (error) {
            console.error('Error retrieving product from database:', error);
            try {
                await query

            } catch {

            }
        }
    }

    static async removeFromCart(productName, userid) {
        const remquery = `
    DELETE FROM cart 
    WHERE user_id = ? AND medicine_name = ?
    `;
        await query(remquery, [userid, productName]);




    }

    static async emptyCart(productName, userid) {

    }



    // Other methods for cart manipulation can be added here
}

module.exports = cart;