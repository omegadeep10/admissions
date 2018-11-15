const { Student } = require('../sequelize');

module.exports = (req, res) => {
    // render the index page
    res.render('index');
}