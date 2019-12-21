const crypto = require('crypto');
const orm = require('sequelize');
module.exports = (conn, types) => {
  let UserModel = conn.define('User', {
    Id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserName: {
      type: types.STRING,
      allowNull: false
    },
    IsActive: {
      type: types.BOOLEAN,
      defaultValue: 0
    },
    Password: {
      type: types.STRING,
      /* We use get() to tell Sequelize to treat this column as a function instead of variables, preventing them from
       * showing up on queries like findAll() or findById(1) */
      get() {
        return () => this.getDataValue('Password');
      }
    },
    Salt: {
      type: types.STRING,
      /* We use get() to tell Sequelize to treat this column as a function instead of variables, preventing them from
       * showing up on queries like findAll() or findById(1) */
      get() {
        return () => this.getDataValue('Salt');
      }
    }
  }, {
    timestamps: true,
    createdAt: 'CreateDate',
    updatedAt: 'UpdateDate',
    deletedAt: false,
    hooks: {
      beforeCreate: (user) => {
        user.setSaltAndPassword();
      },
      beforeUpdate: (user) => {
        user.setSaltAndPassword();
      }
    }
  });

  // Class methods
  UserModel.getUserById = async function(id) {
    return await this.findById(id);
  };

  UserModel.getUserByName = async function(userName) {
    return await this.findOne({
      where: {
        UserName: orm.where(orm.fn('lower', orm.col('UserName')), orm.fn('lower', userName))
      }
    });
  };

  UserModel.getAllUsers = async function() {
    return await this.findAll();
  };

  UserModel.createUser = async function(userData) {
    return this.create(userData);
  };

  UserModel.updateUser = async function(userData) {
    return await this.update(userData, {
      where: {
        Id: userData.Id
      }
    });
  };

  UserModel.deleteUser = async function(userId) {
    return await this.destroy({
      where: {
        Id: userId
      }
    });
  };

  UserModel.associate = (models) => {
    UserModel.belongsToMany(models.Team, {
      as: 'Teams',
      through: 'TeamUsers'
    });
  };

  // Instance methods
  UserModel.prototype.encryptPassword = function(password) {
    return crypto.createHash('RSA-SHA256').update(password).update(this.Salt()).digest('hex');
  };

  UserModel.prototype.setSaltAndPassword = function() {
    if (this.changed('Password')) {
      this.Salt = crypto.randomBytes(16).toString('base64');
      this.Password = this.encryptPassword(this.Password());
    }
  };

  UserModel.prototype.isPassword = function(password) {
    return this.encryptPassword(password) === this.Password();
  };

  return UserModel;
};
