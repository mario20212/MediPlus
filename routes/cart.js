const Router = require('express');
const router = Router();
const cart = require('../models/cart');
const product = require('../models/product');
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
    res.render('cart', {
        cart: cart1
    });
})

module.exports = router;