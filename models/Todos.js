const mongoose = require("mongoose");

const TodosSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default:false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("todos", TodosSchema);