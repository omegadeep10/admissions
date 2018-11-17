module.exports = (db, sequelize) => {
    return db.define('student', {
        studentId: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: sequelize.STRING,
        phone: sequelize.STRING,
        email: {
            type: sequelize.STRING,
            unique: true
        },
        status: {
            type: sequelize.ENUM('inquiring', 'applicant', 'accepted', 'rejected', 'cancelled'),
            defaultValue: 'inquiring'
        }
    })
}