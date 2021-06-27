'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  List.init({
    name: DataTypes.STRING,
    isFinished: DataTypes.BOOLEAN,
    isTrashed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};