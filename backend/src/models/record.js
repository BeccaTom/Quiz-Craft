const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    sequelize.define('record', {
        userId: Sequelize.STRING, //答题人
        rightNum: Sequelize.INTEGER, //答对数目
        wrongNum: Sequelize.INTEGER, //答错数目
        time: Sequelize.STRING,//花费时间单位秒
        type: Sequelize.STRING, //试卷的题目类型以~符号进行分割
        subject: Sequelize.STRING, //试卷的科目
        difficulty: Sequelize.STRING, //试卷的难度 
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