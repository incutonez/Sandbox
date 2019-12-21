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

  return {
    getRecordById: async (id) => {
      let searchOptions = {
        where: {
          Id: id
        }
      };
      if (Model.includeOptions) {
        searchOptions.include = Model.includeOptions;
      }
      return await Model.findOne(searchOptions);
    },
    getAllRecords: async () => {
      let searchOptions = {};
      if (Model.includeOptions) {
        searchOptions.include = Model.includeOptions;
      }
      return await Model.findAll(searchOptions);
    },
    createRecord: async (data) => {
      delete data.Id;
      let record = await Model.create(data);
      return await updateAssociations(record, data);
    },
    updateRecord: async (data) => {
      let record = Model.update(data, {
        where: {
          Id: data.Id
        }
      });
      return await updateAssociations(record, data);
    },
    deleteRecord: async (id) => {
      return await Model.destroy({
        where: {
          Id: id
        }
      });
    }
  };
};