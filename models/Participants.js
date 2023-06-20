const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Participants extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.user_pass);
  }
} 

Participants.init(
  {
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone_num: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_pass: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    user_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.user_pass = await bcrypt.hash(newUserData.user_pass, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.user_pass = await bcrypt.hash(updatedUserData.user_pass, 10);
        return updatedUserData;
      },
    }, 
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'participants',
  }
);

module.exports = Participants;
