const mongoose = require("mongoose");

const Skills = new mongoose.Schema({
  intro_1: {
    type: Number,
    required: true,
    default: 0,
  },
  intro_2: {
    type: Number,
    required: true,
    default: 0,
  },
  intro_3: {
    type: Number,
    required: true,
    default: 0,
  },
});

const pupilsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  starting_date: {
    type: String,
    required: true,
  },
  notes: { type: String, default: "" },
  skills: { type: [Skills] },
});

module.exports = mongoose.model("Pupil", pupilsSchema);
