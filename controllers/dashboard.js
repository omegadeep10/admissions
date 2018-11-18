const { Application, Request, Student } = require('../sequelize');

let get_dashboard = async (req, res) => {
    let requests = await Request.findAll({ include: [Student], order: [['closed', 'DESC'], ['createdAt', 'DESC']] });
    let applications = await Application.findAll({ include: [Student], where: [{ 'status': 'pending' }] });
    console.log(JSON.stringify(applications));

    res.render('dashboard', { requests: requests, applications: applications });
}

module.exports = { get_dashboard }