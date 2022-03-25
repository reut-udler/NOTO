const router = require("express").Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser } = require("../models/userModel");
const { BizCard } = require("../models/bizModel");
const authMw = require("../middlewares/authMw");

/////// signup ///////
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    res.status(400).send("המשתמש קיים במערכת");
    return;
  }

  user = new User(req.body);
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(_.pick(user, ["name", "_id", "email"]));
});

/////// show my card ///////
router.get("/me", authMw, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(_.pick(user, ["name", "_id", "email"]));
});

/////// add to favorites ///////
router.patch("/favorites", authMw, async (req, res) => {
  await BizCard.find({ _id: { $in: req.favorite } });

  let user = await User.findById(req.user._id);

  if (user.favorites.includes(req.body.favorite)) {
    let index = user.favorites.indexOf(req.body.favorite);
    if (index >= 0) {
      user.favorites.splice(index, 1);
    }
    user = await user.save();
    res.send(user);
  } else {
    user.favorites = user.favorites.concat(req.body.favorite);
    user = await user.save();
    res.send(user);
  }
});

/////// show favorites ///////
router.get("/favorites", authMw, async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    const bizCards = await BizCard.find({ _id: user.favorites });
    res.send(bizCards);
  } catch (e) {
    res.status(400).send(e);
  }
});

/////// log out ///////
router.post("/logout", authMw, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("You have log out.");
  } catch (e) {
    res.send(500).send;
  }
});

module.exports = router;
