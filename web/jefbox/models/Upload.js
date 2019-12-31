module.exports = (conn, types) => {
  let UploadModel = conn.define('Upload', {
    Id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Type: {
      type: types.INTEGER,
      allowNull: false
    },
    Url: {
      type: types.STRING
    },
    Data: {
      type: types.BLOB
    }
  }, {
    timestamps: true,
    createdAt: 'CreateDate',
    updatedAt: false
  });

  UploadModel.associate = (models) => {
    UploadModel.hasOne(models.RoundItem, {
      foreignKey: 'UploadId'
    });
  };

  return UploadModel;
};