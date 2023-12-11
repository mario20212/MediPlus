const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');

app.use(express.static('public'));
const dotenv = require('dotenv');
dotenv.config();

app.use(express.urlencoded());
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
    res.locals.isAdmin = true;
    next();
});

// Routes setup
app.use('/', require('./routes/home.js'))
app.use('/signinup', require('./routes/handleUser.js'))
app.use('/search', require('./routes/search.js'))
app.use('/medicine', require('./routes/medicine-display.js'))
app.use('/schedule', require('./routes/schedule.js'))
app.use('/blogs', require('./routes/blogs.js'))
app.use('/contact', require('./routes/contact.js'))
app.use('/add_doctor', require('./routes/add_doctor.js'))
app.use('/addmedicine', require('./routes/addmedicine.js'))
app.use('/cart', require('./routes/cart.js'))
app.use('/admin', require('./routes/admin-page.js'))
app.use('/system', require('./routes/system.js'))

app.listen(8080, () => {
    console.log("Server is running.....");
});