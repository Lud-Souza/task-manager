const { DataTypes } = require("sequelize");
const { sequelize, User } = require("./User");

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true }
});

// Relacionamento
Task.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Task, { foreignKey: "userId" });

module.exports = { Task };
