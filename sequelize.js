const Sequelize = require('sequelize');
const StudentModel = require('./models/student')

// initialize admissions database in a file called db.sqlite
const db = new Sequelize('admissions', null, null, {
    dialect: "sqlite",
    storage: './db.sqlite'
});

// authenticate against db
db.authenticate()
    .then(data => console.log('established db connection successfully'))
    .error(err => console.log('Unable to connect to DB: ', err));

// init Student model
const Student = StudentModel(db, Sequelize);

// synchronize
db.sync({ force: true })
    .then(data => {
        // populate our DB with some example data here:
        //populate models with example data
        Student.create({ name: 'John Doe' })
    })
    .error(err => console.log('DB sync failed: ', err));


module.exports = { Student }