const { Student } = require('../sequelize');

module.exports = (req, res) => {
    Student.findAll()
        .then(students => res.json(students))
        .error(err => res.json({ message: err }));
}