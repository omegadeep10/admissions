const Sequelize = require('sequelize');
const StudentModel = require('./models/student');
const RequestModel = require('./models/request');
const ApplicationModel = require('./models/application');
const AdminModel = require('./models/admin');

// initialize admissions database in a file called db.sqlite
const db = new Sequelize('admissions', null, null, {
    dialect: "sqlite",
    storage: './db.sqlite'
});

// authenticate against db
db.authenticate()
    .then(data => console.log('established db connection successfully'))
    .error(err => console.log('Unable to connect to DB: ', err));

// init models
const Student = StudentModel(db, Sequelize);
const Request = RequestModel(db, Sequelize);
const Application = ApplicationModel(db, Sequelize);
const Admin = AdminModel(db, Sequelize);

// setup Student - Request relationship
Student.hasMany(Request, { foreignKey: 'studentId' });
Request.belongsTo(Student, { foreignKey: 'studentId' });
Application.belongsTo(Student, { foreignKey: 'studentId' });

// synchronize
db.sync({ force: true })
    .then(data => {
        // populate our DB with some example data here:
        //populate models with example data
        Student.create({ 
            name: 'John Doe', 
            phone: '111-222-3333',
            email: 'jdoe@mailinator.com',
            status: 'inquiring'
        })
            .then(student => {
                student.createRequest({
                    contact: 'phone',
                    message: "I'd like to talk about financial aid."
                })
            });
        
        Admin.create({
            name: 'Greg Smith',
            email: 'gsmith@mga.edu',
            password: 'test123'
        });
    })
    .error(err => console.log('DB sync failed: ', err));


module.exports = { Student, Request, Application, Admin }