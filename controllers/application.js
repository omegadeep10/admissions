const { Student, Application } = require('../sequelize');


const get_status = (req, res) => res.render('status');

const check_status = async (req, res) => {
    let email = req.body.email;

    let s = await Student.findOne({ where: { email: email }, include: [{ model: Application, as: 'applications'}] });
    if (!s || s.applications.length == 0) return res.render('status', { message: 'Unknown email, or no application filed.', type: 'error' });

    return res.render('status', { application: { name: s.name, status: s.applications[0].status } });
}

const approve_application = async (req, res) => {
    console.log(req.body);
    let app = await Application.findOne({ where: { applicationId: req.body.applicationId } });
    app.status = 'accepted';
    app.save();
}

const reject_application = async (req, res) => {
    let app = await Application.findOne({ where: {applicationId: req.body.applicationId} });
    app.status = 'rejected';
    app.save();
}

const get_application = (req, res) => res.render('application');

const create_application = async (req, res) => {
    let name = req.body.name,
        phone = req.body.phone,
        email = req.body.email,
        sat = req.body.sat,
        major = req.body.major,
        alumni_child = (req.body.alumni_child == "on") ? true : false,
        parent_year = req.body.parent_year,
        parent_phone = req.body.parent_phone,
        essay = req.essay,
        references = req.references;

    let s = await Student.findOne({ where: { email: email } });

    // if student exists, create a request
    if (s) {
        let application = await Application.findOne({ where: { studentId: s.studentId } });
        if (application) return res.render('application', { message: 'Only one application permitted.', type: 'error' });

        let req = await s.createApplication({ 
            references: references,
            sat_combined_score: sat,
            intended_major: major,
            essay: essay,
            is_child_of_alumni: alumni_child,
            alumni_parent_graduation_year: parent_year,
            alumni_parent_phone: parent_phone
        });

        return res.render('application', { message: 'Application created successfully! An admissions officer will make a decision as soon as possible.', type: 'success' });
    
    } else {
        let new_student = await Student.create({ name: name, phone: phone, email: email });
        let req = await new_student.createApplication({ 
            references: references,
            sat_combined_score: sat,
            intended_major: major,
            is_child_of_alumni: alumni_child,
            alumni_parent_graduation_year: parent_year,
            alumni_parent_phone: parent_phone
        });

        return res.render('application', { message: 'Application created successfully! An admissions officer will make a decision as soon as possible.', type: 'success' });
    }
    
}

module.exports = { get_application, create_application, get_status, check_status, approve_application, reject_application }