module.exports = (conn, types) => {
  const RoundItemModel = conn.define('RoundItem', {
    Id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Type: {
      type: types.INTEGER,
      allowNull: false
    },
    Round: {
      type: types.INTEGER
    },
    Order: {
      type: types.INTEGER
    },
    Points: {
      type: types.DECIMAL
    },
    Question: {
      type: types.STRING,
      allowNull: false
    },
    Answer: {
      type: types.STRING
    }
  });

  RoundItemModel.associate = (models) => {
    RoundItemModel.belongsToMany(models.Team, {
      as: 'Winners',
      through: 'RoundItemWinners'
    });
  };

  RoundItemModel.includeOptions = [];

  return RoundItemModel;
};