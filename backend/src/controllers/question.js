const sequelize = require("../models");
const Sequelize = require("sequelize");

function getRandomQuestions(arr, numElements) {
    // 如果要取的元素数量超过数组长度，返回整个数组
    if (numElements >= arr.length) {
        return shuffleArray(arr);
    }
    // 复制原数组，避免修改原数组
    let copyArr = arr.slice();
    let randomElements = [];

    for (let i = 0; i < numElements; i++) {
        // 生成一个随机索引
        const randomIndex = Math.floor(Math.random() * copyArr.length);
        // 从原数组中取出该索引对应的元素，并将其放入结果数组
        randomElements.push(copyArr[randomIndex]);
        // 从原数组中移除已选取的元素，避免重复选取
        copyArr.splice(randomIndex, 1);
    }

    return randomElements;
}

// 洗牌算法函数
function shuffleArray(array) {
    let currentIndex = array.length;
    let randomIndex;

    // 使用洗牌算法，从后往前遍历数组
    while (currentIndex !== 0) {
        // 随机选择一个元素
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // 交换当前元素和随机选择的元素
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
            msg: "The number of available questions is less than 10! Please adjust your criteria or expand your selection for more results.",
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
