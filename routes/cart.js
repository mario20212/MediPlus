const Router = require('express');
const router = Router();
const cart = require('../models/cart');
const product = require('../models/product');
const MedicineModel = require('../models/MedicineModel');
router.get('/', async(req, res) => {

    array = await cart.getCartByUserId(req.session.userId);
    res.render('cart', {
        cart: array,
        options: (req.session.carttts === undefined ? "" : req.session.usersss)
    });
})
router.get('/addtocart/:med_name', async(req, res) => {

    med_name = req.params.med_name;
    result = await cart.addToCart(med_name, req.session.cart, req.session.userId);
    meds = await cart.getCartByUserId(req.session.userId);

    array = await MedicineModel.getMedicinesarray(meds);
    console.log(array);
    res.render('cart', {
        cart: array,
        quantity_array: req.session.cart.medicine_quantity,
        options: (req.session.carttts === undefined ? "" : req.session.usersss)
    });
})

module.exports = router;