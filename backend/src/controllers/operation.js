const sequelize = require("../models");
const Sequelize = require("sequelize");

exports.update = async (req, res) => {
    await sequelize.models.operation.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    const data = await sequelize.models.operation.findOne({
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
    await sequelize.models.operation.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json({
        code: 200,
        msg: "Successfully deleted!",
    });
};

exports.del = async (req, res) => {
    await sequelize.models.operation.destroy({
        where: {
            ...req.body
        }
    });
    res.json({
        code: 200,
        msg: "Successfully deleted!",
    });
};

exports.create = async (req, res) => {
    const {
        userId,
        questionId,
    } = req.body;
    console.log("userId555 = ", userId)
    let disLikeItem = await sequelize.models.operation.findOne({
        where: {
            userId,
            questionId,
        }
    })
    if (disLikeItem) {
        await disLikeItem.destroy();
    }
    const data = await sequelize.models.operation.create(req.body);
    res.json({
        code: 200,
        msg: "Successfully added!",
        data
    });
};

exports.statistics = async (req, res) => {
    let {
        userId,
        questionId,
    } = req.query;
    let likeNum = await sequelize.models.operation.count({
        where: {
            questionId,
            type: 'Like'
        }
    })
    let disLikeNum = await sequelize.models.operation.count({
        where: {
            questionId,
            type: 'DisLike'
        }
    })
    let like = await sequelize.models.operation.findOne({
        where: {
            questionId,
            userId,
            type: 'Like'
        }
    })
    let disLike = await sequelize.models.operation.findOne({
        where: {
            questionId,
            userId,
            type: 'DisLike'
        }
    })
    res.json({
        code: 200,
        msg: "Query successful!",
        data: {
            likeNum,
            disLikeNum,
            like,
            disLike
        }
    });
}

exports.index = async (req, res) => {
    let {
        index,
        type,
        userId,
        questionId,
        limit,
        all,
    } = req.query;
    let where = {};
    if (type) {
        where.type = type;
    }
    if (userId) {
        where.userId = userId;
    }
    if (questionId) {
        where.questionId = questionId;
    }
    if (all) {
        const results = await sequelize.models.operation.findAll({
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
        const data = await sequelize.models.operation.findAndCountAll({
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
    const data = await sequelize.models.operation.findOne({
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
