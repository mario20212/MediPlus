const mysql = require('mysql2');
const { connection, query } = require('../database/MySQL-connection');
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
    static async createOrder(userid, useremail, products, productsquantity, payment_method, address, phone_number, firstname, lastname) {
        try {
            let total_price = 0;
            let productsnames = [];
            let productsquant = [];
            console.log("array of meds is " + JSON.stringify(products, null, 2));
            console.log("array ofquant is " + JSON.stringify(productsquantity, null, 2));

            if (products.length > 0) {
                products.forEach((product, index) => {
                    total_price += product.Price * productsquantity[index].medicine_quantity;
                    productsnames.push(product['Medicine Name']);
                    productsquant.push(productsquantity[index].medicine_quantity);

                });
                productsnames = JSON.stringify(productsnames);
                productsquant = JSON.stringify(productsquant);
                total_price = JSON.stringify(total_price);
                const query1 = 'INSERT INTO orders (firstname,lastname,email,user_id,products, products_quantity, total_price, payment_method, address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)';
                await query(query1, [firstname, lastname, useremail, userid, productsnames, productsquant, total_price, payment_method, address, phone_number])
            } else {
                console.log("something wronh in arrays sent to this function");
            }

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
            const query1 = 'SELECT * FROM orders WHERE user_id = ?';
            let result = await query(query1, [userid]);
            if (result.length > 0) {
                result.forEach((order, index) => {

                    //order.total_price = JSON.parse(order.products);
                    //order.total_price = JSON.parse(order.products_quantity);

                });

            }
            return result;
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