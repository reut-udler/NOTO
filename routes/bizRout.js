const router = require("express").Router();
const sharp = require("sharp");
const _ = require("lodash");

const { BizCard, validateBiz } = require("../models/bizModel");
const authMw = require("../middlewares/authMw");
const upload = require("../middlewares/upload");

/////// create business card ///////
router.post("/", authMw, upload.single("bizImage"), async (req, res) => {
  const { error } = validateBiz(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  let bizCard = await BizCard.findOne({ bizAdress: req.body.bizAdress });
  if (bizCard) {
    res.status(400).send("בכתובת זו כבר קיים עסק רשום");
    return;
  }

  if (req.file) {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .jpeg()
      .toBuffer();

    bizCard = new BizCard({
      ...req.body,
      bizImage: buffer,
      owner: req.user._id,
    });

    try {
      await bizCard.save();
      res.status(201).send(bizCard);
    } catch (e) {
      res.status(400).send("בכתובת זו כבר קיים עסק רשום");
    }
  }

  const buffer = await sharp("defaultImage.png")
    .resize({ width: 250, height: 250 })
    .jpeg()
    .toBuffer();

  bizCard = new BizCard({
    ...req.body,
    bizImage: buffer,
    owner: req.user._id,
  });
  try {
    await bizCard.save();
    return res.status(201).send(bizCard);
  } catch (e) {
    res.status(400).send("בכתובת זו כבר קיים עסק רשום");
  }
});

/////// show all business cards //////
router.get("/", async (req, res) => {
  try {
    const bizCards = await BizCard.find();
    res.set("Content-Type", "multipart/form-data");
    res.send(bizCards);
  } catch (e) {
    res.status(400).send("החיפוש לא הצליח. נסה שוב");
  }
});

/////// find by bizName //////
router.get("/:bizName", async (req, res) => {
  const input = req.params.bizName;
  try {
    const bizCard = await BizCard.find({
      bizName: { $regex: input },
    });

    if (!bizCard) {
      return res
        .status(400)
        .send("שם העסק לא קיים במערכת. נסה שם אחר או חפש לפי קטגוריה.");
    }
    res.send(bizCard);
  } catch (e) {
    res.status(400).send(e);
  }
});

/////// find by bizCategory //////
router.get("/category/:bizCategory", async (req, res) => {
  const input = req.params.bizCategory;
  try {
    const bizCard = await BizCard.find({
      bizCategory: { $regex: input },
    });

    if (!bizCard) {
      return res
        .status(400)
        .send("שם העסק לא קיים במערכת. נסה שם אחר או חפש לפי קטגוריה.");
    }
    res.send(bizCard);
  } catch (e) {
    res.status(400).send(e);
  }
});

/////////////////////////////
/////// edit bizCard ///////
router.put("/:id", authMw, async (req, res) => {
  const { error } = validateBiz(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  let bizCard = await BizCard.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  bizCard = await BizCard.findOne({
    _id: req.params.id,
  });
  res.send(bizCard);
});

///////////////////////////////
/////// edit business card ///////
router.put("/my-business/:id", authMw, async (req, res) => {
  try {
    let bizCard = await BizCard.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );
    if (!bizCard) {
      return res.status(404).send("כרטיס העסק שביקשת לא קיים בחשבונך");
    }

    bizCard = await BizCard.findOne({
      _id: req.params.id,
    });
    res.send(bizCard);
  } catch (e) {
    res.status(400).send(e);
  }
});

///// show all my business cards //////
router.get("/my-business", authMw, async (req, res) => {
  console.log(req.user);
  try {
    const bizCards = await BizCard.find({ owner: req.user._id });
    res.send("bizCards");
  } catch (e) {
    res.status(400).send(e);
  }
});

/////// show specific business card ///////
router.get("/my-business/:id", authMw, async (req, res) => {
  try {
    const bizCard = await BizCard.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!bizCard) {
      return res.status(404).send("כרטיס העסק שביקשת לא קיים במאגר");
    }
    res.send(bizCard);
  } catch (e) {
    res.status(400).send(e);
  }
});

/////// delete business card ///////
router.delete("/:id", authMw, async (req, res) => {
  const bizCard = await BizCard.findOneAndRemove({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!bizCard) {
    return res.status(404).send("כרטיס העסק שביקשת לא קיים בחשבונך");
  }
  res.send("כרטיס העסק נמחק מחשבונך");
});

/////// show bizImage ///////
router.get("/:id/bizImage", async (req, res) => {
  try {
    const bizCard = await BizCard.findById(req.params.id);
    if (!bizCard || !bizCard.bizImage) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpg");
    res.send(bizCard.bizImage);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
