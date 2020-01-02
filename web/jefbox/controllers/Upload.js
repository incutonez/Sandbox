const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const db = require('../models/index');
const fs = require('fs');
const url = require('url');

router.post('/upload', (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    let data = fs.readFileSync(files.uploadFile.path);
    await db.Upload.create({
      Data: data,
      MimeType: files.uploadFile.type,
      Type: fields.fileType
    });
    res.sendStatus(204);
  });
});

router.get('/upload', async (req, res) => {
  let records = await db.Upload.findAll();
  records.forEach(function(record) {
    record.Data = Buffer.from(record.Data).toString('base64');
  });
  res.send(records);
});

router.get('/upload/:id', async (req, res) => {
  const queryParams = url.parse(req.url, true).query;
  let record = await db.Upload.findOne({
    where: {
      Id: req.params.id
    }
  });
  let img = Buffer.from(record.Data);
  if (queryParams.base64) {
    record.Data = img.toString('base64');
    return res.send(record);
  }
  res.writeHead(200, {
    'Content-Type': record.MimeType,
    'Content-Length': img.length
  });
  res.end(img);
});

module.exports = router;
