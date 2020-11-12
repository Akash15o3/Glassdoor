const mongoose = require('mongoose');

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const reviewSchema = new Schema({
  // Embedded company name--unique
  cname: String,
  rheadline: String,
  rpros: String,
  rcons: String,
  // Advice to management
  radvice: String,
  rrecommended: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'Yes',
  },
  routlook: {
    type: String,
    enum: ['Positive', 'Negative'],
    default: 'Positive',
  },
  rceoapprove: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'Yes',
  },
  // Incremented with every vote
  rhelpful: Number,
},
{
  versionKey: false,
});

const reviewModel = mongoose.model('review', reviewSchema);
module.exports = reviewModel;
