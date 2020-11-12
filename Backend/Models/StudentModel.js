const mongoose = require('mongoose');

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const studentSchema = new Schema({
  stname: { type: String, unique: true, DropDups: true },
  stemail: String,
  stpassword: String,
  stphoto: String,
  // cross-referencing photos added for a company
  cphotos: [{
    url: String,
    // user/student name added here
    cname: String,
    cid: String,
  }],
  stresumes: [{
    stresume: String,
    stselect: {
      type: String,
      enum: ['', 'Primary'],
      default: '',
    },
  }],
  stjobpref: {
    searchstatus: {
      type: String,
      enum: ['Not Looking', 'Casually Looking', 'Actively Looking'],
      default: 'Casually Looking',
    },
    // required job title
    title: String,
    targetsalary: Number,
    relocation: {
      type: String,
      enum: ['Yes', 'No'],
      default: 'No',
    },
    industry: String,
  },
  stdemographics: {
    race: {
      type: String,
      enum: ['American Indian',
        'Alaska Native',
        'Asian',
        'Black or African American',
        'Native Hawaiian',
        'Other Pacific Islander',
        'White',
        'Refuse to disclose',
      ],
    },
    ethnicity: {
      type: String,
      enum: ['Hispanic or Latino', 'Not Hispanic or Latino', 'Refuse to disclose'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Non-binary', 'Refuse to disclose'],
    },
    disability: {
      type: String,
      enum: ['Disabled', 'Not Disabled', 'Refuse to disclose'],
    },
    veteran: {
      type: String,
      enum: ['Protected Veteran', 'Not a Veteran', 'Refuse to disclose'],
    },
  },
},
{
  versionKey: false,
});

const studentModel = mongoose.model('company', studentSchema);
module.exports = studentModel;
