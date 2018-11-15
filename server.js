const express = require('express');
const bodyParser = require('body-parser'); 

//import routes
const index = require('./controllers/index');

// init app
const app = express();
app.use(bodyParser.json());


app.get('/', index);
app.listen(3000, () => console.log('Running on 3000'));