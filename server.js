const express = require('express');
const bodyParser = require('body-parser'); 
const { Student, Request } = require('./sequelize');

//import routes
//const index = require('./controllers/index');

// init app
const app = express();

//set some helpers
app.use(express.static('static'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');


app.get('/',    (req, res) => res.render('index'));
app.get('/404', (req, res) => res.render('404'));

app.listen(3000, () => console.log('Running on 3000'));