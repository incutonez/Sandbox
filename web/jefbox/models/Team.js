module.exports = (conn, types) => {
  let TeamModel = conn.define('Team', {
    Id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: types.STRING,
      allowNull: false
    },
    Color: {
      type: types.STRING
    }
  }, {
    timestamps: true,
    paranoid: true,
    createdAt: 'CreateDate',
    updatedAt: 'UpdateDate',
    deletedAt: 'DeleteDate'
  });

  TeamModel.associate = (models) => {
    TeamModel.belongsToMany(models.User, {
      as: 'Users',
      through: 'TeamUsers'
    });

    TeamModel.includeOptions.push({
      model: models.User,
      as: 'Users',
      through: {
        attributes: []
      }
    });
  };

  TeamModel.includeOptions = [];
  TeamModel.updateEvent = 'updatedTeams';

  return TeamModel;
};
