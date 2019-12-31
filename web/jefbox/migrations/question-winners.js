module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('QuestionWinners', {
      QuestionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Question',
          key: 'Id'
        }
      },
      TeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Team',
          key: 'Id'
        }
      }
    });
  }, down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('QuestionWinners');
  }
};