const { connection, query } = require('../database/MySQL-connection');
class cart {
    constructor(userId, medicineNames = [], medicineQuantity = []) {
        this.userId = userId;
        this.medicineNames = medicineNames;
        this.medicineQuantity = medicineQuantity;
        this.totalPrice = 0.0;
        this.isEmpty = true;
        console.log("construdcted new cart succefully");

    }

    async createCart() {
        const insertQuery = 'INSERT INTO cart (user_id, medicine_names, medicine_quantity, total_price, is_empty) VALUES (?, ?, ?, ?, ?)';
        try {
            await query(insertQuery, [this.userId, JSON.stringify(this.medicineNames), JSON.stringify(this.medicineQuantity), this.totalPrice, this.isEmpty]);
            console.log('Cart created in the database.');
        } catch (error) {
            console.error('Error creating cart in the database:', error);
        }
    }

    static async getCartByUserId(userId) {
        console.log(userId);
        const selectQuery = 'SELECT * FROM cart WHERE user_id = ?';
        try {
            const results = await query(selectQuery, [userId]);

            if (results.length > 0) {
                const cartData = results[0];
                let new_cart1;
                if (cartData.medicine_names == "" || cartData.medicine_quantity == "") {
                    console.log(" i am 1");
                    new_cart1 = new cart(userId, [], []);
                    console.log(new_cart1);
                    return new_cart1;

                } else {
                    console.log(" i am 2");
                    new_cart = new cart(userId, JSON.parse(cartData.medicine_names), JSON.parse(cartData.medicine_quantity))
                    new_cart.price = new_cart.calculateTotal();
                    if (new_cart.price == 0) {
                        new_cart.isEmpty = true
                    } else {
                        new_cart.isEmpty = false;
                    }
                    return new_cart;

                }





            } else {
                console.log('Cart not found in the database.');
            }
        } catch (error) {
            console.error('Error retrieving cart from the database:', error);
        }
    }

    async addToCart(productName, quantity = 1) {
        // Search for the product in the database and add to cart
        const selectQuery = 'SELECT * FROM medicine_details WHERE product_name = ?';
        try {
            const results = await query(selectQuery, [productName]);

            if (results.length > 0) {


                // Check if product is already in cart, if yes, increment quantity
                const index = this.medicineNames.findIndex(name => name === productName);
                if (index !== -1) {
                    this.medicineQuantity[index] += quantity;
                } else {
                    this.medicineNames.push(productName);
                    this.medicineQuantity.push(quantity);
                }
                this.calculateTotal();
            } else {
                console.log('Product not found in the database.');
            }
        } catch (error) {
            console.error('Error retrieving product from database:', error);
        }
    }

    async removeFromCart(productName) {
        const index = this.medicineNames.findIndex(name => name === productName);

        if (index !== -1) {
            if (this.medicineQuantity[index] > 1) {
                this.medicineQuantity[index]--;
            } else {
                this.medicineNames.splice(index, 1);
                this.medicineQuantity.splice(index, 1);
            }
            this.calculateTotal();
        } else {
            console.log('Product not found in the cart.');
        }
    }

    async emptyCart() {
        this.medicineNames = [];
        this.medicineQuantity = [];
        this.totalPrice = 0.0;
        this.isEmpty = true;
    }
    static async updateCart(cartObject) {
        const updateQuery = 'UPDATE cart SET user_id = ?, medicine_names = ?, medicine_quantity = ?, total_price = ?, is_empty = ? WHERE id = ?';
        try {
            await query(updateQuery, [cartObject.userId, JSON.stringify(cartObject.medicineNames), JSON.stringify(cartObject.medicineQuantity), cartObject.totalPrice, cartObject.isEmpty, cartObject.id]);
            console.log('Cart updated in the database.');
        } catch (error) {
            console.error('Error updating cart in the database:', error);
        }
    }

    async calculateTotal() {
        try {
            let totalPrice = 0.0;

            for (let i = 0; i < this.medicineNames.length; i++) {
                const productName = this.medicineNames[i];
                const quantity = this.medicineQuantity[i];

                const selectQuery = 'SELECT price FROM medicine_details WHERE product_name = ?';
                const results = await query(selectQuery, [productName]);

                if (results.length > 0) {
                    const productPrice = results[0].price;
                    totalPrice += productPrice * quantity;
                }
            }

            this.totalPrice = totalPrice;
            this.isEmpty = this.medicineNames.length === 0;
            return totalPrice;
        } catch (error) {
            console.error('Error calculating total price:', error);
            return 0.0;
        }
    }

    // Other methods for cart manipulation can be added here
}
module.exports = cart;