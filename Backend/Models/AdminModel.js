const mongoose = require('mongoose');

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const adminSchema = new Schema({
  adname: { type: String, unique: true, DropDups: true },
  ademail: String,
  adpassword: String,
},
{
  versionKey: false,
});

const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel;
