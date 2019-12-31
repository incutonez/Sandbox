module.exports = (conn, types) => {
  const QuestionModel = conn.define('Question', {
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
    Information: {
      type: types.STRING,
      allowNull: false
    },
    Answer: {
      type: types.STRING
    }
  });

  QuestionModel.associate = (models) => {
    QuestionModel.belongsToMany(models.Team, {
      as: 'Winners',
      through: 'QuestionWinners'
    });
  };

  QuestionModel.includeOptions = [];

  return QuestionModel;
};