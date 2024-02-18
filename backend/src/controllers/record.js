const sequelize = require("../models");
const Sequelize = require("sequelize");

exports.rank = async (req, res) => {
    const data = await sequelize.models.record.findAll({
        attributes: ['userId', [Sequelize.fn('SUM', Sequelize.col('rightNum')), 'totalRightNum']],
        include: [{
            model: sequelize.models.user,
        }],
        group: ['userId'],
        order: [
            [Sequelize.literal('totalRightNum'), 'DESC']
        ]
    })
    res.json({
        code: 200,
        msg: "Successfully added!",
        data
    });

};

exports.update = async (req, res) => {
    await sequelize.models.record.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    const data = await sequelize.models.record.findOne({
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
exports.destroy = async (req, res) => {
    await sequelize.models.record.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json({
        code: 200,
        msg: "Successfully deleted!",
    });
};

exports.create = async (req, res) => {
    const data = await sequelize.models.record.create(req.body);
    res.json({
        code: 200,
        msg: "Successfully added!",
        data
    });
};

exports.index = async (req, res) => {
    let {
        index,
        userId,
        limit,
        all,
    } = req.query;
    let where = {};
    if (userId) {
        where.userId = userId;
    }
    if (all) {
        const results = await sequelize.models.record.findAll({
            where,
            include: [sequelize.models.user]
        });
        res.json({
            code: 200,
            msg: "Query successful!",
            data: results
        });
        return
    }
    try {
        const data = await sequelize.models.record.findAndCountAll({
            limit: limit ? Number(limit) : 10,
            offset: (Number(index) - 1) * (limit ? Number(limit) : 10),
            where,
        });
        res.json({
            code: 200,
            msg: "Query successful!",
            data
        });
    } catch (error) {
        console.log("error = ", error)
    }

};

exports.detail = async (req, res) => {
    const data = await sequelize.models.record.findOne({
        where: {
            id: req.params.id
        },
    });
    res.json({
        code: 200,
        msg: "Query successful!",
        data
    });
};
