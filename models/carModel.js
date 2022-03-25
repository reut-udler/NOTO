const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

const carSchema = new mongoose.Schema(
  {
    carNumber: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 10,
      unique: true,
    },
    manufacturer: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    model: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    manYear: {
      type: Number,
      minlength: 4,
      maxlength: 4,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

function validateCar(car) {
  const schema = Joi.object({
    _id: Joi.string(),
    carNumber: Joi.string().min(9).max(10).required(),
    manufacturer: Joi.string().required().min(2).max(255),
    model: Joi.string().required().min(2).max(255),
    manYear: Joi.number().min(1950).max(9999),
  });

  return schema.validate(car);
}

module.exports = {
  Car,
  validateCar,
};
