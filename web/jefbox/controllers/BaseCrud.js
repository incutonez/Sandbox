module.exports = (Model, io) => {
  const BaseCrudModel = require('../models/BaseCrud')(Model);
  return {
    getAll: async (req, res) => {
      let data = await BaseCrudModel.getAllRecords();
      return res.send(data);
    },
    createRecord: async (req, res) => {
      await BaseCrudModel.createRecord(req.body);
      if (io && Model.updateEvent) {
        io.emit(Model.updateEvent);
      }
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
      if (io && Model.updateEvent) {
        io.emit(Model.updateEvent);
      }
      return res.sendStatus(204);
    },
    deleteById: async (req, res) => {
      await BaseCrudModel.deleteRecord(req.params.id);
      if (io && Model.updateEvent) {
        io.emit(Model.updateEvent);
      }
      return res.sendStatus(204);
    }
  };
};