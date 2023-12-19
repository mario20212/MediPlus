const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage(); // You can change this to disk storage if needed
const upload = multer({ storage: storage });

app.use(express.static(__dirname + '/public'));
const dotenv = require('dotenv');
dotenv.config();

app.use(express.urlencoded({ extended: true })); // Update to use extended mode
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

app.use(function(req, res, next) {
    res.locals.username = req.session.username;
    res.locals.id = req.session.userId;
    res.locals.isAdmin = req.session.isAdmin;
    next();
});

app.locals.upload = upload;

app.use('/', require('./routes/home.js'))
app.use('/signinup', require('./routes/handleUser.js'))
app.use('/search', require('./routes/search.js'))
app.use('/product', require('./routes/product.js'))
app.use('/schedule', require('./routes/schedule.js'))
app.use('/blogs', require('./routes/blogs.js'))
app.use('/contact', require('./routes/contact.js'))
app.use('/add_doctor', require('./routes/add_doctor.js'))
app.use('/addmedicine', require('./routes/addmedicine.js'))
app.use('/cart', require('./routes/cart.js'))
app.use('/admin', require('./routes/admin-page.js'))
app.use('/system', require('./routes/system.js'))
app.use('/view_all',require('./routes/view_all.js'))

app.listen(8080, () => {
    console.log("Server is running.....");
});
