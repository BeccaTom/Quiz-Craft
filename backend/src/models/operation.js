const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    sequelize.define('operation', {
        userId: Sequelize.STRING, // 操作人
        questionId: Sequelize.STRING, //操作题目
        type: Sequelize.STRING, //操作类型 Like Dislike
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