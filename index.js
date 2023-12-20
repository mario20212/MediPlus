const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const isLoggedIn = require('./middleware/isLoggedIn.js');
const mailer = require('./models/schedule.js');
const multer = require('multer');
app.use(express.static(__dirname + '/public'));
const dotenv = require('dotenv');
dotenv.config();
const utilitiesController = require('./controllers/utilities-controller.js');
const vision = require('@google-cloud/vision')
const CREDENTIALS = JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "basic-curve-402715",
    "private_key_id": "14641aacf76ea02ce4595a0b5fa543d76c4d1949",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDGZxBD1mQs+Z0s\nBrCSiNFKxORkbOrgTc7Aj1UgeokEl1CWrUZV8+s2U9xWXQjDATxWl1+DPIZMAtPz\nUd+PMUGukl1tR34hAdpjyyEWntG8WCxupJsCgbvlr3a3tpjS04umTMjkQnmjpDYV\nbtcYAc3MceMrv1VCU6ZSvAitb25uILoYrHOcMCe7elc/7lxjY95uh4+WDtp/h+P5\nQ2+RrC86Jyyh40UNK6HxSkERRbD1tllDTBDq94sfqik27OaQukRbH3dMQri2FdKd\nqe1/UCSVI1yeIsqxoYdYdSoyzbnLd2i8rFwqP+/dvUt5q5DdTBuauF2xz4CxvCkg\nsHqz9gmZAgMBAAECggEAYVgR/+bB0dtLBV3m5o6geZnvIWLbPuCOL6ZjswLMFWeU\nj8lGeEesQUSWF/2fneYOT8IHh+F7VvIQQhMKqDwXqOqBUmvAc7twBoSUoH+eElYE\nvuiecXVr1n7nta2uf8pxe0+zRWNkQSkBrDRs7od8DPJX7o/66gcW1QMTEt1YhklE\nU+xMaWAFMe12Go6op1jK+8r4RaOI71qhfllWzFjcY088ZwkyYQmceuAUnGyP3Zew\nJZeM6JyIIyQlg0638xzWfTjsJbPmssvA3xExeQJzwOIWio0q/RKn64j3TAyCoNX9\nVUdqqiW50OuApWfZw/3ioMiqO8w+4jUHFjZWYvVczQKBgQD21UF6GepanRB3QMiE\nNyQdO/bmJQDHVzVTEjSLAsvN5mGsJUd8PbAuPJ63jGO7TrmoZLH/1BfWA8ZVfvPv\nLNIdxTAOhV2tWyGhOlFfS6eH1XT1HJ0Rs0V+rILOSXm12I5tsq3eyDFWfcravwRP\n7kaGlYlno3lDYDfZtQ/YpThNGwKBgQDNxVwFOQYlH/wWJnSQwDFfqk4zBLOMeYpk\nkMP3b+rLvQpk/mYpLID1CRCWe/bnYE8aD9BaEAYFF5ao2cRY4SBCFYGH0lGotyro\nFKF0POkR6h/8nFCdlJg6+HL2Id8xHoqzL1fbe5QKgncc+bxdsxlOPN0Hpaf1T8Qa\nVvC2XWbzWwKBgEP4f7pe7pEbVVBxj4YRJSnDvH6ty+QY2L9ScROipnrBqT3dWi0V\nU7G30cEbsM8Ao9GCQR4AyruNeI1Mk2HWhtnZ1hz5js1RHham14eVbsHR/w4MXhhk\ntItod/DUfOadhsMghA6oNCXsJ/NKzKYyKEuhXCAk/RyXn2mdGYsAHFvnAoGAbMfH\nC+PHgdzU0Yjm2pcgAujvij0UBlFCfkOhta9uuuJnGlj6/Q1P5zoxkLxcHJlnd+mg\nRdxuskZ0GTN2f14URZtE7N6c2MpsXmB5sg95T0UsP8kLPSMPDy3E6KWjbj4tKOkA\nU0GTU7MA8Up88DP8TsYSOzayAhd3Hk2T13StNj0CgYBAHSkA5sp5f5nB/qoAHjh3\nbhCgPwfP87ZW0F3vVgOTuo1jihHt1EdfwnckrkuPqZSJyaWLsBnM5YcXAwCFuIpL\nuuXsjp56SYtcnCvdq2r/H2jbv6j0VEykPnmpw6a7I0nrfZ53bTALJhr5Z6JYDHbg\numPxv4m3+DX0ln0rMthLZg==\n-----END PRIVATE KEY-----\n",
    "client_email": "147979676057-compute@developer.gserviceaccount.com",
    "client_id": "115108939850175388171",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/147979676057-compute%40developer.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}
))



const utilityController = new utilitiesController();


app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 36000000 }
}));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },

    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });


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
app.use('/cart', require('./routes/cart.js'))
app.use('/profile', require('./routes/profile'))
app.use('/order', require('./routes/orders.js'))
app.use('/conflict', isLoggedIn, require('./routes/conflict.js'))
app.get('/scan', isLoggedIn , (req, res) => {
    res.render('ocr_page');
});

app.post('/scan', isLoggedIn , upload.single('image'), async (req, res) => {
    try {
        const CONFIG = {
            credentials: {
                private_key: CREDENTIALS.private_key,
                client_email: CREDENTIALS.client_email
            }
        };

        const client = new vision.ImageAnnotatorClient(CONFIG);

        const detectText = async (file_path) => {
            let [result] = await client.textDetection(file_path);
            res.send(result.fullTextAnnotation.text);
        };

        await detectText(req.file.path);
    } catch (error) {
        console.error('Error performing OCR:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
mailer.continuousReminderCheck();

app.listen(8080, () => {
    console.log("Server is running.....");
});