const router = require("express").Router();
const authMw = require("../middlewares/authMw");
const { Car, validateCar } = require("../models/carModel");
const _ = require("lodash");

/////// create car ///////
router.post("/", authMw, async (req, res) => {
  const { error } = validateCar(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let car = new Car({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await car.save();
    res.status(201).send(car);
  } catch (e) {
    res.status(400).send("רכב זה כבר רשום במערכת");
  }
});

/////// show all my cars ///////
router.get("/my-cars", authMw, async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user._id });
    res.send(cars);
  } catch (e) {
    res.status(400).send(e);
  }
});

/////// show specific car - car page ///////
router.get("/my-cars/:id", authMw, async (req, res) => {
  try {
    const car = await Car.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!car) {
      return res.status(404).send("הרכב שביקשת לא קיים בחשבונך");
    }
    res.send(car);
  } catch (e) {
    res.status(400).send(e);
  }
});

/////// edit car ///////
router.put("/:id", authMw, async (req, res) => {
  const { error } = validateCar(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  let car = await Car.findOneAndUpdate({ _id: req.params.id }, req.body);
  car = await Car.findOne({
    _id: req.params.id,
  });
  res.send(car);
});

/////// delete car ///////
router.delete("/:id", authMw, async (req, res) => {
  const car = await Car.findOneAndRemove({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!car) {
    return res.status(404).send("הרכב שביקשת לא קיים בחשבונך");
  }
  res.send("הרכב נמחק מחשבונך");
});

module.exports = router;
