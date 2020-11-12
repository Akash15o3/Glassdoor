const mongoose = require('mongoose');

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const employerSchema = new Schema({
  ename: String,
  epassword: String,
  elocation: String,
  elatitude: Number,
  elongitude: Number,
  cname: String,
  clocation: String,
  clatitude: String,
  clongitude: String,
  cwebsite: String,
  csize: String,
  ctype: String,
  cheadquarters: String,
  cfounded: String,
  cdescription: String,
  cmission: String,
  // Average rating overall/recommended/ceo approval will be deduced from reviews
  // review ids that are featured will be stored here
  cfeatured: [],

  cid: { type: String },
  latest: { type: Date },
  // flow true: restaurant -> customer
  // flow false: customer -> restaurant
  messages: [{ text: String, date: Date, flow: Boolean }],
},
{
  versionKey: false,
});

const employerModel = mongoose.model('company', employerSchema);
module.exports = employerModel;
