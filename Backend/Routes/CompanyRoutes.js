const express = require('express');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../Utils/config');
// const { checkAuth, auth } = require('../Utils/passport');
// const kafka = require('../kafka/client');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { mongoDB } = require('../Utils/config');
const Customers = require('../Models/CustModel');

// auth();

const router = express.Router();

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


router.get('/')
