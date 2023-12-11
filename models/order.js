const mysql = require('mysql2');

class Order {
    constructor(id, useremail, products, productsquantity, prices, total_price, payment_method, address, phone_number) {
        this.id = id;
        this.useremail = useremail;
        this.products = products;
        this.productsquantity = productsquantity;
        this.prices = prices;
        this.total_price = total_price;
        this.payment_method = payment_method;
        this.address = address;
        this.phone_number = phone_number;
    }

    // Create an order
    async createOrder(id, useremail, products, productsquantity, prices, total_price, payment_method, address, phone_number) {
        try {
            const query = ('INSERT INTO orders (useremail, products, productsquantity, prices, total_price, payment_method, address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id, useremail, products, productsquantity, prices, total_price, payment_method, address, phone_number]);
            await connection.promise().execute(query, [
                this.useremail,
                JSON.stringify(this.products),
                JSON.stringify(this.productsquantity),
                JSON.stringify(this.prices),
                this.total_price,
                this.payment_method,
                this.address,
                this.phone_number
            ]);
            console.log('Order created successfully.');
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }

    // Read an order by ID
    static async getOrderById(orderId) {
        try {
            const query = 'SELECT * FROM orders WHERE id = ?';
            const [rows, fields] = await connection.promise().execute(query, [orderId]);
            if (rows.length > 0) {
                const orderData = rows[0];
                return new Order(
                    orderData.id,
                    orderData.useremail,
                    JSON.parse(orderData.products),
                    JSON.parse(orderData.productsquantity),
                    JSON.parse(orderData.prices),
                    orderData.total_price,
                    orderData.payment_method,
                    orderData.address,
                    orderData.phone_number
                );
            }
            return null;
        } catch (error) {
            console.error('Error retrieving order:', error);
            return null;
        }
    }

    // Update an order
    async updateOrder() {
        try {
            const query = 'UPDATE orders SET useremail = ?, products = ?, productsquantity = ?, prices = ?, total_price = ?, payment_method = ?, address = ?, phone_number = ? WHERE id = ?';
            await connection.promise().execute(query, [
                this.useremail,
                JSON.stringify(this.products),
                JSON.stringify(this.productsquantity),
                JSON.stringify(this.prices),
                this.total_price,
                this.payment_method,
                this.address,
                this.phone_number,
                this.id
            ]);
            console.log('Order updated successfully.');
        } catch (error) {
            console.error('Error updating order:', error);
        }
    }

    // Delete an order by ID
    static async deleteOrder(orderId) {
        try {
            const query = 'DELETE FROM orders WHERE id = ?';
            await connection.promise().execute(query, [orderId]);
            console.log('Order deleted successfully.');
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    }
}

module.exports = Order;