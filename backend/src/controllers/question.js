const sequelize = require("../models");
const Sequelize = require("sequelize");

function getRandomQuestions(arr, numElements) {

    if (numElements >= arr.length) {
        return shuffleArray(arr);
    }

    let copyArr = arr.slice();
    let randomElements = [];

    for (let i = 0; i < numElements; i++) {

        const randomIndex = Math.floor(Math.random() * copyArr.length);

        randomElements.push(copyArr[randomIndex]);

        copyArr.splice(randomIndex, 1);
    }

    return randomElements;
}


function shuffleArray(array) {
    let currentIndex = array.length;
    let randomIndex;


    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;


        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

exports.random = async (req, res) => {
    let {
        type,
        difficulty,
        subject,
    } = req.query;
    let where = {};
    let typeArr = type.split('~');

    if (type) {
        where.type = {
            [Sequelize.Op.in]: typeArr
        }
    }
    if (difficulty) {
        where.difficulty = difficulty;
    }
    if (subject) {
        where.subject = subject;
    }
    const results = await sequelize.models.question.findAll({
        where
    });
    if (results.length < 10) {
        res.json({
            code: -1,
            msg: "The number of available questions is less than 10! Please create some questions, or adjust your criteria for more results.",
        });
        return;
    }

    res.json({
        code: 200,
        msg: "Query successful!",
        data: getRandomQuestions(results, 10)
    });
};

exports.update = async (req, res) => {
    await sequelize.models.question.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    const data = await sequelize.models.question.findOne({
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
    await sequelize.models.question.destroy({
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
    const data = await sequelize.models.question.create(req.body);
    res.json({
        code: 200,
        msg: "Successfully added!",
        data
    });
};
exports.index = async (req, res) => {
    let {
        index,
        title,
        type,
        difficulty,
        subject,
        limit,
        all,
    } = req.query;
    let where = {};
    if (title) {
        where.title = {
            [Sequelize.Op.like]: '%' + title + '%'
        };
    }
    if (type) {
        where.type = type;
    }
    if (difficulty) {
        where.difficulty = difficulty;
    }
    if (subject) {
        where.subject = subject;
    }
    if (all) {
        const results = await sequelize.models.question.findAll({
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
        const data = await sequelize.models.question.findAndCountAll({
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
    const data = await sequelize.models.question.findOne({
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
