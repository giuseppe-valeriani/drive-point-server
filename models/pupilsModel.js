const mongoose = require("mongoose");

const pupilsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a Pupil Name"],
    },
    starting_date: {
      type: String,
      required: [true, "Please enter a Starting Date"],
    },
    notes: {
      type: String,
      required: [false, ""],
    },
  },
  {
    timestamps: true,
  }
);

const Pupils = mongoose.model("Pupils", pupilsSchema);

module.exports = Pupils;
