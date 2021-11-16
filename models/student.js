'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsToMany(models.Book, { through: "Transaction" })
    }
  };
  Student.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "name cannot be null" },
        notEmpty: { msg: "name cannot be empty" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "Wrong format email" },
        notNull: { msg: "email cannot be null" },
        notEmpty: { msg: "email cannot be empty" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "password cannot be null" },
        notEmpty: { msg: "password cannot be empty" }
      }
    },
    denda: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{msg:"denda cannot be empty"}
      }
    }
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.denda = 0
      }
    },
    sequelize,
    modelName: 'Student',
  });
  return Student;
};