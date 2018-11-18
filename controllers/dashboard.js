const { Student, Request } = require('../sequelize');

let get_dashboard = async (req, res) => {
    let requests = await Request.findAll({ include: [Student] });
    console.log(JSON.stringify(requests));

    res.render('dashboard', { requests: requests });
}

module.exports = { get_dashboard }