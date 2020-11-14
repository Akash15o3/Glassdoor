const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { mongoDB } = require('../../Config/keys');
const Students = require('../../Models/StudentModel');

const Router = express.Router();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

// eslint-disable-next-line no-unused-vars
mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log('MongoDB Connection Failed');
  } else {
    console.log('MongoDB Connected');
  }
});



module.exports = Router;
