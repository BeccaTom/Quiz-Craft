const sequelize = require("../models");
const Sequelize = require("sequelize");

exports.update = async (req, res) => {
    try {
        const [updateCount] = await sequelize.models.operation.update(req.body, {
            where: { id: req.params.id }
        });

        if (updateCount === 0) {
            return res.status(404).json({
                code: -1,
                msg: "Operation not found or no changes made.",
            });
        }

        const updatedData = await sequelize.models.operation.findOne({
            where: { id: req.params.id }
        });

        if (!updatedData) {
            return res.status(404).json({
                code: -2,
                msg: "Updated operation could not be retrieved.",
            });
        }

        res.json({
            code: 200,
            msg: "Updated successfully!",
            data: updatedData,
        });
    } catch (error) {
        console.error("Error updating operation:", error);
        res.status(500).json({
            code: -3,
            msg: "An error occurred while updating the operation."
        });
    }
};

exports.destroy = async (req, res) => {
    try {
        const deletedCount = await sequelize.models.operation.destroy({
            where: { id: req.params.id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({
                code: -1,
                msg: "Operation not found.",
            });
        }

        res.json({
            code: 200,
            msg: "Successfully deleted!",
        });
    } catch (error) {
        console.error("Error deleting operation:", error);
        res.status(500).json({
            code: -2,
            msg: "An error occurred while deleting the operation."
        });
    }
};


exports.del = async (req, res) => {
    try {
        const deletedCount = await sequelize.models.operation.destroy({
            where: { ...req.body }
        });

        if (deletedCount === 0) {
            return res.status(404).json({
                code: -1,
                msg: "No operations found matching the criteria.",
            });
        }

        res.json({
            code: 200,
            msg: "Successfully deleted!",
        });
    } catch (error) {
        console.error("Error deleting operation(s):", error);
        res.status(500).json({
            code: -2,
            msg: "An error occurred while deleting operation(s)."
        });
    }
};

exports.create = async (req, res) => {
    const { userId, questionId } = req.body;

    try {
        let existingOperation = await sequelize.models.operation.findOne({
            where: { userId, questionId }
        });

        if (existingOperation) {
            await existingOperation.destroy();
        }

        const newOperation = await sequelize.models.operation.create({ userId, questionId });
        res.json({ code: 200, msg: "Successfully added!", data: newOperation });
    } catch (error) {
        console.error("Error creating operation:", error);
        res.status(500).json({ code: -1, msg: "An error occurred while creating the operation." });
    }
};

exports.statistics = async (req, res) => {
    const { userId, questionId } = req.query;

    try {
        const [likeNum, disLikeNum, userLike, userDisLike] = await Promise.all([
            sequelize.models.operation.count({ where: { questionId, type: 'Like' } }),
            sequelize.models.operation.count({ where: { questionId, type: 'DisLike' } }),
            sequelize.models.operation.findOne({ where: { questionId, userId, type: 'Like' } }),
            sequelize.models.operation.findOne({ where: { questionId, userId, type: 'DisLike' } })
        ]);

        res.json({
            code: 200,
            msg: "Query successful!",
            data: { likeNum, disLikeNum, like: userLike, disLike: userDisLike }
        });
    } catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ code: -1, msg: "An error occurred while fetching statistics." });
    }
};

exports.index = async (req, res) => {
    const { index = 1, type, userId, questionId, limit = 10, all } = req.query;
    const where = { ...(type && { type }), ...(userId && { userId }), ...(questionId && { questionId }) };

    try {
        if (all) {
            const results = await sequelize.models.operation.findAll({
                where,
                include: [sequelize.models.user]
            });
            return res.json({ code: 200, msg: "Query successful!", data: results });
        }

        const data = await sequelize.models.operation.findAndCountAll({
            where,
            limit: Number(limit),
            offset: (Number(index) - 1) * Number(limit),
        });

        res.json({ code: 200, msg: "Query successful!", data });
    } catch (error) {
        console.error("Error fetching operations:", error);
        res.status(500).json({ code: -1, msg: "An error occurred while fetching operations." });
    }
};

exports.detail = async (req, res) => {
    try {
        const operationDetail = await sequelize.models.operation.findOne({
            where: { id: req.params.id }
        });

        if (!operationDetail) {
            return res.status(404).json({ code: -1, msg: "Operation not found." });
        }

        res.json({ code: 200, msg: "Query successful!", data: operationDetail });
    } catch (error) {
        console.error("Error fetching operation detail:", error);
        res.status(500).json({ code: -2, msg: "An error occurred while fetching operation detail." });
    }
};
