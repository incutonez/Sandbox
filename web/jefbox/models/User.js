const db = require('../database');
const crypto = require('crypto');
const UserModel = db.conn.define('User', {
  Id: {
    type: db.orm.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserName: {
    type: db.orm.STRING,
    allowNull: false
  },
  IsActive: {
    type: db.orm.BOOLEAN,
    defaultValue: 0
  },
  Password: {
    type: db.orm.STRING,
    /* We use get() to tell Sequelize to treat this column as a function instead of variables, preventing them from
     * showing up on queries like findAll() or findById(1) */
    get() {
      return () => this.getDataValue('Password');
    }
  },
  Salt: {
    type: db.orm.STRING,
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
UserModel.getUserById = async function(userId) {
  return await this.findOne({
    where: {
      Id: userId
    }
  });
};

UserModel.getUserByName = async function(userName) {
  return await this.findOne({
    where: {
      UserName: db.orm.where(db.orm.fn('lower', db.orm.col('UserName')), db.orm.fn('lower', userName))
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

db.conn.sync().then(() => {
  console.log('User table synced.');
});

module.exports = UserModel;