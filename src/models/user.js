'use strict';
import bcrypt from 'bcrypt';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task);
    }
  }
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: {
      type :  DataTypes.STRING, 
      set(value){
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash);
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};