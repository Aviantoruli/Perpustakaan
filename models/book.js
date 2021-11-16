'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsToMany(models.Student,{through:"Transaction"})
    }
  };
  Book.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{msg:"name cannot be empty"},
        notNull:{msg:"name cannot be null"}
      }
    },
    borrow: DataTypes.DATEONLY,
    return: DataTypes.DATEONLY,
    status: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{msg:"status cannot be empty"}
      }
    },
    borrowerId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.status = "tersedia"
      }
    },
    sequelize,
    modelName: 'Book',
  });
  return Book;
};