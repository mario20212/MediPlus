const mysql = require('mysql2');

class Order {
    constructor(id, userid, useremail, products, productsquantity, total_price, payment_method, address, phone_number, first_name, last_name) {
        this.id = id;
        this.userid = userid;
        this.useremail = useremail;
        this.products = products;
        this.productsquantity = productsquantity;
        this.total_price = total_price;
        this.payment_method = payment_method;
        this.address = address;
        this.phone_number = phone_number;
        this.first_name = first_name;
        this.last_name = last_name;
    }

    // Create an order
    async createOrder(id, userid, useremail, products, productsquantity, total_price, payment_method, address, phone_number, first_name, last_name) {
        try {
            const query = ('INSERT INTO orders (userid,useremail, products, productsquantity, total_price, payment_method, address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id, userid, useremail, products, productsquantity, prices, total_price, payment_method, address, phone_number]);
            await connection.promise().execute(query, [
                this.userid,
                this.useremail,
                JSON.stringify(this.products),
                JSON.stringify(this.productsquantity),
                JSON.stringify(this.total_price),
                this.payment_method,
                this.address,
                this.phone_number,
                this.first_name,
                this.last_name

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
                    orderData.userid,
                    orderData.useremail,
                    JSON.parse(orderData.products),
                    JSON.parse(orderData.productsquantity),
                    JSON.parse(orderData.total_price),
                    orderData.payment_method,
                    orderData.address,
                    orderData.phone_number,
                    orderData.first_name,
                    orderData.last_name
                );
            }
            return null;
        } catch (error) {
            console.error('Error retrieving order:', error);
            return null;
        }
    }
    static async getOrdersByuserId(userid) {
        try {
            const query = 'SELECT * FROM orders WHERE userid = ?';
            const [rows, fields] = await connection.promise().execute(query, [userid]);
            if (rows.length > 0) {
                const orderData = rows[0];
                return new Order(
                    orderData.id,
                    orderData.userid,
                    orderData.useremail,
                    JSON.parse(orderData.products),
                    JSON.parse(orderData.productsquantity),
                    JSON.parse(orderData.total_price),
                    orderData.payment_method,
                    orderData.address,
                    orderData.phone_number,
                    orderData.first_name,
                    orderData.last_name
                );
            }
            return null;
        } catch (error) {
            console.error('Error retrieving order:', error);
            return null;
        }
    }

    // Update an order
    static async updateOrder(id, userid, useremail, products, productsquantity, total_price, payment_method, address, phone_number, first_name, last_name) {
        try {
            const query = 'UPDATE orders SET user_id = ?, user_email = ?, products = ?, quantities = ?, total_price = ?, payment_method = ?, address = ?, phone_number = ?, first_name = ?, last_name = ? WHERE id = ?';
            await connection.promise().execute(query, [
                userid,
                useremail,
                JSON.stringify(products),
                JSON.stringify(productsquantity),
                total_price,
                payment_method,
                address,
                phone_number,
                first_name,
                last_name,
                id
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