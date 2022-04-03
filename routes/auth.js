const router = require("express").Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(403).send("שם משתמש או סיסמא שגויים");
    return;
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    res.status(403).send("שם משתמש או סיסמא שגויים");
    return;
  }
  const token = user.generateAuthToken();
  res.send({ token });
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = router;
