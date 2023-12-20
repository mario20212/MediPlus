const Router = require('express');
const router = Router();
const cart = require('../models/cart');
const product = require('../models/product');
const MedicineModel = require('../models/MedicineModel');
const orders = require("../models/order");
const bodyParser = require('body-parser');
router.get('/', async(req, res) => {


    let order = await orders.getOrdersByuserId(req.session.userId);
    console.log("orders " + JSON.stringify(order, null, 2));
    res.render('order.ejs', {
        Order: order

    });
})
router.post('/placeorder', async(req, res) => {


    router.use(bodyParser.json());
    const details = req.body;

    cartdata = await cart.getCartByUserId(req.session.userId);
    console.log(JSON.stringify(cartdata, null, 2));
    meds = await MedicineModel.getMedicinesarray(cartdata);
    orders.createOrder(req.session.userId, req.session.userEmail, meds, cartdata, details.paymentmethod, details.address, details.phone, details.firstname, details.lastname)
    let order = await orders.getOrdersByuserId(req.session.userId);
    console.log("orders " + JSON.stringify(order, null, 2));
    res.render('order.ejs', {
        Order: order
    });
})


module.exports = router;