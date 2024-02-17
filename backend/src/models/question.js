const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    sequelize.define('question', {
        title: Sequelize.TEXT,
        type: Sequelize.STRING, //题目类型 True/False判断题 Single单选题 Multiple多选题
        answer: Sequelize.TEXT, //题目答案 以~符号进行分割
        options: Sequelize.TEXT, //题目选项 以~符号进行分割
        difficulty: Sequelize.STRING,//题目难度 Easy Medium Difficult
        subject: Sequelize.STRING,//科目 Program Math Physics
        desc: Sequelize.TEXT, //答案解析
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