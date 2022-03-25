const mongoose = require("mongoose");
/* const Joi = require("joi"); */
const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);
const _ = require("lodash");

const expenseSchema = new mongoose.Schema({
  expenseTitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  expenseAmount: {
    type: Number,
    required: false,
  },
  ExpenseDate: {
    type: Date,
    default: Date.now,
    required: false,
  },
  relatedCar: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Car",
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

function validateExpense(expense) {
  const schema = Joi.object({
    expenseTitle: Joi.string().required().min(2).max(255),
    expenseAmount: Joi.number(),
    expenseDate: Joi.date().format("YYYY-MM-DD"),
  });

  return schema.validate(expense);
}

module.exports = {
  Expense,
  validateExpense,
};
