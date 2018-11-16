module.exports = (db, sequelize) => {
    return db.define('request', {
        requestId: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: sequelize.ENUM('email', 'phone', 'tour'),
            defaultValue: 'email'
        },
        message: sequelize.STRING,
        closed: {
            type: sequelize.BOOLEAN,
            defaultValue: false
        }
    })
}