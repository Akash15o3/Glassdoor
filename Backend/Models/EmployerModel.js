const mongoose = require('mongoose');

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const employerSchema = new Schema({
  ename: String,
  epassword: String,
  elocation: String,
  elatitude: Number,
  elongitude: Number,
  // Link to company name
  ecompany: String,
},
{
  versionKey: false,
});

const employerModel = mongoose.model('employer', employerSchema);
module.exports = employerModel;
