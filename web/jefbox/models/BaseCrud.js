module.exports = (Model) => {
  const db = require('./index');

  async function updateAssociations(record, data) {
    for (let key in Model.associations) {
      let items = data[key];
      // If the association exists in our create, let's do something about it
      if (items) {
        if (Array.isArray(items)) {
          // If we're sending in an array of objects, then we want to create this association and tie it to this record
          if (typeof items[0] === 'object') {
            let existing = record[key];
            if (existing) {
              for (let i = 0; i < existing.length; i++) {
                await existing[i].destroy();
              }
            }
            for (let i = 0; i < items.length; i++) {
              let item = items[i];
              // If we have a new item, remove the Id, so one gets genned for us
              if (item.Id < 0) {
                delete item.Id;
              }
              await Model.associations[key].create(record, item);
            }
          }
          // Otherwise, the entities exist, and all we want to do is associate them
          else {
            await record['set' + key](items);
          }
        }
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
    record = await getRecordById(record.Id);
    return await updateAssociations(record, data);
  }

  async function updateRecord(data) {
    await Model.update(data, {
      paranoid: await db.User.excludeDeleted(data.UpdatedById),
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