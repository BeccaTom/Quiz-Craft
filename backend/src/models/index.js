const Sequelize = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize('qs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+8:00',
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    dialectOptions: {
        dateStrings: true,
        typeCast(field, next) {
            if (field.type === "DATETIME") {
                return field.string();
            }
            return next();
        }
    }
})

fs.readdir(__dirname, (err, files) => {
    if (err) {
        throw err;
    }
    files.forEach(file => {
        if (file.indexOf('index') == -1) {
            require(`./${file}`)(sequelize);
        }
    });
    sequelize.sync().then(() => {
        sequelize.models.record.belongsTo(sequelize.models.user, {
            foreignKey: 'userId',
            sourceKey: 'id'
        });
        sequelize.models.operation.belongsTo(sequelize.models.user, {
            foreignKey: 'userId',
            sourceKey: 'id'
        });
        sequelize.models.operation.belongsTo(sequelize.models.question, {
            foreignKey: 'questionId',
            sourceKey: 'id'
        });
    });
});

module.exports = sequelize;
