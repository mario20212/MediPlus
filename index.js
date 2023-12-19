const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const isLoggedIn = require('./middleware/isLoggedIn.js');

app.use(express.static(__dirname + '/public'));
const dotenv = require('dotenv');
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

app.use(function (req, res, next) {
    res.locals.username = req.session.username;
    res.locals.id = req.session.userId;
    res.locals.isAdmin = req.session.isAdmin;
    res.locals.cart = req.session.cart;
    next();
});

app.use('/', require('./routes/home.js'))
app.use('/signinup', require('./routes/handleUser.js'))
app.use('/blogs', require('./routes/blogs.js'))
app.use('/contact', require('./routes/contact.js'))
app.use('/search', isLoggedIn, require('./routes/search.js'))
app.use('/product', isLoggedIn, require('./routes/product.js'))
app.use('/schedule', isLoggedIn, require('./routes/schedule.js'))
app.use('/add_doctor', isLoggedIn, require('./routes/add_doctor.js'))
app.use('/addmedicine', isLoggedIn, require('./routes/addmedicine.js'))
app.use('/cart', isLoggedIn, require('./routes/cart.js'))
app.use('/admin', isLoggedIn, require('./routes/admin-page.js'))
app.use('/system', isLoggedIn, require('./routes/system.js'))
app.use('/view_all', isLoggedIn, require('./routes/view_all.js'))
app.listen(8080, () => {
    console.log("Server is running.....");
});
