const { connection, query } = require('../database/MySQL-connection');

class cart {
    constructor(userId, medicineNames = [], medicineQuantity = []) {
        this.user_id = userId;
        this.medicine_names = medicineNames;
        this.medicine_quantity = medicineQuantity;
        this.total_price = 0.0;
        this.is_empty = true;
        console.log("Constructed new cart successfully");
    }

    async createCart(userid, cart) {
        const insertQuery = 'INSERT INTO cart (user_id, medicine_names, medicine_quantity, total_price, is_empty) VALUES (?, ?, ?, ?, ?)';
        try {

            await query(insertQuery, [userid, JSON.stringify(cart.medicine_names), JSON.stringify(cart.medicine_quantity), cart.total_price, cart.is_empty]);
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
                let newCart;
                if (cartData.medicine_names == "" || cartData.medicine_quantity == "") {
                    console.log("I am 1");
                    newCart = new cart(userId, [], []);
                    console.log(newCart);
                    return newCart;
                } else {
                    newCart = new cart(userId, [], []);
                    console.log("I am 2");
                    console.log(cartData.medicine_names + cartData.medicine_quantity);
                    cartData.medicine_quantity = JSON.parse(cartData.medicine_quantity);
                    console.log("loopcount" + cartData.medicine_quantity.length);
                    for (let i = 0; i < cartData.medicine_quantity.length; i++) {
                        newCart.medicine_quantity.push(cartData.medicine_quantity[i]);
                        newCart.medicine_names.push(cartData.medicine_names[i]);
                    }
                    newCart.id = cartData.id;
                    console.log(newCart.medicine_names + newCart.medicine_quantity);
                    return newCart;
                }
            } else {
                console.log('Cart not found in the database.');
            }
        } catch (error) {
            console.error('Error retrieving cart from the database:', error);
        }
    }

    static async addToCart(productName, cart, userid) {
        // Search for the product in the database and add to cart
        const selectQuery = 'SELECT * FROM mediplus.medicine_details WHERE `Medicine Name` = ?';
        try {

            let quantity = 1;
            const results = await query(selectQuery, productName);

            if (results.length > 0) {
                console.log(" i am in if");
                const index = cart.medicine_names.findIndex(name => name === productName);
                if (index !== -1) {
                    cart.medicine_quantity[index] += quantity;
                } else {
                    cart.medicine_names.push(productName);
                    cart.medicine_quantity.push(quantity);
                }
                console.log(cart.medicine_names);
                this.updateCart(cart);
                return cart;

            } else {
                console.log('Product not found in the database.');
            }
        } catch (error) {
            console.error('Error retrieving product from database:', error);
        }
    }

    async removeFromCart(productName) {
        const index = this.medicine_names.findIndex(name => name === productName);

        if (index !== -1) {
            if (this.medicine_quantity[index] > 1) {
                this.medicine_quantity[index]--;
            } else {
                this.medicine_names.splice(index, 1);
                this.medicine_quantity.splice(index, 1);
            }
            this.calculateTotal();
        } else {
            console.log('Product not found in the cart.');
        }
    }

    async emptyCart() {
        this.medicine_names = [];
        this.medicine_quantity = [];
        this.total_price = 0.0;
        this.is_empty = true;
    }

    static async updateCart(cartObject) {
        const updateQuery = 'UPDATE cart SET user_id = ?, medicine_names = ?, medicine_quantity = ?, total_price = ?, is_empty = ? WHERE id = ?';
        const idquery = 'Select * From cart WHERE user_id = ?'
        try {
            let result = await query(idquery, [cartObject.user_id]);
            console.log(result);
            console.log(result[0].id);
            console.log("cart xeft update" + [cartObject.user_id, JSON.stringify(cartObject.medicine_names), JSON.stringify(cartObject.medicine_quantity), cartObject.total_price, cartObject.is_empty, cartObject.id])
            await query(updateQuery, [cartObject.user_id, JSON.stringify(cartObject.medicine_names), JSON.stringify(cartObject.medicine_quantity), cartObject.total_price, cartObject.is_empty, result[0].id]);

            console.log('Cart updated in the database.');
        } catch (error) {
            console.error('Error updating cart in the database:', error);
        }
    }

    async calculateTotal() {
            try {
                let totalPrice = 0.0;

                for (let i = 0; i < this.medicine_names.length; i++) {
                    const productName = this.medicine_names[i];
                    const quantity = this.medicine_quantity[i];

                    const selectQuery = 'SELECT price FROM medicine_details WHERE product_name = ?';
                    const results = await query(selectQuery, [productName]);

                    if (results.length > 0) {
                        const productPrice = results[0].price;
                        totalPrice += productPrice * quantity;
                    }
                }

                this.total_price = totalPrice;
                this.is_empty = this.medicine_names.length === 0;
                return totalPrice;
            } catch (error) {
                console.error('Error calculating total price:', error);
                return 0.0;
            }
        }
        // Other methods for cart manipulation can be added here
}

module.exports = cart;