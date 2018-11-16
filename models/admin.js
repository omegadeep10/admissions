module.exports = (db, sequelize) => {
    return db.define('admin', {
        adminId: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: sequelize.STRING,
        email: sequelize.INTEGER,
        password: sequelize.STRING
    })
}