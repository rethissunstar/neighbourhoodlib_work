const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BooksOut extends Model {}

BooksOut.init(
  {
    ref_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    borrow_person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_lent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    borrow_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    estimated_due: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    request_state:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'booksOut',
  }
);

module.exports = BooksOut;
