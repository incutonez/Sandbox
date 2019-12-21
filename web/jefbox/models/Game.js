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
    }
  }, {
    timestamps: true,
    createdAt: 'CreateDate',
    updatedAt: 'UpdateDate',
    deletedAt: false
  });

  GameModel.associate = (models) => {
    GameModel.hasMany(models.Team, {
      as: 'Teams',
      foreignKey: 'GameId'
    });

    GameModel.includeOptions.push({
      model: models.Team,
      as: 'Teams',
      include: models.Team.includeOptions
    });
  };

  GameModel.includeOptions = [];

  return GameModel;
};
