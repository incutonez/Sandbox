const db = require('../database');
module.exports = (Model) => {
  async function updateAssociations(record, data) {
    for (let key in Model.associations) {
      // If the association exists in our create, let's do something about it
      if (data[key]) {
        // TODO: Could be more efficient if I used parallel programming (web workers)?
        await record['set' + key](data[key]);
      }
    }
    return record;
  }

  async function getRecordById(id, userId) {
    let searchOptions = {
      paranoid: await db.User.excludeDeleted(userId),
      where: {
        Id: id
      }
    };
    if (Model.includeOptions) {
      searchOptions.include = Model.includeOptions;
    }
    return Model.findOne(searchOptions);
  }

  async function getAllRecords(userId) {
    let searchOptions = {
      paranoid: await db.User.excludeDeleted(userId)
    };
    if (Model.includeOptions) {
      searchOptions.include = Model.includeOptions;
    }
    return Model.findAll(searchOptions);
  }

  async function createRecord(data) {
    delete data.Id;
    let record = await Model.create(data);
    return await updateAssociations(record, data);
  }

  async function updateRecord(data) {
    await Model.update(data, {
      where: {
        Id: data.Id
      }
    });
    let record = await getRecordById(data.Id);
    return await updateAssociations(record, data);
  }

  async function deleteRecord(id) {
    return Model.destroy({
      where: {
        Id: id
      }
    });
  }

  return {
    getRecordById: getRecordById,
    getAllRecords: getAllRecords,
    createRecord: createRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord
  };
};