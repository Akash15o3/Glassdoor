const mongoose = require('mongoose');

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const applicationSchema = new Schema({
  // Embedded company id
  ajobid: String,
  aapplierid: String,
  astatus: {
    type: String,
    enum: ['', 'Applied', 'Withdrawn'],
    default: '',
  },
  // embed resume model here
  aresume: String,
  acoverletter: String,
},
{
  versionKey: false,
});

const applicationModel = mongoose.model('job', applicationSchema);
module.exports = applicationModel;
