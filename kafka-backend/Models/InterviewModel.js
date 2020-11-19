const mongoose = require('mongoose');

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const interviewSchema = new Schema({
  // Company name
  cname: String,
  overallexp: {
    type: String,
    enum: ['Positive', 'Negative', 'Neutral'],
    default: 'Neutral',
  },
  jobtitle: String,
  description: String,
  difficulty: {
    type: String,
    enum: ['Easy', 'Average', 'Difficult'],
    default: 'Easy',
  },
  offerstatus: {
    type: String,
    enum: ['Rejected', 'Accepted'],
  },
  interviewqna: [{
    question: String,
    answers: [{ answer: String }],
  }],
},
{
  versionKey: false,
});

const interviewModel = mongoose.model('interview', interviewSchema);
module.exports = interviewModel;
