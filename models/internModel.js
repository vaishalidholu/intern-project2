const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({
  name: { type: String, required: "Name is required", trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: "Mobile number is required",
    unique: true,
    trim: true,
  },
  collegeId: { type: objectId, ref: "college" },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Intern", internSchema);
