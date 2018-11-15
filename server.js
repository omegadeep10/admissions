const express = require('express');
const bodyParser = require('body-parser'); 

//import routes
const index = require('./controllers/index');

// init app
const app = express();

//set some helpers
app.use(bodyParser.json());
app.set('view engine', 'ejs');


app.get('/', index);
app.listen(3000, () => console.log('Running on 3000'));