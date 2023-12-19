const Router = require('express');
const router = Router();
const cart = require('../models/cart');
const product = require('../models/product');
const MedicineModel = require('../models/MedicineModel');
const product1 = new product(
    'Product Name',
    'Composition details',
    'Uses information',
    'Side effects description',
    "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/hg4gkjmjrg9956tqtmoz.jpg",
    'Manufacturer',
    5, 3, 2
);
const product2 = new product('Product Name',
    'Composition details',
    'Uses information',
    'Side effects description',
    "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/hg4gkjmjrg9956tqtmoz.jpg",
    'Manufacturer',
    5, 3, 2);
const product3 = new product('Product Name',
    'Composition details',
    'Uses information',
    'Side effects description',
    "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/hg4gkjmjrg9956tqtmoz.jpg",
    'Manufacturer',
    5, 3, 2);
const products = [product1, product2, product3];
const cart1 = new cart(1, 1, products);
router.get('/', (req, res) => {
    console.log("i am in router and cart session is " + req.session.cart);
    res.render('cart', {
        cart: req.session.cart,
        options: (req.session.carttts === undefined ? "" : req.session.usersss)
    });
})
router.get('/addtocart/:med_name', async(req, res) => {

    med_name = req.params.med_name;
    req.session.cart = await cart.addToCart(med_name, req.session.cart);

    array = await MedicineModel.getMedicinesarray(req.session.cart.medicine_names);
    console.log(array);
    res.render('cart', {
        cart: array,
        options: (req.session.carttts === undefined ? "" : req.session.usersss)
    });
})

module.exports = router;