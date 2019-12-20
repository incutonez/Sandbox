module.exports = (Model) => {
  const BaseCrudModel = require('../models/BaseCrud')(Model);
  return {
    getAll: (req, res) => {
      return BaseCrudModel.getAllRecords().then((data) => {
        res.send(data);
      }).catch((err) => {
        console.log(err);
      });
    },
    createRecord: (req, res) => {
      return BaseCrudModel.createRecord(req.body).then((data) => {
        res.sendStatus(204);
      }).catch((err) => {
        console.log(err);
      });
    },
    getById: (req, res) => {
      return BaseCrudModel.getRecordById(req.params.id).then((data) => {
        res.send(data);
      }).catch((err) => {
        console.log(err);
      });
    },
    updateById: (req, res) => {
      return BaseCrudModel.updateRecord(req.body).then((data) => {
        res.sendStatus(204);
      }).catch((err) => {
        console.log(err);
      });
    },
    deleteById: (req, res) => {
      return BaseCrudModel.deleteRecord(req.params.id).then((data) => {
        res.sendStatus(204);
      }).catch((err) => {
        console.log(err);
      });
    }
  };
};