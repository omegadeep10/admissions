const { Admin } = require('../sequelize');

const logout = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
}

const get_login = (req, res) => {
    res.render('login');
}


const verify_login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    Admin.findOne({ 
        where: { email: email }
    })
    .then(admin => {
        if (!admin) return res.render('login', { message: 'Unknown user' });
        else if (!admin.password === password) return res.render('login', { message: 'Incorrect password' });
        else {
            req.session.user = admin.dataValues;
            res.redirect('/dashboard');
        }
    })
}


module.exports = { logout, get_login, verify_login }