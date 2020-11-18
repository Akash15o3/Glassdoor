const mongoose = require('mongoose');

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const companySchema = new Schema({
  cname: { type: String, unique: true, DropDups: true },
  cemail: String,
  cpassword: String,
  clocation: String,
  clatitude: String,
  clongitude: String,
  cwebsite: String,
  csize: String,
  ctype: String,
  crevenue: Number,
  cindustry: String,
  cheadquarters: String,
  cfounded: String,
  cdescription: String,
  cmission: String,
  cceo: String,
  // Average rating overall/recommended/ceo approval will be deduced from reviews
  // review ids that are featured will be stored here
  cfeatured: [],
  cviewedperday: { type: Number, default: 0 },
  // Photo URLs
  // cross-referencing photos added by a student/user
  cphotos: [{
    url: String,
    // user/student name added here
    stname: String,
    stid: String,
  }],
},
{
  versionKey: false,
});

const companyModel = mongoose.model('company', companySchema);
module.exports = companyModel;
