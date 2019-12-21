module.exports = (Model) => {
  const BaseCrudModel = require('../models/BaseCrud')(Model);
  return {
    getAll: async (req, res) => {
      let data = await BaseCrudModel.getAllRecords();
      return res.send(data);
    },
    createRecord: async (req, res) => {
      await BaseCrudModel.createRecord(req.body);
      return res.sendStatus(204);
    },
    getById: async (req, res) => {
      let data = await BaseCrudModel.getRecordById(req.params.id);
      if (data) {
        return res.send(data);
      }
      return res.sendStatus(404);
    },
    updateById: async (req, res) => {
      await BaseCrudModel.updateRecord(req.body);
      return res.sendStatus(204);
    },
    deleteById: async (req, res) => {
      await BaseCrudModel.deleteRecord(req.params.id);
      return res.sendStatus(204);
    }
  };
};