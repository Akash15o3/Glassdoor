const mongoose = require("mongoose");

const { Schema } = mongoose;

// Can add non-essential fields to meta: {} later on
const applicationSchema = new Schema(
  {
    // Embedded company id
    ajobid: String,
    aapplierid: String,
    aname: String,
    astatus: {
      type: String,
      enum: ["", "Applied", "Withdrawn", "Hired", "Reviewed", "Initial_Screening", "Interviewing"],
      default: "Applied",
    },
    // embed resume model here
    aresume: String,
    acoverletter: String,
  },
  {
    versionKey: false,
  }
);

const applicationModel = mongoose.model("application", applicationSchema);
module.exports = applicationModel;
