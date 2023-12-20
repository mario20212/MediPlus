const Router = require('express');
const router = Router();
const cart = require('../models/cart');
const product = require('../models/product');
const MedicineModel = require('../models/MedicineModel');
router.get('/', async(req, res) => {

    meds = await cart.getCartByUserId(req.session.userId);
    array = await MedicineModel.getMedicinesarray(meds);
    console.log(array);

    res.render('cart', {
        cart: array,
        quantity_array: meds,
        options: (req.session.carttts === undefined ? "" : req.session.usersss)
    });
})
router.get('/addtocart/:med_name', async(req, res) => {

    med_name = req.params.med_name;
    console.log("the user id " + req.session.userId);
    await cart.addToCart(med_name, req.session.userId);
    meds = await cart.getCartByUserId(req.session.userId);
    array = await MedicineModel.getMedicinesarray(meds);
    console.log(array);
    res.render('cart', {
        cart: array,
        quantity_array: meds,
        options: (req.session.carttts === undefined ? "" : req.session.usersss)
    });
})
router.get('/delete/:med_name', async(req, res) => {

    med_name = req.params.med_name;
    console.log("the user id " + req.session.userId);
    await cart.removeFromCart(med_name, req.session.userId);
    meds = await cart.getCartByUserId(req.session.userId);
    array = await MedicineModel.getMedicinesarray(meds);
    console.log(array);
    res.render('cart', {
        cart: array,
        quantity_array: meds,
        options: (req.session.carttts === undefined ? "" : req.session.usersss)
    });
})

module.exports = router;