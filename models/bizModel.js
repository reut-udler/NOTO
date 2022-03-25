const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

const bizSchema = new mongoose.Schema({
  bizName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  bizCategory: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  bizDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  bizAdress: {
    type: String,
    unique: true,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  bizPhone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  bizImage: {
    type: Buffer,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const BizCard = mongoose.model("BizCard", bizSchema);

function validateBiz(bizCard) {
  const schema = Joi.object({
    bizName: Joi.string().min(2).max(255).required(),
    bizCategory: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAdress: Joi.string().min(2).max(255).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.allow(null, ""),
  });

  return schema.validate(bizCard);
}

module.exports = {
  BizCard,
  validateBiz,
};
