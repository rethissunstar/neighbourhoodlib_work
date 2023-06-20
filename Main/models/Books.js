const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Books extends Model {}

Books.init(
  {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    bookSynopsis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    partOfSeries: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "N/A"
    },
    bookStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookOwner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'books',
  }
);

module.exports = Books;
