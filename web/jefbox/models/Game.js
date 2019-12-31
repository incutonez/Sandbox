module.exports = (conn, types) => {
  const GameModel = conn.define('Game', {
    Id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: types.STRING,
      allowNull: false
    },
    Room: {
      type: types.STRING
    },
    Type: {
      type: types.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: 'CreateDate',
    updatedAt: 'UpdateDate',
    deletedAt: 'DeleteDate'
  });

  GameModel.associate = (models) => {
    GameModel.hasMany(models.Team, {
      as: 'Teams',
      foreignKey: 'GameId'
    });

    GameModel.hasMany(models.RoundItem, {
      as: 'RoundItems',
      foreignKey: 'GameId'
    });

    GameModel.includeOptions.push({
      model: models.Team,
      as: 'Teams',
      include: models.Team.includeOptions
    });

    GameModel.includeOptions.push({
      model: models.RoundItem,
      as: 'RoundItems',
      include: models.RoundItem.includeOptions
    });
  };

  GameModel.includeOptions = [];
  GameModel.updateOptions = {};
  GameModel.updateEvent = 'updatedGames';

  return GameModel;
};
