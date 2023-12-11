const { connection, query } = require('../database/MySQL-connection');
class cart {
    // Assuming Product class is already implemented

    id = 0;
    userId = 0;
    products = [];
    totalPrice = 0.0;
    empty = true;

    constructor(id, userId, products = []) {
        this.id = id;
        this.userId = userId;
        this.products = products;
        this.totalPrice = 0.0;
        this.empty = true;
    }

    // Function to calculate total price
    calculateTotal() {
        let totalPrice = 0.0;

        this.products.forEach(product => {
            if (product instanceof Product) { // dont forget to implement product class with omar 
                totalPrice += product.price; // Assuming price is a property of the Product class
            }
        });

        this.totalPrice = totalPrice;
        this.empty = this.products.length === 0;
        return this.totalPrice;
    }
    checkout() {


        this.aftercheckout();
    }

    aftercheckout() {
        this.products = [];
        this.empty = true;
        this.totalPrice = 0;


    }


    async addToCart(productName) {
        // Search for the product in the database based on the name
        const selectQuery = 'SELECT * FROM medicine_details WHERE product_name = ?';
        try {
            const results = await query(selectQuery, [productName]);

            if (results.length > 0) {
                // Assuming Product class is already defined and 'results' contain necessary fields
                const productData = results[0]; // Considering first result as the found product
                const product = new Product(productData.id, productData.name, productData.price, /*...other properties */ );

                // Add the product to the cart's product array
                this.products.push(product);
                this.calculateTotal(); // Recalculate total price after adding the product
            } else {
                console.log('Product not found in the database.');
            }
        } catch (error) {
            console.error('Error retrieving product from database:', error);
        }
    }
    removeFromCart(productName) {
        const index = this.products.findIndex(product => product.name === productName);

        if (index !== -1) {
            if (this.products[index].quantity > 1) {
                this.products[index].quantity--;
            } else {
                this.products.splice(index, 1);
            }
        } else {
            console.log('Product not found in the cart.');
        }
    }






    // Other methods to manipulate the cart (e.g., addProduct, removeProduct, etc.) can be added here


}