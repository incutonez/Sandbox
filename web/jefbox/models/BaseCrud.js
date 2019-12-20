module.exports = (Model) => {
  return {
    getRecordById: async function(id) {
      return await Model.findById(id);
    },
    getAllRecords: async function() {
      return await Model.findAll();
    },
    createRecord: async function(data) {
      return Model.create(data);
    },
    updateRecord: async function(data) {
      return await Model.update(data, {
        where: {
          Id: data.Id
        }
      });
    },
    deleteRecord: async function(id) {
      return await Model.destroy({
        where: {
          Id: id
        }
      });
    }
  };
};