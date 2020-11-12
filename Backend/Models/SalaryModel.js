const mongoose = require('mongoose');

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const salarySchema = new Schema({
  // jtitle will be matched with jobs.jtitle on search
  jtitle: String,
  // cname will be matched with company.cname on search
  cname: String,
  sbase: Number,
  // number in years
  sexperience: Number,
  slocation: String,
  sbonus: Number,
  sprofit: Number,
  scommission: Number,
  // range will be returned from api call for a title
  // user id will be stored if submitted publicly, '' for privately
},
{
  versionKey: false,
});

const salaryModel = mongoose.model('job', salarySchema);
module.exports = salaryModel;
