const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model { }
  Book.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "TITLE"',
        },
        notEmpty: {
          msg: 'Please provide a value for "TITLE"',
        },
      },
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "AUTHOR"',
        },
        notEmpty: {
          msg: 'Please provide a value for "AUTHOR"',
        },
      },
    },
    genre: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.INTEGER,
    },
  }, { sequelize });
  return Book;
}