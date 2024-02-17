const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    sequelize.define('record', {
        userId: Sequelize.STRING,
        rightNum: Sequelize.INTEGER,
        wrongNum: Sequelize.INTEGER,
        time: Sequelize.STRING,
        type: Sequelize.STRING,
        subject: Sequelize.STRING,
        difficulty: Sequelize.STRING,
        created_at: {
            type: Sequelize.DATE,
            get() {
                const dateText = this.getDataValue('created_at');
                return moment(dateText).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updated_at: {
            type: Sequelize.DATE,
            get() {
                const dateText = this.getDataValue('updated_at');
                return moment(dateText).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    })
}
