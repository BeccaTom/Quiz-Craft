const sequelize = require("../models");
const Sequelize = require("sequelize");

exports.rank = async (req, res) => {
    try {
        const data = await sequelize.models.record.findAll({
            attributes: [
                'userId',
                [Sequelize.fn('SUM', Sequelize.col('rightNum')), 'totalRightNum']
            ],
            include: [{ model: sequelize.models.user }],
            group: ['userId'],
            order: [[Sequelize.literal('totalRightNum'), 'DESC']]
        });

        res.json({ code: 200, msg: "Ranking retrieved successfully!", data });
    } catch (error) {
        console.error("Error retrieving ranking:", error);
        res.status(500).json({ code: -1, msg: "An error occurred while retrieving the ranking." });
    }
};

exports.update = async (req, res) => {
    try {
        const [updateCount] = await sequelize.models.record.update(req.body, {
            where: { id: req.params.id }
        });

        if (updateCount === 0) {
            return res.status(404).json({ code: -1, msg: "Record not found." });
        }

        const updatedData = await sequelize.models.record.findOne({ where: { id: req.params.id } });
        res.json({ code: 200, msg: "Updated successfully!", data: updatedData });
    } catch (error) {
        console.error("Error updating record:", error);
        res.status(500).json({ code: -2, msg: "An error occurred while updating the record." });
    }
};

exports.destroy = async (req, res) => {
    try {
        const deletedCount = await sequelize.models.record.destroy({
            where: { id: req.params.id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({ code: -1, msg: "Record not found." });
        }

        res.json({ code: 200, msg: "Successfully deleted!" });
    } catch (error) {
        console.error("Error deleting record:", error);
        res.status(500).json({ code: -2, msg: "An error occurred while deleting the record." });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await sequelize.models.record.create(req.body);
        res.json({ code: 200, msg: "Successfully added!", data });
    } catch (error) {
        console.error("Error creating record:", error);
        res.status(500).json({ code: -1, msg: "An error occurred while creating the record." });
    }
};


exports.index = async (req, res) => {
    const { index = 1, userId, limit = 10, all } = req.query;
    const where = userId ? { userId } : {};

    try {
        if (all) {
            const results = await sequelize.models.record.findAll({ where, include: [sequelize.models.user] });
            return res.json({ code: 200, msg: "Query successful!", data: results });
        }

        const data = await sequelize.models.record.findAndCountAll({
            where,
            limit: Number(limit),
            offset: (Number(index) - 1) * Number(limit),
            include: [sequelize.models.user]
        });

        res.json({ code: 200, msg: "Query successful!", data });
    } catch (error) {
        console.error("Error fetching records:", error);
        res.status(500).json({ code: -1, msg: "An error occurred while fetching records." });
    }
};

exports.detail = async (req, res) => {
    try {
        const data = await sequelize.models.record.findOne({ where: { id: req.params.id } });

        if (!data) {
            return res.status(404).json({ code: -1, msg: "Record not found." });
        }

        res.json({ code: 200, msg: "Query successful!", data });
    } catch (error) {
        console.error("Error fetching record detail:", error);
        res.status(500).json({ code: -2, msg: "An error occurred while fetching record detail." });
    }
};
