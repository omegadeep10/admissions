module.exports = (db, sequelize) => {
    return db.define('application', {
        applicationId: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        references: sequelize.STRING,
        sat_combined_score: sequelize.INTEGER,
        intended_major: sequelize.STRING,
        essay: sequelize.STRING,
        is_child_of_alumni: {
            type: sequelize.BOOLEAN,
            defaultValue: false
        },
        alumni_parent_graduation_year: sequelize.STRING,
        alumni_parent_phone: sequelize.STRING,
        alumni_parent_email: sequelize.STRING
    })
}