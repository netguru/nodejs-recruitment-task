const {Model, Sequelize} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCreateTrack extends Model {};
  MovieCreateTrack.init({
    month: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'MovieCreateTrack',
  });
  return MovieCreateTrack;
};