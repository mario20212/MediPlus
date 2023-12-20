const Router = require('express');
const router = Router();
const cart = require('../models/cart');
const product = require('../models/product');
const MedicineModel = require('../models/MedicineModel');
const orders = require("../models/order");
const bodyParser = require('body-parser');
router.get('/', async(req, res) => {



    res.render('orders', {
        cart: array,
        quantity_array: meds,
        options: (req.session.carttts === undefined ? "" : req.session.usersss)
    });
})
router.post('/placeorder', async(req, res) => {


    router.use(bodyParser.json());
    const details = req.body;
    console.log("order details are " + details.firstname + details.lastname + details.phone + details.address + details.city + details.paymentmethod + " user id " + req.session.userId);
    cartdata = await cart.getCartByUserId(req.session.userId);
    console.log(JSON.stringify(cartdata, null, 2));
    meds = await MedicineModel.getMedicinesarray(cartdata);
    orders.createOrder(req.session.userId, req.session.userEmail, meds, cartdata, details.paymentmethod, details.address, details.phone, details.firstname, details.lastname)

    res.render('orders', {
        cart: array,
        quantity_array: meds,
        options: (req.session.carttts === undefined ? "" : req.session.usersss)
    });
})


module.exports = router;