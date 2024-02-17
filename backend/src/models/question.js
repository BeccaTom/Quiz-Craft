const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    sequelize.define('question', {
        title: Sequelize.TEXT,
        type: Sequelize.STRING,
        answer: Sequelize.TEXT,
        options: Sequelize.TEXT,
        difficulty: Sequelize.STRING,
        subject: Sequelize.STRING,
        desc: Sequelize.TEXT,
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
