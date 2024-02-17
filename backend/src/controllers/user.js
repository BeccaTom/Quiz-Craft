const sequelize = require("../models");
const Sequelize = require("sequelize");

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
// login
exports.login = async (req, res, next) => {
    let user = await sequelize.models.user.findOne({
        where: req.body
    });
    if (!user) {
        res.json({
            code: -1,
            msg: "Incorrect username or password",
        });
        return;
    }

    res.json({
        code: 200,
        msg: "Login successful!",
        data: user
    });
};
// register
exports.register = async (req, res, next) => {
    const {
        email
    } = req.body;
    const user = await sequelize.models.user.findOne({
        where: {
            email
        }
    });
    if (user) {
        res.json({
            code: -1,
            msg: "This account already exists! Try logging in?",
        });
        return;
    }
    let headpic = `/pic${randomNum(1, 10)}.png`;
    const data = await sequelize.models.user.create({
        headpic,
        ...req.body
    });
    res.json({
        code: 200,
        msg: "Registration successful!",
        data
    });
};
// Update PassWord
exports.updatePwd = async (req, res, next) => {
    const {
        id,
        oldPwd,
        newPwd
    } = req.body;
    const user = await sequelize.models.user.findOne({
        where: {
            pwd: oldPwd,
            id
        }
    });
    if (!user) {
        res.json({
            code: -1,
            msg: "The current password you entered is incorrect. Please try again.",
        });
        return;
    }
    const data = await user.update({
        pwd: newPwd
    });
    res.json({
        code: 200,
        msg: "Modified successfully!",
        data
    });
};
// renew
exports.update = async (req, res, next) => {
    const {
        email
    } = req.body;

    const user = await sequelize.models.user.findOne({
        where: {
            email
        }
    });
    if (user && user.id != req.params.id) {
        res.json({
            code: -1,
            msg: "This email is already in use by another account. Please use a different email.",
        });
        return;
    }
    await sequelize.models.user.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    const data = await sequelize.models.user.findOne({
        where: {
            id: req.params.id
        }
    });
    res.json({
        code: 200,
        msg: "Updated successfully!",
        data
    });
};
// delete
exports.destroy = async (req, res, next) => {
    await sequelize.models.user.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json({
        code: 200,
        msg: "User account has been successfully deleted.",
    });
};
// newly added
exports.create = async (req, res, next) => {
    const data = await sequelize.models.user.create(req.body);
    res.json({
        code: 200,
        msg: "New user account has been successfully created.",
        data
    });
};

exports.index = async (req, res, next) => {
    let {
        index,
        email,
        role,
        all,
        limit
    } = req.query;
    let where = {};
    if (email) {
        where.email = {
            [Sequelize.Op.like]: '%' + email + '%'
        };
    }
    if (role) {
        where.role = role;
    }
    let data = [];
    if (all) {
        data = await sequelize.models.user.findAll({
            where,
        });
    } else {
        data = await sequelize.models.user.findAndCountAll({
            limit: limit ? Number(limit) : 10,
            offset: (Number(index) - 1) * (limit ? Number(limit) : 10),
            where,
        });
    }
    res.json({
        code: 200,
        msg: "Query successful!",
        data
    });
};
