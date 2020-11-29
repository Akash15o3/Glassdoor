const mongoose = require('mongoose');

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const salarySchema = new Schema({
  // jtitle will be matched with jobs.jtitle on search
  jtitle: String,
  // cname will be matched with company.cname on search
  cname: String,
  cid: String,
  salbase: Number,
  // number in years
  salexperience: Number,
  sallocation: String,
  salbonus: Number,
  salprofit: Number,
  salcommission: Number,
  // range will be returned from api call for a title
  // user id will be stored if submitted publicly, '' for privately
},
{
  versionKey: false,
});

const salaryModel = mongoose.model('salary', salarySchema);
module.exports = salaryModel;
