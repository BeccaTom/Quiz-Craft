const sequelize = require("../models");
const Sequelize = require("sequelize");

function getRandomQuestions(array, numberOfQuestions) {
    const shuffledArray = shuffleArray(array);

    if (numberOfQuestions >= array.length) {
      return shuffledArray;
    }

    return shuffledArray.slice(0, numberOfQuestions);
  }

  function shuffleArray(inputArray) {
    const array = [...inputArray];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

exports.random = async (req, res) => {
    const { type, difficulty, subject } = req.query;
    const where = {};

    if (type) {
        const typeArr = type.split('~');
        where.type = { [Sequelize.Op.in]: typeArr };
    }

    if (difficulty) {
        where.difficulty = difficulty;
    }

    if (subject) {
        where.subject = subject;
    }

    try {
        const results = await sequelize.models.question.findAll({ where });

        if (results.length < 10) {
            return res.status(400).json({
                code: -1,
                msg: "The number of available questions is less than 10! Please create some questions, or adjust your criteria for more results.",
            });
        }

        res.status(200).json({
            code: 200,
            msg: "Query successful!",
            data: getRandomQuestions(results, 10)
        });
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({
            code: -2,
            msg: "An error occurred while fetching questions."
        });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;

    try {
        const [updateCount] = await sequelize.models.question.update(req.body, {
            where: { id }
        });

        if (updateCount === 0) {
            return res.status(404).json({
                code: -1,
                msg: "Question not found or no changes made.",
            });
        }

        const updatedQuestion = await sequelize.models.question.findOne({
            where: { id }
        });

        if (!updatedQuestion) {
            return res.status(404).json({
                code: -2,
                msg: "Updated question could not be retrieved.",
            });
        }

        res.json({
            code: 200,
            msg: "Updated successfully!",
            data: updatedQuestion,
        });
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({
            code: -3,
            msg: "An error occurred while updating the question."
        });
    }
};

exports.destroy = async (req, res) => {
    try {
        const deletedCount = await sequelize.models.question.destroy({
            where: {
                id: req.params.id
            }
        });

        if (deletedCount === 0) {
            return res.status(404).json({
                code: -1,
                msg: "Question not found.",
            });
        }

        res.json({
            code: 200,
            msg: "Successfully deleted!",
        });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({
            code: -2,
            msg: "An error occurred while deleting the question."
        });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await sequelize.models.question.create(req.body);
        res.json({
            code: 200,
            msg: "Successfully added!",
            data
        });
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({
            code: -1,
            msg: "An error occurred while adding the question."
        });
    }
};

exports.index = async (req, res) => {
    let { index = 1, title, type, difficulty, subject, limit = 10, all } = req.query;
    let where = {};

    if (title) where.title = { [Sequelize.Op.like]: `%${title}%` };
    if (type) where.type = type;
    if (difficulty) where.difficulty = difficulty;
    if (subject) where.subject = subject;

    try {
        if (all) {
            const results = await sequelize.models.question.findAll({
                where,
                include: [sequelize.models.user]
            });
            return res.json({
                code: 200,
                msg: "Query successful!",
                data: results
            });
        }

        const data = await sequelize.models.question.findAndCountAll({
            limit: Number(limit),
            offset: (Number(index) - 1) * Number(limit),
            where,
        });

        res.json({
            code: 200,
            msg: "Query successful!",
            data
        });
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({
            code: -1,
            msg: "An error occurred while fetching questions."
        });
    }
};

exports.detail = async (req, res) => {
    try {
        const data = await sequelize.models.question.findOne({
            where: {
                id: req.params.id
            },
        });

        if (!data) {
            return res.status(404).json({
                code: -1,
                msg: "Question not found.",
            });
        }

        res.json({
            code: 200,
            msg: "Query successful!",
            data
        });
    } catch (error) {
        console.error("Error fetching question detail:", error);
        res.status(500).json({
            code: -2,
            msg: "An error occurred while fetching question detail."
        });
    }
};
