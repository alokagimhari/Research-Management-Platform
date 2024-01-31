const path = require('path');
const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const router = express.Router();
const Researcher = require('../models/researcherModel');
const Request = require('../models/Request');
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      
      const { title, description, user,requests} = req.body;
      const { path, mimetype } = req.file;
      const exisitingUser = await Researcher.findOne(user);
      const proposal = await Request.findById(requests);
      
      const newfile = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype,
        requests,
        user
      });
      await newfile.save();
      exisitingUser.product.push(newfile._id);
      proposal.product.push(newfile._id);
     /*  await proposal.save();
      await exisitingUser.save(); */
      await Promise.all([proposal.save(), exisitingUser.save()]);
      return res.status(200).send({success: true,message:'file uploaded successfully.'});
    } catch (error) {
     return res.status(400).send({success: false,message:'Error while uploading file. Try again later.'});
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
    next();
  }
);




router.get('/getAllFiles', async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

module.exports = router;