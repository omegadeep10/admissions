const { Student } = require('../sequelize');

module.exports = (req, res) => {
    Student.findAll()
        .then(students => {
            res.render('index', { students: students })
        })
        .error(err => res.json({ message: err }));
}