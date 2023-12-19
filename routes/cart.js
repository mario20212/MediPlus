const Router = require('express');
const router = Router();
const cart = require('../models/cart');
const product = require('../models/product');
const MedicineModel = require('../models/MedicineModel');
router.get('/', async(req, res) => {
    console.log("i am in router and cart session is " + req.session.cart);
    array = await MedicineModel.getMedicinesarray(req.session.cart.medicine_names);
    res.render('cart', {
        cart: req.session.cart,
        quantity_array: req.session.cart.medicine_quantity,
        options: (req.session.carttts === undefined ? "" : req.session.usersss)
    });
})
router.get('/addtocart/:med_name', async(req, res) => {

    med_name = req.params.med_name;
    req.session.cart = await cart.addToCart(med_name, req.session.cart, req.session.userId);

    array = await MedicineModel.getMedicinesarray(req.session.cart.medicine_names);
    console.log(array);
    res.render('cart', {
        cart: array,
        quantity_array: req.session.cart.medicine_quantity,
        options: (req.session.carttts === undefined ? "" : req.session.usersss)
    });
})

module.exports = router;