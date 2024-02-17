const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    sequelize.define('user', {
        name: Sequelize.STRING,
        email: Sequelize.STRING,  
        pwd: Sequelize.STRING, 
        headpic: Sequelize.STRING, 
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