const mongoose = require("mongoose");

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const reviewSchema = new Schema(
  {
    // Embedded company name--unique
    cname: String,
    // company ID
    cid: String,
    // 5 star rating
    overallRating: Number,
    rdescription: String,
    rheadline: String,
    rpros: String,
    rcons: String,
    // Advice to management
    radvice: String,
    rreply: String,
    rfeat: String,
    rrecommended: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes",
    },
    routlook: {
      type: String,
      enum: ["Positive", "Negative"],
      default: "Positive",
    },
    rceoapprove: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes",
    },
    // Incremented with every vote
    rhelpful: {
      type: Number,
      default: 0,
    },
    rapproval: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    // Submitted by student name, id
    rstudent: {
      stid: String,
      stname: String,
    },
    rdate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

const reviewModel = mongoose.model("review", reviewSchema);
module.exports = reviewModel;
