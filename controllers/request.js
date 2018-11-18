const { Student, Request } = require('../sequelize');

const get_request = (req, res) => res.render('request');

const update_request = async (req, res) => {
    let requestId = req.body.requestId;
    let r = await Request.findOne({ where: { requestId: requestId } });
    r.closed = true;
    r.save();
}

const create_request = async (req, res) => {
    let contact = req.body.contact,
        message = req.body.message,
        name = req.body.name,
        phone = req.body.phone,
        email = req.body.email;

    let s = await Student.findOne({ where: { email: email } });

    // if student exists, create a request
    if (s) {
        s.name = name;
        await s.save();
        let req = await s.createRequest({ contact: contact, message: message });

        res.render('request', { message: 'Request created successfully! An admissions officer will contact you through ' + contact + ' as soon as possible.'});
    } else {
        let new_student = await Student.create({ name: name, phone: phone, email: email });
        let req = await new_student.createRequest({ contact: contact, message: message });

        res.render('request', { message: 'Request created successfully! An admissions officer will contact you through ' + contact + ' as soon as possible.'});
    }
    
}

module.exports = { get_request, create_request, update_request }