const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Student, Request } = require('./sequelize');

//import routes
//const index = require('./controllers/index');
const auth = require('./controllers/auth');
const request = require('./controllers/request');
const application = require('./controllers/application');
const dashboard = require('./controllers/dashboard');

// init app
const app = express();

//set some helpers
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use(session({
    key: 'user_sid',
    secret: 'es6rules@tacos',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// prevents unauthorized users from accessing authentication required routes
const session_validator = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        next();
    } else {
        res.redirect('/login');
    }
}


// index page
app.get('/', (req, res) => res.render('index'));

// authentication functionality
app.get('/login', auth.get_login);
app.post('/login', auth.verify_login);
app.get('/logout', auth.logout);

// request functionality
app.get('/request', request.get_request);
app.post('/request', request.create_request);
app.post('/request/complete', request.update_request);

app.get('/application', application.get_application);
app.post('/application', application.create_application);
app.post('/application/approve', application.approve_application);
app.post('/application/reject', application.reject_application);

app.get('/status', application.get_status);
app.post('/status', application.check_status);

// dashboard
app.get('/dashboard', session_validator, dashboard.get_dashboard);
app.use((req, res) => res.status(404).render('404'));

app.listen(3000, () => console.log('Running on 3000'));