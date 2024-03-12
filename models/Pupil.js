const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  label: String,
  skill: String,
  value: Number,
});

const paymentSchema = new mongoose.Schema({
  date: String,
  amount: Number,
  paid: Boolean,
});

const pupilsSchema = new mongoose.Schema({
  name: String,
  starting_date: String,
  notes: String,
  skills: [skillSchema],
  payments: [paymentSchema],
});

module.exports = mongoose.model("Pupil", pupilsSchema);
