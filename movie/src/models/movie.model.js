const {Model, Sequelize} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {};
  Movie.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    released: {
      type: Sequelize.DATE,
      allowNull: true
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: true
    },
    director: {
      type: Sequelize.STRING,
      allowNull: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};

// {
//   Title: "Titanic",
//   Released: "19 Dec 1997",
//   Genre: "Drama, Romance",
//   Director: "James Cameron",
//   }