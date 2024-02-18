const sequelize = require("../models");
const Sequelize = require("sequelize");

function randomNum(minNum, maxNum) {
    if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10);
    } else if (arguments.length === 2) {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    }
    return 0;
}

exports.login = async (req, res) => {
    try {
        const user = await sequelize.models.user.findOne({ where: req.body });

        if (!user) {
            return res.status(401).json({ code: -1, msg: "Incorrect username or password" });
        }

        res.json({ code: 200, msg: "Login successful!", data: user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ code: -2, msg: "An error occurred during login." });
    }
};

exports.register = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await sequelize.models.user.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ code: -1, msg: "This account already exists! Try logging in?" });
        }

        const headpic = `/pic${randomNum(1, 10)}.png`;
        const newUser = await sequelize.models.user.create({ headpic, ...req.body });

        res.json({ code: 200, msg: "Registration successful!", data: newUser });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ code: -2, msg: "An error occurred during registration." });
    }
};

exports.updatePwd = async (req, res) => {
    try {
        const { id, oldPwd, newPwd } = req.body;
        const user = await sequelize.models.user.findOne({ where: { id, pwd: oldPwd } });

        if (!user) {
            return res.status(401).json({ code: -1, msg: "The current password you entered is incorrect. Please try again." });
        }

        await user.update({ pwd: newPwd });
        res.json({ code: 200, msg: "Password modified successfully!" });
    } catch (error) {
        console.error("Update password error:", error);
        res.status(500).json({ code: -2, msg: "An error occurred while updating the password." });
    }
};

exports.update = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await sequelize.models.user.findOne({ where: { email } });

        if (existingUser && existingUser.id != req.params.id) {
            return res.status(409).json({ code: -1, msg: "This email is already in use by another account. Please use a different email." });
        }

        await sequelize.models.user.update(req.body, { where: { id: req.params.id } });
        const updatedUser = await sequelize.models.user.findOne({ where: { id: req.params.id } });

        res.json({ code: 200, msg: "User updated successfully!", data: updatedUser });
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({ code: -2, msg: "An error occurred while updating the user." });
    }
};

exports.destroy = async (req, res) => {
    try {
        await sequelize.models.user.destroy({ where: { id: req.params.id } });
        res.json({ code: 200, msg: "User account has been successfully deleted." });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({ code: -1, msg: "An error occurred while deleting the user account." });
    }
};

exports.create = async (req, res) => {
    try {
        const newUser = await sequelize.models.user.create(req.body);
        res.json({ code: 200, msg: "New user account has been successfully created.", data: newUser });
    } catch (error) {
        console.error("Create user error:", error);
        res.status(500).json({ code: -2, msg: "An error occurred while creating a new user account." });
    }
};

exports.index = async (req, res) => {
    const { index = 1, email, role, all, limit = 10 } = req.query;
    const where = {};

    if (email) {
        where.email = { [Sequelize.Op.like]: `%${email}%` };
    }
    if (role) {
        where.role = role;
    }

    try {
        let data;
        if (all) {
            // Fetch all records without pagination
            data = await sequelize.models.user.findAll({ where });
        } else {
            // Fetch records with pagination
            const offset = (index - 1) * limit;
            data = await sequelize.models.user.findAndCountAll({
                where,
                limit: parseInt(limit, 10),
                offset,
            });
        }

        res.json({ code: 200, msg: "Query successful!", data });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ code: -1, msg: "An error occurred while fetching users." });
    }
};
